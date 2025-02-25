import { Button, Checkbox, ConfigProvider, Modal, Select, Space, Tabs, TabsProps, Tag, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';
import FilterKodeEtik from '../components/Admin/FilterKodeEtik'
import FilterProfesionalisme from '../components/Admin/FilterProfesionalisme';
import FilterKtiga from '../components/Admin/FilterKtiga';
import FilterSeminar from '../components/Admin/FilterSeminar';
import FilterManajemenPraktek from '../components/Admin/FilterManajemenPraktek';
import FilterPraktekInsinyur from '../components/Admin/FilterPraktekInsinyur';
import FilterPenulisanProposal from '../components/Admin/FilterPenulisanProposal';


const { TabPane } = Tabs;

const FaipAdminAddFilter = ( ) => {
const [infoDsnPenilaiFaip, setInfoDsnPenilaiFaip] = useState(''); // State to store the user's role
const [activeTab, setActiveTab] = useState('1'); // Set the default active tab
const navigate = useNavigate();
const location = useLocation();

const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    localStorage.setItem('activeTab', tabKey);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Kode Etik',
        children: <FilterKodeEtik />
    },
    {
        key: '2',
        label: 'Profesionalisme',
        children: <FilterProfesionalisme />,
    },
    {
        key: '3',
        label: 'K3',
        children: <FilterKtiga />,
    },
    {
        key: '4',
        label: 'Seminar & Workshop',
        children: <FilterSeminar />,
    },
    {
        key: '5',
        label: ' Manajemen Praktik Keinsinyuran',
        children: <FilterManajemenPraktek />,
    },
    {
        key: '6',
        label: 'Praktik Keinsinyuran',
        children: <FilterPraktekInsinyur />,
    },
    {
      key: '7',
      label: 'Penulisan Proposal SK',
      children: <FilterPenulisanProposal />,
    },
];

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
useDocumentTitle('PII TA | FAIP');

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
        Checkbox: {
            colorPrimary: '#6b7aa1',
            colorPrimaryHover: '#7e90be',
        },
        },
    }}
    >       
    <div style={{ maxHeight: '1500px' }}>
        <div className='form' style={{ padding: '1rem', }}>
            {/* header tambahin underline sama shadow(opsional) */}
            <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Penambahan Filter Konversi FAIP</h2>
            <div style={{ margin:'1rem 0 0',padding:'1rem', borderRadius:'5px',backgroundColor:'#CCFFCC'}}>
                
                <h4><InfoCircleOutlined /> Informasi : </h4> 
                <p>- <span style={{fontWeight:'bold'}}>PENTING :</span> Pengisian filter harap diisi sebelum proses penilaian diterapkan ke seluruh mahasiswa.</p>
                <p>- Harap memilih filter untuk setiap CPMK dengan mengklik checkbox yang tersedia.</p>
                <p>- Harap mengisi filter CPMK pada keseluruhan pilihan MK.</p>
                <p>- Apabila sudah selesai jangan lupa untuk klik <span style={{fontWeight:'bold'}}>SAVE</span> di setiap pilihan MK.</p>
                
            </div>
            <div className = 'formPage' style={{padding: '0',overflow: 'hidden'}}>
                <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
            </div> 

        

        </div>
    </div>
    </ConfigProvider> 
    )
}
export default FaipAdminAddFilter
