import { Button, Descriptions, DescriptionsProps, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Table, { ColumnsType } from 'antd/es/table'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { UserOutlined } from '@ant-design/icons'

interface Item {
  key: string;
  label: string;
  children: any;
}

const User = () => {
  useDocumentTitle('PII TA | User');
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
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
        const response = await axios.get(`/user/profile/${userId}`,config);
        // console.log("response:"+response)

        const userData = response.data;
        // console.log("userdata:"+ userData.nama)
        setUserData(userData);
        // Update the items with fetched data
        setItems([
          {
            key: '1',
            label: 'Nama',
            children: userData.data.nama,
          },
          {
            key: '2',
            label: 'Gelar',
            children: userData.data.gelar,
          },
          {
            key: '3',
            label: 'Jenis Kelamin',
            children: userData.data.jenis_kelamin,
          },
          {
            key: '4',
            label: 'Tempat & Tanggal Lahir',
            children: userData.data.tempat_lahir + ", " + userData.data.tanggal_lahir,
          },
          {
            key: '5',
            label: 'KTP atau Passport',
            children: userData.data.nomor_identifikasi,
          },
          {
            key: '7',
            label: 'Email',
            children: userData.data.email,
          },
          {
            key: '8',
            label: 'Nomor Ponsel',
            children: userData.data.nomor_ponsel,
          },
          {
            key: '9',
            label: 'Alamat Rumah',
            children: userData.data.alamat,
          },
          {
            key: '10',
            label: 'Website',
            children: userData.data.website !== null ? userData.data.website : "-",
          },
          {
            key: '11',
            label: 'Deskripsi',
            children: userData.data.deskripsi !== null ? userData.data.deskripsi : "-",
          },
          // Add more items as needed
        ]);
      } else {
        console.error('user not found');
      }
    } catch (error) {
      console.error('Error fetching user data');
    }
  };


  return (
    <div style={{}}>

        <div className='home-page' style={{padding:'1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {/* h2 bukan bug itu buat simbol */}
          {/*  
            css margin  
            w,x,y,z =>top,right,bottom left
            x,y,z =>top,(l+r),bottom
            y,z =>(t+b),(l+r) 
          */}
            <h2 style={{ margin: '0 0 1rem',textAlign: 'left',width:'100%',maxWidth:'800px' }}>Profil Data Pribadi</h2>
            <div style={{ width: '100%',maxWidth:'800px' }}>
            {userData ? (
              <Descriptions bordered items={items} column={1} labelStyle={{width:'140px'}} size='middle' />
              ) : (
              <p>Loading...</p>
            )}
            </div>
        </div>
    </div>
  )
}

export default User

