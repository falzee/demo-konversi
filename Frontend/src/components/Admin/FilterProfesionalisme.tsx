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



const FilterProfesionalisme: React.FC = () => {
    const formRef = React.createRef<FormInstance>();//

    const [selectedChoicesOne, setSelectedChoicesOne] = useState<string[]>([]);
    const [selectedChoicesTwo, setSelectedChoicesTwo] = useState<string[]>([]);
    const [selectedChoicesThree, setSelectedChoicesThree] = useState<string[]>([]);
    const [selectedChoicesFour, setSelectedChoicesFour] = useState<string[]>([]);
    const [selectedChoicesFive, setSelectedChoicesFive] = useState<string[]>([]);
    const [selectedChoicesSix, setSelectedChoicesSix] = useState<string[]>([]);
    const [selectedChoicesSeven, setSelectedChoicesSeven] = useState<string[]>([]);
    const [selectedChoicesEight, setSelectedChoicesEight] = useState<string[]>([]);
    const [selectedChoicesNine, setSelectedChoicesNine] = useState<string[]>([]);


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
            const responseFilter = await axios.get(`/form-tools/faip-form/form-rule?uid=${userId}&ft=profesionalisme`,config);
            // Validate selected values against allOptions
            const filterData = responseFilter.data.data.mk_profesionalisme
    
            setSelectedChoicesOne(filterData.cpmk_1);
            setSelectedChoicesTwo(filterData.cpmk_2);
            setSelectedChoicesThree(filterData.cpmk_3);
            setSelectedChoicesFour(filterData.cpmk_4);
            setSelectedChoicesFive(filterData.cpmk_5);
            setSelectedChoicesSix(filterData.cpmk_6);
            setSelectedChoicesSeven(filterData.cpmk_7);
            setSelectedChoicesEight(filterData.cpmk_8);
            setSelectedChoicesNine(filterData.cpmk_9);

        } else {
            console.error('User not found');
        }
        } catch (error) {
        console.error('Error getting user data');
        }
    };

    const handleChoiceChange = (
        choiceValue: string, 
        checked: boolean, 
        choiceIndex: number
      ) => {
        let currentChoices;
        let setSelectedChoices;
      
        switch (choiceIndex) {
          case 1:
            currentChoices = selectedChoicesOne || [];
            setSelectedChoices = setSelectedChoicesOne;
            break;
          case 2:
            currentChoices = selectedChoicesTwo || [];
            setSelectedChoices = setSelectedChoicesTwo;
            break;
          case 3:
            currentChoices = selectedChoicesThree || [];
            setSelectedChoices = setSelectedChoicesThree;
            break;
          case 4:
            currentChoices = selectedChoicesFour || [];
            setSelectedChoices = setSelectedChoicesFour;
            break;
          case 5:
            currentChoices = selectedChoicesFive || [];
            setSelectedChoices = setSelectedChoicesFive;
            break;
          case 6:
            currentChoices = selectedChoicesSix || [];
            setSelectedChoices = setSelectedChoicesSix;
            break;
          case 7:
            currentChoices = selectedChoicesSeven || [];
            setSelectedChoices = setSelectedChoicesSeven;
            break;
          case 8:
            currentChoices = selectedChoicesEight || [];
            setSelectedChoices = setSelectedChoicesEight;
            break;
          case 9:
            currentChoices = selectedChoicesNine || [];
            setSelectedChoices = setSelectedChoicesNine;
            break;
          default:
            return; // If index is out of range, do nothing
        }
      
        if (checked) {
          setSelectedChoices([...currentChoices, choiceValue]);
        } else {
          const updatedChoices = currentChoices.filter(choice => choice !== choiceValue);
          setSelectedChoices([...updatedChoices]);
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
                cpmk_4: selectedChoicesFour,
                cpmk_5: selectedChoicesFive,
                cpmk_6: selectedChoicesSix,
                cpmk_7: selectedChoicesSeven,
                cpmk_8: selectedChoicesEight,
                cpmk_9: selectedChoicesNine,
            }
            // Now you can send formData to your backend for processing
            console.log('Form Data:', formData);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            await axios.patch(`/form-tools/faip-form/filtering?uid=${userId}&ft=profesionalisme`,formData,config);
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
    <h4 style={{margin:"0 0 10px"}}>CPMK 1. Mahasiswa mampu menjelaskan tentang pengertian, definisi  dan penjabaran tentang Profesionalisme Insinyur </h4>
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
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,1)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>
    
        <h4 style={{margin:"10px 0"}}>CPMK 2. Mahasiswa mampu menjelaskan tentang kode etik dan peraturan perundangan tentang Keinsinyuran Indonesia.</h4>
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
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,2)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 3. Mahasiswa mampu menjelaskan tentang standar dan karakteristik profesionalisme insinyur Indonesia. </h4>
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
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,3)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 4. Mahasiswa mampu memahami tanggung jawab Profesi Keinsinyuran dan pengembangan keprofesian berkelanjutan.</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesFour}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesFour || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,4)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 5. Mahasiswa mampu memahami pengaruh faktor non teknik dan penerapan etika profesi dalam pelaksanaan pekerjaan</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesFive}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesFive || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,5)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 6. Mahasiswa mampu memahami cara melakukan analisa dan evaluasi data.</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesSix}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesSix || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,6)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 7. Mahasiswa mampu menemu kenali kemampuan, kelemahan dan kekuatan tempat kerja.</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesSeven}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesSeven || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,7)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 8. Mahasiswa mampu bekerja sama dalam tim pada perioda waktu yang terbatas.</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesEight}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesEight || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,8)}
                            >
                            {subSection.label}
                            </Checkbox>
                        </div>
                        ))}
                    </div>
                ))}
        </div>
        </Form.Item>

        <h4 style={{margin:"10px 0"}}>CPMK 9. Mahasiswa memahami mekanisme serah terima pekerjaan.</h4>
        <p>Tampilan Pilihan: <span style={{color:"blue",fontWeight:"bold"}}>{selectedChoicesNine}</span></p>
        <Form.Item name="checkboxs" >
        <div style={{ maxHeight:'250px',overflowY:'scroll',borderColor:"#6b7aa1",borderStyle:'solid',borderWidth:'1px',padding:'5px'}}>
                {allSectionData.map(section => (
                    <div key={section.value}>
                        <span style={{ fontWeight: 'bold' }}>{section.label}</span>
                        {section.children.map((subSection) => (
                        <div key={subSection.value} style={{ borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
                            <Checkbox
                                value={subSection.value}
                                checked={(selectedChoicesNine || []).includes(subSection.value)}
                                onChange={(e: any) => handleChoiceChange(subSection.value, e.target.checked,9)}
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

export default FilterProfesionalisme;
