import React, { useContext, useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';
import { allSectionData } from '../../data/sectionFormDataSectionAll';



const FilterKodeEtik: React.FC = () => {
    const formRef = React.createRef<FormInstance>();//

    const [selectedChoicesOne, setSelectedChoicesOne] = useState<string[] >([]);   
    const [selectedChoicesTwo, setSelectedChoicesTwo] = useState<string[] >([]);   
    const [selectedChoicesThree, setSelectedChoicesThree] = useState<string[] >([]);   

    useEffect(() => {
        // Retrieve JWT token from localStorage
        fetchUserData();
    }, []);
    
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
            const responseFilter = await axios.get(`/form-tools/faip-form/form-rule?uid=${userId}&ft=kode-etik`,config);
            // Validate selected values against allOptions
            const filterData = responseFilter.data.data.mk_kode_etik
    
            setSelectedChoicesOne(filterData.cpmk_1);
            setSelectedChoicesTwo(filterData.cpmk_2);
            setSelectedChoicesThree(filterData.cpmk_3);

        } else {
            console.error('User not found');
        }
        } catch (error) {
        console.error('Error getting user data');
        }
    };

    const handleChoiceChangeOne = (choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentChoices = selectedChoicesOne || [];
        // console.log(currentRowChoices);
        if (checked) {
            setSelectedChoicesOne([...currentChoices, choiceValue]);
        } else if (!checked) {
            const updatedRowChoices = currentChoices.filter(choice => choice !== choiceValue);
            setSelectedChoicesOne([...updatedRowChoices]);
        }
    };
    const handleChoiceChangeTwo = (choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentChoices = selectedChoicesTwo || [];
        // console.log(currentRowChoices);
        if (checked) {
            setSelectedChoicesTwo([...currentChoices, choiceValue]);
        } else if (!checked) {
            const updatedRowChoices = currentChoices.filter(choice => choice !== choiceValue);
            setSelectedChoicesTwo([...updatedRowChoices]);
        }
    };
    const handleChoiceChangeThree = (choiceValue: string, checked: boolean) => { //fungsi yg berhubungan dgn checbox klaim kompetensi
        const currentChoices = selectedChoicesThree || [];
        // console.log(currentRowChoices);
        if (checked) {
            setSelectedChoicesThree([...currentChoices, choiceValue]);
        } else if (!checked) {
            const updatedRowChoices = currentChoices.filter(choice => choice !== choiceValue);
            setSelectedChoicesThree([...updatedRowChoices]);
        }
    };
    
    console.log("selectedChoicesOne:"+ selectedChoicesOne)
    // console.log("selectedChoicesTwo:"+ selectedChoicesTwo)
    // console.log("selectedChoicesThree:"+ selectedChoicesThree)

    const onFinish = async () => { //fungsi submit form //NEED API POST
        try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.nomerInduk;
    
            const formData = {
                cpmk_1: selectedChoicesOne,
                cpmk_2: selectedChoicesTwo,
                cpmk_3: selectedChoicesThree,
            }
            // Now you can send formData to your backend for processing
            console.log('Form Data:', formData);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            await axios.patch(`/form-tools/faip-form/filtering?uid=${userId}&ft=kode-etik`,formData,config);
        } else {
            console.error('User not found');
        }
        }catch(error){
        console.error('Error sending form');
        }
        window.location.reload();
        
        // ... your form submission logic ...
    };

return (
<div>
    <Form ref={formRef} onFinish={onFinish}>
    <h4 style={{margin:"0 0 10px"}}>CPMK 1. Mahasiswa mampu menjelaskan etika dan kode etik, profesionalisme, tata laku dan ciri khas dalam bidang profesi keinsinyuran sesuai kaidah etika profesi </h4>
    <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesOne}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesOne || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChangeOne(subSection.value, e.target.checked)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>
    
        <h4 style={{margin:"10px 0"}}>CPMK 2. Mahasiswa mampu menerapkan etika dan kode etik, profesionalisme, tata laku dan ciri khas dalam bidang profesi keinsinyuran sesuai kaidah etika profesi</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesTwo}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesTwo || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChangeTwo(subSection.value, e.target.checked)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 3. Mahasiswa mampu menyelesaiakan masalah berperilaku sesuai dengan etika profesi keinsinyuran dengan mengemukakan pendapat baik lisan maupun tulisan</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesThree}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesThree || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChangeThree(subSection.value, e.target.checked)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" style={{margin:'20px auto',display: "flex", justifyContent: "center"}}>
                Save
            </Button>
        </Form.Item>
        </Form>
</div>
);
};

export default FilterKodeEtik;
