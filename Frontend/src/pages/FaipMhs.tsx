import { Button, Modal, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, ExportOutlined, InfoCircleOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { nanoid } from 'nanoid';


const Faip = ( ) => {
  const [nama, setNama] = useState(''); // State to store the user's role
  const [nim, setNim] = useState('');
  const [pid,setPid] = useState('')
  const [lastUpdate,setLastUpdate] = useState('')
  const [lastEdit,setLastEdit] = useState('')
  const [status, setStatus] = useState('');// new,edit,submit,expired
  const [OtomatisasiFaip, setOtomatisasiFaip] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [status]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      if (token) {
        // Decode the token to extract user ID
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.nomerInduk;
        setNama(decodedToken.nama);
        setNim(decodedToken.nomerInduk);
        // console.log("nim mauk:" + nim)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        // Make API request with user ID
        const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=info`,config);
        const userData = response.data;
        
        setPid(userData.data.pid)
        setLastUpdate(userData.data.last_updated.slice(0, 10))
        setLastEdit(userData.data.last_change)
        if (userData.data.status === "111-0"){
          setStatus('edit')
        } else if (userData.data.status === "111-1"){
          setStatus("retry")
        } else if (userData.data.status === "111-2"){
          setStatus("submit")
          setOtomatisasiFaip("baru")
        } else if (userData.data.status === "111-3"){
          setStatus("submit")
          setOtomatisasiFaip("proses")
        } else if (userData.data.status === "111-4"){
          setStatus("submit")
          setOtomatisasiFaip("done failed")
        } else if (userData.data.status === "111-5"){
          setStatus("submit")
          setOtomatisasiFaip("done")
        } 

        // if (responseAssesor.data.data.dosen_penilai_faip){
        //   setValidateAssesor(true)
        // }
        // console.log("userdata:"+ userData.data.pid)
        // setUserData(userData);
        // Update the items with fetched data

      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error getting user data');
      setLastUpdate('')
      setLastEdit('')
      setStatus('new')
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.patch(`/form-penilaian/mhs/reset-form?uid=${nim}&pid=${pid}`,{},config);
        // console.log("response add form:"+response)

        // const userData = response.data;
        // setStatus("new")
      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error deleting form');
    }
    setIsModalOpen(false);
    window.location.reload(); 
  };

  const restartForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.patch(`/form-penilaian/mhs/restart-form?uid=${nim}&pid=${pid}`,{},config);
        // console.log("response add form:"+response)
        setStatus("edit");
        navigate(`/form/m/faip/edit/${pid}`, { replace: false });
        // const userData = response.data;
        // setStatus("new")
      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error deleting form');
    }

  };
  const restartDemoForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.patch(`/form-penilaian/mhs/restart-form/demo?uid=${nim}&pid=${pid}`,{},config);
        // console.log("response add form:"+response)
        window.location.reload();
        // const userData = response.data;
        // setStatus("new")
      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error deleting form');
    }

  };

  const exportForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.patch(`/form-penilaian/mhs/export-form?uid=${nim}&pid=${pid}`,{},config);

        window.location.reload();

      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error deleting form');
    }

  };

  const newForm = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const prefix = 'formM-'; // Define your prefix here
      const pid = `${prefix}${nanoid()}`;       
      // console.log("token form:" + token);
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure the Content-Type header is set
          }
        };  
        const response = await axios.post(`/form-penilaian/mhs?uid=${nim}&pid=${pid}&nama=${nama}`, {}, config);
        // console.log("response create form:" + response);
  
        // const userData = response.data;
        setStatus("edit");
        navigate(`/form/m/faip/edit/${pid}`, { replace: false });
        
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Form can\'t be created');
    }
  };

  const submitForm = async () => {
    try{
      const token = localStorage.getItem('jwtToken');

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await axios.patch(`http://192.168.195.241:8000/form-penilaian/mhs/submit-form?uid=${nim}&pid=${pid}`,{},config);
        // console.log("response add form:"+response)

        // const userData = response.data;
        // setStatus("new")
      } else {
        console.error('User not found');
      }
    }catch(error){
      console.error('Error submitting form');
    }
    window.location.reload(); 
  };

  useDocumentTitle('PII TA | FAIP');

  return (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '800px', backgroundColor: '' }}>
      {/* header tambahin underline sama shadow(opsional) */}
      <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Formulir FAIP</h2>
      <div style={{ margin:'1rem 0 0',padding:'1rem', borderRadius:'5px',backgroundColor:'#CCFFCC'}}>
        <h4><InfoCircleOutlined /> Informasi : </h4> 
        <p style={{ padding: '0' }}>- Formulir masih bisa diedit dan dirubah selama belum di submit </p>
        <p style={{ padding: '0' }}>- Jangan lupa untuk mengirim formulir di bagian <span style={{color:'blue'}}>SUBMIT</span> di halaman pengisian formulir FAIP untuk mengakhiri proses pengisian.</p>
        <p style={{ padding: '0' }}>- Proses ekspor ke situs UPD/PII hanya bisa dilakukan <span style={{color:'red'}}>SEKALI</span>.</p>
      </div>
      {/* <h3 style={{ padding: '1rem 0 0' }}>Data Pribadi:</h3> */}
      <p style={{ padding: '1rem 0 0' }}>Nama : {nama}</p> 
      <p style={{ padding: '1rem 0 0' }}>Nim : {nim}</p>
      {/* <p style={{ padding: '1rem 0 0' }}>Last updated : {lastUpdate ? lastUpdate : "-"}</p>
      <p style={{ padding: '1rem 0 0' }}>Last change : {lastEdit ? lastEdit : "-"}</p> */}
      <p style={{ padding: '1rem 0 0' }}>Status : {(status === 'new') ? 'Formulir belum dibuat' : (status === 'edit') ? 'Formulir belum dibuat' : (status === 'retry') ? 'Formulir diulang' : (status === 'submit') ? 'Formulir terkirim': '-'}</p>
      <div>
        {
          (OtomatisasiFaip === "baru") ?
          <> 
          <p style={{ padding: '1rem 0 0' }}>Ekspor ke PII : 

          <Button type="primary" size='large' style={{ borderRadius:'3px',margin:'0 0.5rem' }} onClick={showModal}>
            <span style={{margin:'0 5px'}}><ExportOutlined /></span> Ekspor
          </Button>
          </p>
          <Modal title="Ekspor ke situs PII?" open={isModalOpen} onOk={exportForm} onCancel={handleCancel} okText={'Ekspor'} centered>
            <p>Apakah anda yakin untuk mengekspor formulir ke situs PII?</p>
            <p style={{color:'red'}}>note. Ekspor hanya bisa dilakukan sekali!</p>
          </Modal>
          </> 
        : (OtomatisasiFaip === "proses") ? 
          <>
            <p style={{ padding: '1rem 0 0' }}>Ekspor ke PII : <span style={{color:"orange"}}>Data sedang diekspor, cek akun FAIP anda secara berkala!</span></p>
          </>
        : (OtomatisasiFaip === "done failed") ? 
          <>
            <p style={{ padding: '1rem 0 0' }}>Ekspor ke PII : <span style={{color:"red"}}>Data gagal diekspor, proses ekspor sedang diulang!</span></p>
          </>
        : (OtomatisasiFaip === "done") ? 
        <>
          <p style={{ padding: '1rem 0 0' }}>Ekspor ke PII : <span style={{color:"blue"}}>Data sudah diekspor, cek akun FAIP anda!</span></p>
        </>
        : <p style={{ padding: '1rem 0 0' }}>Ekspor ke PII : <span style={{color:"orange"}}>Harap submit formulir terlebih dahulu</span></p>

        }
      </div>

      <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',margin:'1rem 0'}}>
        { (status === 'new') ? 
          <Button type="primary" size='large' onClick={newForm} style={{ borderRadius:'3px',margin:'0 0.5rem' }} >
              + Baru
          </Button> 
          :(status === 'retry') ? 
          <Button type="primary" size='large' onClick={restartForm} style={{ borderRadius:'3px',margin:'0 0.5rem' }} >
              + Buat Ulang
            </Button> 
            : (status === 'edit') ?
            <>
            <Link className='link-hover' style={{margin:'0 0.5rem'}} to={`/form/m/faip/edit/${pid}`}>
              <Button type="primary" size='large' style={{ borderRadius:'3px' }} >
                <span style={{margin:'0 5px'}}><EditOutlined /></span> Edit
              </Button>
            </Link>
            <Button type="primary" danger size='large' style={{ borderRadius:'3px',margin:'0 0.5rem' }} onClick={showModal}>
              <span style={{margin:'0 5px'}}><DeleteOutlined /></span> Delete
            </Button>
          
            <Modal title="Hapus Formulir?" open={isModalOpen} onOk={deleteForm} onCancel={handleCancel} okText={'Hapus'} okType='danger' centered>
              <p>Apakah anda yakin untuk menghapus <span style={{color:'red'}}>SEMUA</span> data yang anda masukkan?</p>
              <p style={{color:'red'}}>note. data yang dihapus tidak bisa dikembalikan</p>
            </Modal>
            </> 
          : (status === 'submit') ?
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ color: 'blue', marginBottom: '1rem' }}>Data Sudah Berhasil Terkirim!</p>
              <Button 
                type="primary" 
                size="large" 
                style={{ borderRadius: '3px', margin: '0' }} 
                onClick={restartDemoForm}
              >
                <span style={{ marginRight: '5px' }}><UndoOutlined /></span> 
                RESTART DEMO*
              </Button>
            </div>
          : null
      }
      </div> 
      {(status === 'submit') && <p style={{color:'#808080',fontStyle:'italic'}}>Note. (*) not actually exist</p> }

    </div>
  </div>
  )
}
export default Faip
