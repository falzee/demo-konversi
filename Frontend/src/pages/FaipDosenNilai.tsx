import React, { useEffect, useState, createContext, useContext  } from 'react';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import useDocumentTitle from '../hooks/useDocumentTitle';
import UnderConstruct from './underConstruct';
import { jwtDecode } from 'jwt-decode';
import NewFormNilaiKodeEtik from '../components/Dosen/NewFormNilaiKodeEtik'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import NewFormNilaiProfesionalisme from '../components/Dosen/NewFormNilaiProfesionalisme';
import NewFormNilaiKtiga from '../components/Dosen/NewFormNilaiKtiga';
import NewFormNilaiSeminar from '../components/Dosen/NewFormNilaiSeminar';
import NewFormNilaiPenulisanProp from '../components/Dosen/NewFormNilaiPenulisanProp';
import NewFormNilaiManajemenPrak from '../components/Dosen/NewFormNilaiManajemenPrak';
import NewFormNilaiPraktikInsinyur from '../components/Dosen/NewFormNilaiPraktikInsinyur';

const { TabPane } = Tabs;

export const MhsInfoContext = createContext<string | undefined>(undefined);
// IF LAST CHANGE = SUBMITTED TOMBOL AKSI MATI DI FAIP MHS, DISINI BAKAL DIARAHIN KE 404
const MultiTabFormPage: React.FC = () => {
  useDocumentTitle('PII TA | Formulir');
  const navigate = useNavigate();
  const location = useLocation();
  const { formIdD } = useParams<{ formIdD: string | undefined }>();
  const [activeTab, setActiveTab] = useState('1'); // Set the default active tab
  const [penilai,setPenilai] = useState('')
  const [namaMhs,setNamaMhs] = useState('')
  const [nimMhs,setNimMhs] = useState('')
  const [redirecting, setRedirecting] = useState(true); // New state for redirection
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
    // Fetch user data when component mounts
    fetchFaipData();
  }, []);

    //API = const response = await axios.get(`/form-penilaian/dsn?uid=${userId},config);
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
          const response = await axios.get(`/form-penilaian/dsn/student-info?uid=${userId}&pid=${formIdD}`,config);
          const userData = response.data.data;
          setNamaMhs(userData.info_mhs.nama);
          setNimMhs(userData.info_mhs.nomer_induk)

          if (formIdD !== userData.pid) {
            // setRedirecting(true); 
            navigate("/unauthorized", { replace: true });
            return
          } else if (userId !== userData.id_dosen){
            // setRedirecting(true); 
            navigate("/unauthorized", { replace: true });        
          } else{
            setRedirecting(false); 
          }

          if (!userData.status) {
            // setRedirecting(true); 
            navigate("/unauthorized", { replace: true });
            return
          } else if (userData.status === "112-3" || userData.status === "112-0"){
            // setRedirecting(true); 
            navigate("/unauthorized", { replace: true });        
          } else{
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

  // useEffect(() => {
  //   const fetchClaimData = async () => { 
  //     try {
  //       const token = localStorage.getItem('jwtToken');
    
  //       if (token) {
  //         // Decode the token to extract user ID
  //         const decodedToken: any = jwtDecode(token);
  //         const userId = decodedToken.nomerInduk;

  //         setPenilai(decodedToken.nama)
  //         const config = {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         };
  //         // Make API request with user ID
  //         const responseTwo = await axios.get(`/form-penilaian/dsn/claim-mhs?sid=${nimMhs}&uid=${userId}`,config); // Replace with your API endpoint
  //         const data = responseTwo.data.data;
  //         const lengths: DataLength = {
  //           W1: data.klaimWsatu.length,
  //           W2: data.klaimWdua.length,
  //           W3: data.klaimWtiga.length,
  //           W4: data.klaimWempat.length,
  //           P5: data.klaimPlima.length,
  //           P6: data.klaimPenam.length,
  //           P7: data.klaimPtujuh.length,
  //           P8: data.klaimPdelapan.length,
  //           P9: data.klaimPsembilan.length,
  //           P10: data.klaimPsepuluh.length,
  //           P11: data.klaimPsebelas.length,
  //         };
  
  //         setDataLengths(lengths);
  
  //         // Calculate grades based on lengths and parameters
  //         const calculatedGrades: Grades = {
  //           GW1: calculateGrade(lengths.W1, parameters.W1),
  //           GW2: calculateGrade(lengths.W2, parameters.W2),
  //           GW3: calculateGrade(lengths.W3, parameters.W3),
  //           GW4: calculateGrade(lengths.W4, parameters.W4),
  //           GP5: calculateGrade(lengths.P5, parameters.P5),
  //           GP6: calculateGrade(lengths.P6, parameters.P6),
  //           GP7: calculateGrade(lengths.P7, parameters.P7),
  //           GP8: calculateGrade(lengths.P8, parameters.P8),
  //           GP9: calculateGrade(lengths.P9, parameters.P9),
  //           GP10: calculateGrade(lengths.P10, parameters.P10),
  //           GP11: calculateGrade(lengths.P11, parameters.P11),
  //         };
  
  //         setGrades(calculatedGrades);

  //       } else {
  //         console.error('User not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data'); 
  //     }
  //   };
  //   fetchClaimData();
  // },[nimMhs])

  // const calculateGrade = (length: number, parameter: number): number => {
  //   if (length === 0) return 50;
  //   if (length > 0 && length <= parameter / 2) return 70;
  //   if (length > parameter / 2 && length <= parameter) return 80;
  //   return 100;
  // };

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
  
  // /form-penilaian/dsn/student-info?pid=123456789&uid=1998200345678
  



   
  // useEffect(() => {
  //   function beforeUnload(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //   }

  //   window.addEventListener('beforeunload', beforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', beforeUnload);
  //   };
  // }, []);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Kode Etik',
      children: <NewFormNilaiKodeEtik />,
    },
    {
      key: '2',
      label: 'Profesionalisme',
      children: <NewFormNilaiProfesionalisme />,
    },
    {
      key: '3',
      label: 'K3',
      children: <NewFormNilaiKtiga />,
    },
    {
      key: '4',
      label: 'Seminar & Workshop',
      children: <NewFormNilaiSeminar />,
    },
    {
      key: '5',
      label: 'Penulisan Proposal SK',
      children: <NewFormNilaiPenulisanProp />,
    },
    {
      key: '6',
      label: 'Manajemen Praktik',
      children: <NewFormNilaiManajemenPrak />,
    },
    {
      key: '7',
      label: 'Praktik Keinsinyuran',
      children: <NewFormNilaiPraktikInsinyur />,
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
    <div className="faip-mhs-container" style={{ }}>
      {redirecting ? null :
      <>

      <div className='header-faip' style={{margin:'1rem 1rem 0',padding:'0 1rem 0'}}>
        <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penilaian FAIP</h2>
        <div className='top-content' style={{backgroundColor:'#c2d0c1',padding:'1rem'}}>
          <h3>Informasi Penilaian</h3>
          <p>Dosen penilai : {penilai}</p>
          <p>Mahasiswa yang dinilai : {nimMhs} - {namaMhs}</p>
        </div>
      </div>

      <div className = 'formPage' style={{padding: '0 2rem',overflow: 'hidden'}}>
        <MhsInfoContext.Provider value={nimMhs}>
          <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
        </MhsInfoContext.Provider>
      </div> 

      </>
      }
      
          {/* Add more TabPane for additional tabs */}
      
    </div>
    </ConfigProvider>
  );
};

export default MultiTabFormPage;