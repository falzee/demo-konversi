import React, { useEffect, useState, createContext, useContext  } from 'react';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import useDocumentTitle from '../hooks/useDocumentTitle';
import UnderConstruct from './underConstruct';
import { jwtDecode } from 'jwt-decode';
import NewFormNilaiKodeEtik from '../components/Dosen/NewFormNilaiKodeEtik'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import VerifNilaiKodeEtik from '../components/Admin/VerifNilaiKodeEtik';
import { InfoCircleOutlined } from '@ant-design/icons';
import VerifNilaiSubmit from '../components/Admin/VerifNilaiSubmit';
import VerifNilaiProfesionalisme from '../components/Admin/VerifNilaiProfesionalisme';
import VerifNilaiKtiga from '../components/Admin/VerifNilaiKtiga';
import VerifNilaiSeminar from '../components/Admin/VerifNilaiSeminar';
import VerifNilaiPenulisanProp from '../components/Admin/VerifNilaiPenulisanProp';
import VerifNilaiManajemenPrak from '../components/Admin/VerifNilaiManajemenPrak';
import VerifNilaiPraktikInsinyur from '../components/Admin/VerifNilaiPraktikInsinyur';

const { TabPane } = Tabs;

interface DsnInfo {
  id_dosen: string;
  dosen_name: string;
  status: string;
}

export const MhsInfoContext = createContext<string | undefined>(undefined);
// IF LAST CHANGE = SUBMITTED TOMBOL AKSI MATI DI FAIP MHS, DISINI BAKAL DIARAHIN KE 404
const FaipAdminVerifNilai: React.FC = () => {
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

  useEffect(() => {
    // Fetch user data when component mounts
    fetchFaipData();
  }, []);

    const fetchFaipData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
    
        if (token) {
          // Decode the token to extract user ID
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.nomerInduk;

          setPenilai(decodedToken.nama)
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          // Make API request with user ID
          const response = await axios.get(`/form-tools/verif-grade/student-info?uid=${userId}&pid=${formIdA}`,config);
          const userDataMhs = response.data.data.studentList;
          const userDataDsn = response.data.data.lecturerList;
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

          else{
            setRedirecting(false); 
          }
          
          // console.log("FETCH SUCCESS?")
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };

  useEffect(() => {
    // Load the saved tab from local storage or default to 'first'
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('activeTab', activeTab);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeTab]);

  useEffect(() => {
    const clearActiveTabOnNavigation = () => {
      localStorage.removeItem('activeTab');
    };

    return () => {
      clearActiveTabOnNavigation();
    };
  }, [location]);
  

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Kode Etik',
      children: <VerifNilaiKodeEtik />,
    },
    {
      key: '2',
      label: 'Profesionalisme',
      children: <VerifNilaiProfesionalisme />,
    },
    {
      key: '3',
      label: 'K3',
      children: <VerifNilaiKtiga />,
    },
    {
      key: '4',
      label: 'Seminar & Workshop',
      children: <VerifNilaiSeminar />,
    },
    {
      key: '5',
      label: 'Penulisan Proposal SK',
      children: <VerifNilaiPenulisanProp />,
    },
    {
      key: '6',
      label: 'Manajemen Praktik',
      children: <VerifNilaiManajemenPrak />,
    },
    {
      key: '7',
      label: 'Praktik Keinsinyuran',
      children: <VerifNilaiPraktikInsinyur />,
    },
    {
      key: '8',
      label: 'Submit',
      children: <VerifNilaiSubmit />,
    },
    
  ];
  // css margin  
  // w,x,y,z =>top,right,bottom left
  // x,y,z =>top,(l+r),bottom
  // y,z =>(t+b),(l+r)
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemHoverColor: '#7e90be',
            itemColor:'#6b7aa1',
            itemSelectedColor:'#6b7aa1',
            inkBarColor:'#6b7aa1',
            cardBg:'#6b7aa1',
          },

        },
      }}
    >
    <div className="faip-mhs-container" style={{}}>
      {redirecting ? null :
      <>

      <div className='header-faip' style={{margin:'1rem 1rem 0',padding:'0 1rem 0'}}>
        <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penilaian FAIP</h2>
        <div style={{ margin:'1rem 0 0',padding:'1rem', borderRadius:'5px',backgroundColor:'#CCFFCC'}}>
                
          <h4><InfoCircleOutlined /> Informasi : </h4> 
          <p>- Harap untuk menunggu semua dosen penilai menyelesaikan penilaian terlebih dahulu!</p>
          <p>- Mahasiswa yang dinilai : {nimMhs} - {namaMhs}</p>
          {/* <p>Dosen penilai : {penilai}</p> */}
          {listDsn.map((item,index) => (
            <div key={item.id_dosen}>
              <p> - Info penilai {index + 1}: {item.id_dosen} - {item.dosen_name} {(item.status === "112-3") 
                ? <span style={{color:'blue'}}>(Selesai)</span> 
                : <span style={{color:'red'}}>(Belum Selesai)</span> }
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className = 'formPage' style={{padding: '0 2rem',overflow: 'hidden'}}>
        <MhsInfoContext.Provider value={nimMhs}>
          <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
        </MhsInfoContext.Provider>
      </div> 

      </>
      }
            
    </div>
    </ConfigProvider>
  );
};

export default FaipAdminVerifNilai;