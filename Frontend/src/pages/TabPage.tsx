import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import FirstTabForm from '../components/FormOne';
import SecondTabForm from '../components/FormTwo';
import ThirdTabForm from '../components/FormThree';


import useDocumentTitle from '../hooks/useDocumentTitle';
import UnderConstruct from './underConstruct';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import FormMhsSubmit from '../components/FormMhsSubmit';

const { TabPane } = Tabs;

const MultiTabFormPage: React.FC = () => {
  useDocumentTitle('PII TA | Formulir');
  const navigate = useNavigate();
  const location = useLocation();
  const { formId } = useParams<{ formId: string | undefined }>();
  const [activeTab, setActiveTab] = useState('3'); // Set the default active tab
  const [redirecting, setRedirecting] = useState(true); // New state for redirection
  // console.log("0 FORM ID:"+ formId)

  useEffect(() => {
    fetchUserData(formId);
  }, [formId]);

  useEffect(() => {
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

  const fetchUserData = async (formId: string | undefined) => {
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
        const response = await axios.get(`/form-penilaian/mhs?uid=${userId}&ft=info`,config);

        const userData = response.data;

        if (formId !== userData.data.pid) {
          navigate("/unauthorized", { replace: true });
          return
        } else if (userId !== userData.data.student_id){
          navigate("/unauthorized", { replace: true });        
        } else{
          setRedirecting(false); 
        }

        if (!userData.data.status) {
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });
          return
        } else if (userData.data.status === "111-2"){
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });        
        } else if (userData.data.status === "111-3"){
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });        
        }else if (userData.data.status === "111-4"){
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });        
        }else if (userData.data.status === "111-5"){
          // setRedirecting(true); 
          navigate("/unauthorized", { replace: true });        
        }else{
          setRedirecting(false); 
        }
        
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data'); 
    }
  };


  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'I.1',
      children: <FirstTabForm />,
    },
    {
      key: '2',
      label: 'I.2',
      children: <SecondTabForm />,
    },
    {
      key: '3',
      label: 'I.3',
      children: <ThirdTabForm />,
    },
      {
        key: '17',
        label: 'Submit',
        children: <FormMhsSubmit />,
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
    <div className="faip-mhs-container" style={{ maxHeight: '1200px'}}>
      {redirecting ? null :
      <>
      <div className='header-faip' style={{margin:'1rem 1rem 0',padding:'0 1rem 0'}}>
        <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Pengisian FAIP</h2>
      </div>

      <div className = 'formPage' style={{padding: '0 2rem',overflow: 'hidden'}}>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
          </div> 
        </>}
      
    </div>
    </ConfigProvider>
  );
};

export default MultiTabFormPage;