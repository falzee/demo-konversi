import { Button, Divider, Form, Modal, Select, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { spawn } from 'child_process';


const { Option } = Select;

interface OptionType {
    nomer_induk: string;
    nama: string;
}
interface MhsOptionType {
    student_id: string;
    student_name: string;
    status_assesor: string;
    dosen_penilai_faip: string[];
}

const FaipAdminAddAssesor = ( ) => {
    const [lecturerOptions, setLecturerOptions] = useState<OptionType[]>([]);//array list dosen
    const [mhsOptions, setmhsOptions] = useState<MhsOptionType[]>([]);

    const allListDsnSelected = mhsOptions.flatMap(item => item.dosen_penilai_faip);

    const dsnSelectedCounts: Record<string, number> = allListDsnSelected.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const [selectedValues, setSelectedValues] = useState<(string | null)[]>([null, null, null]); // Array for selected values

    const [form] = Form.useForm();
    const [mainSelectValue, setMainSelectValue] = useState<string | undefined>(undefined);
    const [mainSelectedStatus, setMainSelectedStatus] = useState<string | undefined>(undefined);

    const handleMainSelectChange = (value: string) => {
        setMainSelectValue(value);
        // if value === id ? 
        // setSelectedValues & setstatus : nothing
        const selectedOption = mhsOptions.find(option => option.student_id === value);
        if (selectedOption) {
            setMainSelectedStatus(selectedOption.status_assesor);
            setSelectedValues(selectedOption.dosen_penilai_faip || null);
            form.setFieldsValue({
                first: selectedOption.dosen_penilai_faip[0],
                second: selectedOption.dosen_penilai_faip[1],
                third: selectedOption.dosen_penilai_faip[2],
            });  
        }else if (!value){
            setMainSelectedStatus("113-1");
        }
        
    };
    // useEffect(() => {
    //     // console.log("Updated selectedValues:", selectedValues);
    //   }, [selectedValues]); // Log whenever selectedValues changes


    useEffect(() => {
        // Retrieve JWT token from localStorage
        fetchUserData();
    }, [form]);


    const fetchUserData = async () => {
        try {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            // Decode the token to extract user ID
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.nomerInduk;
            // console.log("nim mauk:" + nim)
            const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
            };
            // Make API request with user ID
            const responseFormAssesor = await axios.get(`/form-tools/faip-form/all-assesor/${userId}`,config);
            const responseLecturer = await axios.get(`/form-tools/faip-form/all-lecturer/${userId}`,config);
            const options = responseLecturer.data.data;
            const selectedAssesor = responseFormAssesor.data.data;

            // Validate selected values against lecturerOptions
            

            setLecturerOptions(options);
            setmhsOptions(selectedAssesor)
            // setSelectedValues(selected);

            // form.setFieldsValue({
            //     first: selected[0],
            //     second: selected[1],
            //     third: selected[2],
            // });  
        } else {
            console.error('User not found');
        }
        } catch (error) {
        console.error('Error getting user data');
        }
    };

    console.log("[SELECTED VALUES]"+selectedValues)

    // Handle selection change for each select
    const handleSelectChange = (index: number, value: string | null) => {
        const updatedValues = [...selectedValues];
        updatedValues[index] = value;

        setSelectedValues(updatedValues);
        form.setFieldsValue({
        first: updatedValues[0],
        second: updatedValues[1],
        third: updatedValues[2],
        });
    };

    // Filter options that are not selected in other selects
    const getFilteredOptions = (currentIndex: number): OptionType[] => {
        const selectedItems = selectedValues.filter((_, index) => index !== currentIndex);
        
        // Filter options to exclude currently selected items
        return lecturerOptions.filter((option) => !selectedItems.includes(option.nomer_induk));
    };


    const onReset = () => {
        setSelectedValues([null, null, null]); // Reset selectedValues
        form.resetFields(); // Reset form fields to null
    };

    const onSave = async () => {
        try{
            const token = localStorage.getItem('jwtToken');
            if (token) {
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.nomerInduk;

            const config = {
                headers: {
                Authorization: `Bearer ${token}`
                }
            };

            const assignAssesorData = {
                "studentId": mainSelectValue,
                "assignedAssesor": selectedValues
            }

            await axios.patch(`/form-tools/faip-form/assesor/${userId}`,assignAssesorData,config);

            } else {
            console.error('User not found');
            }
        }catch(error){
            console.error('Error sending form');
        }
        window.location.reload();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
    setIsModalOpen(true);
    };

    const handleCancel = () => {
    setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        try {
            await form.validateFields(); // Validate all fields
            onSave(); // If validation passes, proceed with onSave
        } catch (error) {
            // Validation failed; you can handle error here if needed
            // console.log("Validation failed:", error);
            handleCancel();
        }
    };
    useDocumentTitle('PII TA | FAIP');

return (
<div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '800px', backgroundColor: '' }}>
    {/* header tambahin underline sama shadow(opsional) */}
    <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penambahan Dosen Penilai Konversi FAIP</h2>
    <Form
        form={form}
        onFinish={onSave} // Call onSave when form is submitted
        initialValues={{ first: null, second: null, third: null }} // Ensure initial values are set
    >
    <Form.Item>
    <p style={{ padding: '10px 0' }}>Pilih Mahasiswa : </p> 

    <Select
        placeholder="-- Pilih Mahasiswa --"
        onChange={handleMainSelectChange}
        optionLabelProp="children" 
        allowClear
    >
    {[...mhsOptions]
        .sort((a, b) => 
            (a.status_assesor === "113-1" ? 1 : 0) - (b.status_assesor === "113-1" ? 1 : 0)
        )
        .map((option) => (
            <Option key={option.student_id} value={option.student_id}>
                {`${option.student_id} - ${option.student_name} `}
                {option.status_assesor === "113-1" ? (
                    <span style={{ color: "blue" }}>(Sudah Ditentukan)</span>
                ) : (
                    <span style={{ color: "red" }}>(Belum Ditentukan)</span>
                )}
        </Option>
    ))}
    </Select>
    </Form.Item>
    <Divider style={{margin: "10px 0"}} />
    {mainSelectValue && (
    <div>
        <p style={{ padding: '10px 0 0' }}>Dosen Penilai 1 : </p> 


        <Form.Item style={{ margin: '0' }} name="first" rules={[{ required: true, message: 'Harap isi bagian ini!' }]} >
            <Select 
                placeholder="--Tambah Dosen Penilai 1--"
                onChange={(value) => handleSelectChange(0, value)} // index 0 for first select
                allowClear
                disabled={mainSelectedStatus === '113-1'}
                
                >
            {getFilteredOptions(0).map((option) => {
                const count = dsnSelectedCounts[option.nomer_induk] || 0; // Get the count or default to 0
                return (
                    <Option key={option.nomer_induk} value={option.nomer_induk}>
                        {option.nomer_induk} - {option.nama} ({count})
                    </Option>
                );
            })}
            </Select>
        </Form.Item>

        <p style={{ padding: '10px 0 0' }}>Dosen Penilai 2 : </p> 

        <Form.Item style={{ margin: '0' }} name="second" rules={[{ required: true, message: 'Harap isi bagian ini!' }]} >
            <Select 
                placeholder="--Tambah Dosen Penilai 2--"
                onChange={(value) => handleSelectChange(1, value)}
                allowClear
                disabled={mainSelectedStatus === '113-1'}
                >        
            {getFilteredOptions(1).map((option) => {
                const count = dsnSelectedCounts[option.nomer_induk] || 0; // Get the count or default to 0
                return (
                    <Option key={option.nomer_induk} value={option.nomer_induk}>
                        {option.nomer_induk} - {option.nama} ({count})
                    </Option>
                );
            })}
            </Select>
        </Form.Item>

        <p style={{ padding: '10px 0 0' }}>Dosen Penilai 3 : </p> 

        <Form.Item style={{ margin: '0' }} name="third" rules={[{ required: true, message: 'Harap isi bagian ini!' }]} >
            <Select 
                placeholder="--Tambah Dosen Penilai 3--"
                onChange={(value) => handleSelectChange(2, value)}
                allowClear
                disabled={mainSelectedStatus === '113-1'}
                >
            {getFilteredOptions(2).map((option) => {
                const count = dsnSelectedCounts[option.nomer_induk] || 0; // Get the count or default to 0
                return (
                    <Option key={option.nomer_induk} value={option.nomer_induk}>
                        {option.nomer_induk} - {option.nama} ({count})
                    </Option>
                );
            })}
            </Select>
        </Form.Item>
    </div>
    )}
    {(mainSelectedStatus === "113-0") ?
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button danger onClick={onReset} style={{margin:'20px 10px'}}>
                    Reset
            </Button>
            <Form.Item>
                <Button type="primary" onClick={showModal} style={{margin:'20px 10px'}}>
                    Save
                </Button>
                <Modal title="Tetapkan dosen penilai?" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel} okText={'Submit'} centered>
                    <p>Apakah anda yakin untuk menetapkan dosen penilai?</p>
                    <p style={{color:'red'}}>note. Data yang sudah terkirim tidak bisa dirubah lagi!</p>
                </Modal>
            </Form.Item>
        </div> : null
    }
    </Form>

    </div>
</div>
)
}
export default FaipAdminAddAssesor

