import { Button, ConfigProvider, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Search, { SearchProps } from 'antd/es/input/Search';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
interface DataType {
  key: string;
  nama: string;
  nim: string;
  angkatan: number;
  statusPenilaian: string;
}

const getStatusPenilaian = (status:string) => {
  switch(status) {
    case "112-0":
      return "Data Belum Masuk";
    case "112-1":
      return "Belum Dinilai";
    case "112-2":
      return "Proses Penilaian";
    case "112-3":
      return "Sudah Dinilai";
    default:
      return "Status Tidak Diketahui";
  }
};
const FaipDosen = ( ) => {
  useDocumentTitle('PII TA | FAIP');
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState<DataType[]>([]);

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
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          // Make API request with user ID
          const response = await axios.get(`/form-penilaian/dsn?uid=${userId}`,config);
          const userData = response.data.data;
          const transformedData = userData.map((item:any) => ({
            key: item.pid, // antd Table requires a unique key for each row
            nama: item.info_mhs.nama,
            nim: item.info_mhs.nomer_induk,
            angkatan: item.info_mhs.angkatan,
            statusPenilaian: getStatusPenilaian(item.status)
          }));
  
          setDataSource(transformedData);
          // console.log("FETCH SUCCESS?")
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data'); 
      }
    };
    const columns: TableColumnsType<DataType> = [
      {
        title: 'Nama',
        key:'nama',
        dataIndex: 'nama',
        showSorterTooltip: true,
      },
      {
        title: 'NIM',
        key:'nim',
        dataIndex: 'nim',
      },
      {
        title: 'Angkatan',
        key:'angkatan',
        dataIndex: 'angkatan',
        sorter: (a, b) => a.angkatan - b.angkatan,
      },
      {
        title: 'Status',
        key:'statusPenilaian',
        dataIndex: 'statusPenilaian',
        filters: [
          {
            text: 'Data Belum Masuk',
            value: 'Data Belum Masuk',
          },
          {
            text: 'Belum Dinilai',
            value: 'Belum Dinilai',
          },
          {
            text: 'Proses Penilaian',
            value: 'Proses Penilaian',
          },
          {
            text: 'Sudah Dinilai',
            value: 'Sudah Dinilai',
          },
        ],
        render: (text: string, record: DataType) => (
          <div>
            {(record.statusPenilaian === 'Data Belum Masuk') ? <p style={{color:'orange'}}>{text}</p> 
            : (record.statusPenilaian === 'Belum Dinilai') ? <p style={{color:'red'}}>{text}</p> 
            : (record.statusPenilaian === 'Proses Penilaian') ? <p style={{color:'orange'}}>{text}</p> 
            : (record.statusPenilaian === 'Sudah Dinilai') ? <p style={{color:'green'}}>{text}</p> 
            : null }
          </div>
        ),
        onFilter: (value, record) => record.statusPenilaian.indexOf(value as string) === 0,
      },
      {
        title: 'Aksi',
        dataIndex: 'aksi',
        align:'center',
        width: 150,
        render: (text: string, record: DataType) => (
          <div>
            {(record.statusPenilaian === 'Data Belum Masuk') ? 
              <p style={{color:'#808080',fontStyle:'italic'}}>menunggu mahasiswa*</p>     
            :(record.statusPenilaian === 'Belum Dinilai') ? 
              <Button onClick={() => navigate(`/form/d/faip/edit/${record.key}`)} type='primary'>
                Baru <PlusOutlined />
              </Button>     
            : (record.statusPenilaian === 'Proses Penilaian') ?
              <>
                <Button onClick={() => navigate(`/form/d/faip/edit/${record.key}`)} style={{margin:'0 5px'}} type='primary'>
                  Edit <EditOutlined />
                  {/* EDIT = setSTATUS TO 112-4 via PATCH API */}
                </Button> 
                {/* <Button style={{margin:'0 5px'}} type='primary' danger>
                  <DeleteOutlined />
                </Button>  */}
              </>
            : (record.statusPenilaian === 'Sudah Dinilai') ? 
              <p style={{color:'#808080',fontStyle:'italic'}}>terkirim*</p>
            : null
            }
          </div>
        ),
      },
    ];
  

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
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
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '1000px', backgroundColor: '' }}>
      {/* header tambahin underline sama shadow(opsional) */}
        <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Pengisian Nilai Mahasiswa</h2>
      <div className='header-faip-dosen'>
        <h3>Silakan pilih mahasiswa yang akan anda nilai!</h3>
        {/* <Search className='header-faip-dosen-search' placeholder="Cari mahasiswa?" onSearch={onSearch} style={{ width: 200 }} /> */}
      </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          showSorterTooltip={true}
          scroll={{ y: 400, x: 'max-content' }}
        />
        {/* <div>

        </div> */}
        <p style={{color:'#808080',fontStyle:'italic'}}>Note. (*) nilai sudah masuk ke dalam sistem.</p>
    </div>
  </div>
  </ConfigProvider>

  )
}
export default FaipDosen