import React, { useContext, useEffect, useState } from 'react';
import { Table, Form,Input, Button, Select, Upload, Checkbox, Divider, Space, ConfigProvider, Modal, InputNumber, InputNumberProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MhsInfoContext } from '../../pages/FaipAdminVerifNilai'; // Import the context
import { DeleteOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { nanoid } from 'nanoid';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate, useParams } from 'react-router';
import useDocumentTitle from '../../hooks/useDocumentTitle';

interface DsnInfo {
  id_dosen: string;
  dosen_name: string;
  status: string;
}


  // nilaiAkademikRata

const VerifSubmitted: React.FC = () => {
//kumpulan state

    const [matkul, setMatkul] = useState<{ [key: string]: string }>({//jumlah_isian_per_kompetensi
      kodeEtik: "BELUM MASUK",
      profesionalisme: "BELUM MASUK",
      ktiga: "BELUM MASUK",
      seminar: "BELUM MASUK",
      penulisanProp: "BELUM MASUK",
      manajemenPrak: "BELUM MASUK",
      praktikInsinyur: "BELUM MASUK",
    });
    useDocumentTitle('PII TA | Formulir');
    const navigate = useNavigate();
    const location = useLocation();
    const { formIdA } = useParams<{ formIdA: string | undefined }>();
    const [activeTab, setActiveTab] = useState('1'); // Set the default active tab
    const [penilai,setPenilai] = useState('')
    const [namaMhs,setNamaMhs] = useState('')
    const [nimMhs,setNimMhs] = useState('')
    const [redirecting, setRedirecting] = useState(true); 
    const [listDsn, setlistDsn] = useState<DsnInfo[]>([]);
    // const [dataLengths, setDataLengths] = useState<DataLength | null>(null);
    // const [parameters, setParameters] = useState<Parameters>({
    //   W1: 15, 
    //   W2: 18, 
    //   W3: 6, 
    //   W4: 25, 
    //   P5: 6, 
    //   P6: 12, 
    //   P7: 8, 
    //   P8: 8, 
    //   P9: 6, 
    //   P10: 6, 
    //   P11: 6, 
    // });
    // const [grades, setGrades] = useState<Grades | undefined>(undefined);
  
  
    // const [redirecting, setRedirecting] = useState(true); // New state for redirection
    // console.log("0 FORM ID:"+ formId)
  
  
    // useEffect(() => {
    //   fetchUserData(formId);
    // }, [formId]);
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
          const responseUser = await axios.get(`/form-tools/verif-grade/student-info?uid=${userId}&pid=${formIdA}`,config);
          const userDataMhs = responseUser.data.data.studentList;
          const userDataDsn = responseUser.data.data.lecturerList;
          setNamaMhs(userDataMhs.info_mhs.nama);
          setNimMhs(userDataMhs.info_mhs.nomer_induk)
          setlistDsn(userDataDsn)

          if (formIdA !== userDataMhs.pid) {
            // setRedirecting(true); 
            navigate("/unauthorized", { replace: true });
            return
          } else if (userId !== userDataMhs.id_verif){
            // setRedirecting(true); 
            navigate("/unauthorized", { replace: true });        
          } else{
            setRedirecting(false); 
          }

          if (!userDataMhs.status) {
            // setRedirecting(true); 
            navigate("/unauthorized", { replace: true });
            return
          } 
          // else if (userData.status === "112-3" || userData.status === "112-0"){
          //   // setRedirecting(true); 
          //   navigate("/unauthorized", { replace: true });        
          // } 
          else{
            setRedirecting(false); 
          }
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
      <div className='header-faip' style={{margin:'1rem 1rem 0',padding:'0 1rem 0'}}>
          <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penilaian FAIP</h2>
          <div style={{ margin:'1rem 0 0',padding:'1rem', borderRadius:'5px',backgroundColor:'#CCFFCC'}}>
                  
            <h4><InfoCircleOutlined /> Informasi : </h4> 
            <p>- Mahasiswa yang dinilai : {nimMhs} - {namaMhs}</p>
           {/* <p>Dosen penilai : {penilai}</p> */}
            {listDsn.map((item,index) => (
              <div key={item.id_dosen}>
                <p> - Info penilai {index + 1}: {item.id_dosen} - {item.dosen_name} </p>
              </div>
            ))}
          </div>
          <div style={{marginBottom:'2rem'}}>
            <h3 className='headerform' style={{margin:'10px 0'}}>
            Informasi Verifikasi Penilaian (NILAI FINAL)          </h3>
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
          </div>
       </div>
      </ConfigProvider>
       
    );
  };

  export default VerifSubmitted;
