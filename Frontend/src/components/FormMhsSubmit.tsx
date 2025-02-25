import React, { useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router';

const FormulirMhsSubmission: React.FC = () => {
    //API = const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=i3`,config);
    const { formId } = useParams<{ formId: string | undefined }>();

    const [form] = Form.useForm();

    const navigate = useNavigate();


    useEffect(() => {
      // Retrieve JWT token from localStorage
      fetchFaipData();
    }, []);
    
    const fetchFaipData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
    
        if (token) {
          // Decode the token to extract user ID
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          // Make API request with user ID
          const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=vii`,config)
          const userData = response.data;
          form.setFieldsValue({ accept: userData.data.form_vii.accept });
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };

    const submitForm = async () => {
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
          await axios.patch(`/form-penilaian/mhs/submit-form?uid=${userId}&pid=${formId}`,{},config);
          navigate(`/form/m/faip/`, { replace: true });
          // console.log("response add form:"+response)
  
          // const userData = response.data;
          // setStatus("new")
        } else {
          console.error('User not found');
        }
      }catch(error){
        console.error('Error submitting form');
      }
    };

    const onFinish = async (values: any) => { //fungsi submit form //NEED API POST
      try{
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          // console.log('Form Data:', formData);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          await axios.patch(`/form-penilaian/mhs?uid=${userId}&pid=${formId}&ft=vii`,values,config);
          // console.log("response add form:"+response)

          // const userData = response.data;
          // setStatus("new")
        } else {
          console.error('User not found');
        }
      }catch(error){
        console.error('Error sending form');
      }
      window.location.reload();
      
      // ... your form submission logic ...
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    //struktur komponen
    return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: '#6b7aa1',
            colorPrimaryHover: '#7e90be',
          },
          Input: {
            activeBorderColor:'#7e90be',
            hoverBorderColor:'#7e90be',
          },
        }
      }}
    >
    <div>
        <div className='container-form'>
            <h3 className='headerform' style={{marginBottom:'10px'}}>Submit</h3>

           <p>Harap untuk mengecek seluruh bagian formulir anda sebelum mengirim formulir FAIP!</p>
            <Button type="primary" size='large' style={{ margin:'20px auto',display: "flex", justifyContent: "center",borderRadius:'3px' }} onClick={showModal}>
              <span style={{margin:'0 5px'}}><UploadOutlined /></span> Submit
            </Button>
            <Modal title="Submit Formulir?" open={isModalOpen} onOk={submitForm} onCancel={handleCancel} okText={'Submit'} centered>
              <p>Apakah anda yakin untuk mengirim formulir?</p>
              <p style={{color:'red'}}>note. Data yang sudah terkirim tidak bisa dirubah lagi!</p>
            </Modal>
        </div>
    </div>
    </ConfigProvider>

    );
  };

  export default FormulirMhsSubmission;
