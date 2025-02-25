import React, { useContext, useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MhsInfoContext } from '../../pages/FaipAdminVerifNilai'; // Import the context
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router';


  // nilaiAkademikRata

const VerifNilaiSubmit: React.FC = () => {
//kumpulan state
    const { formIdA } = useParams<{ formIdA: string | undefined }>();
    const nimMhs = useContext<string | undefined>(MhsInfoContext);
    const navigate = useNavigate();

    const [matkul, setMatkul] = useState<{ [key: string]: string }>({//jumlah_isian_per_kompetensi
      kodeEtik: "BELUM MASUK",
      profesionalisme: "BELUM MASUK",
      ktiga: "BELUM MASUK",
      seminar: "BELUM MASUK",
      penulisanProp: "BELUM MASUK",
      manajemenPrak: "BELUM MASUK",
      praktikInsinyur: "BELUM MASUK",
    });

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
          const response = await axios.get(`/form-tools/verif-grade/grading-info?uid=${userId}&pid=${formIdA}&sid=${nimMhs}&ft=all`,config);
          // /form-penilaian/dsn/update-nilai?uid=1998200345678&pid=123456789&ft=seminar
          const userData = response.data;
          if (userData.data.existingVerifGrading.nilai_Verif_kode_etik.nilai_akhir_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              kodeEtik: `SUDAH MASUK (${userData.data.existingVerifGrading.nilai_Verif_kode_etik.nilai_akhir_huruf},${userData.data.existingVerifGrading.nilai_Verif_kode_etik.nilai_akhir_angka.toFixed(0)})`,
            }));
          }

          if (userData.data.existingVerifGrading.nilai_Verif_profesionalisme.nilai_akhir_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              profesionalisme: `SUDAH MASUK (${userData.data.existingVerifGrading.nilai_Verif_profesionalisme.nilai_akhir_huruf},${userData.data.existingVerifGrading.nilai_Verif_profesionalisme.nilai_akhir_angka.toFixed(0)})`,
            }));
          }
          
          if (userData.data.existingVerifGrading.nilai_Verif_k3lh.nilai_akhir_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              ["ktiga"]: `SUDAH MASUK (${userData.data.existingVerifGrading.nilai_Verif_k3lh.nilai_akhir_huruf},${userData.data.existingVerifGrading.nilai_Verif_k3lh.nilai_akhir_angka.toFixed(0)})`,
            }));          
          }

          if (userData.data.existingVerifGrading.nilai_Verif_seminar.nilai_akhir_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              ["seminar"]: `SUDAH MASUK (${userData.data.existingVerifGrading.nilai_Verif_seminar.nilai_akhir_huruf},${userData.data.existingVerifGrading.nilai_Verif_seminar.nilai_akhir_angka.toFixed(0)})`,
            }));          
          }
          
          if (userData.data.existingVerifGrading.nilai_Verif_penulisan_proposal_studi_kasus.nilai_akhir_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              ["penulisanProp"]: `SUDAH MASUK (${userData.data.existingVerifGrading.nilai_Verif_penulisan_proposal_studi_kasus.nilai_akhir_huruf},${userData.data.existingVerifGrading.nilai_Verif_penulisan_proposal_studi_kasus.nilai_akhir_angka.toFixed(0)})`,
            }));          
          }

          if (userData.data.existingVerifGrading.nilai_Verif_manajemen_praktik.nilai_akhir_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              ["manajemenPrak"]: `SUDAH MASUK (${userData.data.existingVerifGrading.nilai_Verif_manajemen_praktik.nilai_akhir_huruf},${userData.data.existingVerifGrading.nilai_Verif_manajemen_praktik.nilai_akhir_angka.toFixed(0)})`,
            }));          
          }

          if (userData.data.existingVerifGrading.nilai_Verif_praktik_keinsinyuran.nilai_akhir_huruf){
            setMatkul((prevValues) => ({
              ...prevValues,
              ["praktikInsinyur"]: `SUDAH MASUK (${userData.data.existingVerifGrading.nilai_Verif_praktik_keinsinyuran.nilai_akhir_huruf},${userData.data.existingVerifGrading.nilai_Verif_praktik_keinsinyuran.nilai_akhir_angka.toFixed(0)})`,
            }));          
          }

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
          await axios.patch(`/form-tools/verif-grade/submit-grading?uid=${userId}&pid=${formIdA}`,{},config);
          navigate(`/form/a/verif-nilai`, { replace: true });
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBorderRadius: 4,
            },
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
        <div style={{marginBottom:'2rem'}}>
          <h3 className='headerform' style={{marginBottom:'10px'}}>
            Submit Verifikasi Nilai
          </h3>
          <h4>Informasi Verifikasi Penilaian (NILAI FINAL)</h4>
          <p>- Kode Etik : { matkul.kodeEtik === 'BELUM MASUK' ? <span style={{color:'red'}}>{matkul.kodeEtik}</span> 
            : <span style={{color:'blue'}}>{matkul.kodeEtik}</span> 
            }
          </p>
          <p>- Profesionalisme : { matkul.profesionalisme === 'BELUM MASUK' ? <span style={{color:'red'}}>{matkul.profesionalisme}</span> 
            : <span style={{color:'blue'}}>{matkul.profesionalisme}</span> 
            }
          </p>
          <p>- K3LH : { matkul.ktiga === 'BELUM MASUK' ? <span style={{color:'red'}}>{matkul.ktiga}</span> 
            : <span style={{color:'blue'}}>{matkul.ktiga}</span> 
            }
          </p>
          <p>- Seminar : { matkul.seminar === 'BELUM MASUK' ? <span style={{color:'red'}}>{matkul.seminar}</span> 
            : <span style={{color:'blue'}}>{matkul.seminar}</span> 
            }
          </p>
          <p>- Penulisan Proposal Studi Kasus : { matkul.penulisanProp === 'BELUM MASUK' ? <span style={{color:'red'}}>{matkul.penulisanProp}</span> 
            : <span style={{color:'blue'}}>{matkul.penulisanProp}</span> 
            }
          </p>
          <p>- Manajemen Praktik : { matkul.manajemenPrak === 'BELUM MASUK' ? <span style={{color:'red'}}>{matkul.manajemenPrak}</span> 
            : <span style={{color:'blue'}}>{matkul.manajemenPrak}</span> 
            }
          </p>
          <p>- Praktik Keinsinyuran : { matkul.praktikInsinyur === 'BELUM MASUK' ? <span style={{color:'red'}}>{matkul.praktikInsinyur}</span> 
            : <span style={{color:'blue'}}>{matkul.praktikInsinyur}</span> 
            }
          </p>
          <p>Note. Pastikan nilai sudah dalam keadaan <span style={{color:'blue'}}>SUDAH MASUK</span> semua sebelum menyelesaikan penilaian!</p>
          {/* {(record.statusPenilaian === 'Data Belum Masuk') ? <p style={{color:'orange'}}>{text}</p> 
            : (record.statusPenilaian === 'Belum Dinilai') ? <p style={{color:'red'}}>{text}</p> 
            : (record.statusPenilaian === 'Proses Penilaian') ? <p style={{color:'orange'}}>{text}</p> 
            : (record.statusPenilaian === 'Nilai Masuk') ? <p style={{color:'green'}}>{text}</p> 
            : null } */}
          <Button type="primary" size='large' style={{ margin:'20px auto',display: "flex", justifyContent: "center",borderRadius:'3px' }} onClick={showModal}>
              Submit Nilai
          </Button>
          <Modal title="Submit Formulir?" open={isModalOpen} onOk={submitForm} onCancel={handleCancel} okText={'Submit'} centered>
          {/* <Modal title="Submit Formulir?" open={isModalOpen} onCancel={handleCancel} okText={'Submit'} centered> */}
            <p>Apakah anda yakin untuk  menyelesaikan penilaian ini?</p>
            <p style={{color:'red'}}>note. Data yang sudah terkirim tidak bisa dirubah lagi!</p>
            </Modal>
        </div>
      </ConfigProvider>
    );
  };

  export default VerifNilaiSubmit;
