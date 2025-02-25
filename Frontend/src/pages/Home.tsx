import { Button, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import welcomeTA from '../images/Welcome-update.png';
import { MenuFoldOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = ( ) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    // Decode JWT token to extract username
      if (token) {
        // Decode the token to extract user ID
        const decodedToken: any = jwtDecode(token);
        setUsername(decodedToken.username)
    }
  }, []);

  useDocumentTitle('Hi! ' +  username);

  return (
    <div className='home-container' style={{padding:'0',
    background:'#d7d1c9',
    borderBottom: '1px solid #D3D3D3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',}}>
        <div className='home-page' style={{
        padding:'2rem 2rem',
        display: 'flex',  // Added flex properties for centering
        flexDirection: 'column',  // To stack child elements vertically
        alignItems: 'center',
        textAlign: 'center',}}>
          <img src={welcomeTA} alt="logo welcome" style={ {
            width: '600px',
            maxWidth: '100%',
            objectFit: 'cover'} } />
          <h1 style={{ marginTop: '2rem' }}>Selamat Datang {username} di Situs Penilaian</h1>
          <h3 style={{ marginTop: '1rem' }}>Klik tombol <span style={{backgroundColor:'gray',padding: '3px', borderRadius: '10%' }}><MenuFoldOutlined /></span> di pojok kiri atas untuk mengakses konten. </h3>
        </div>
    </div>
  )
}
export default Home
{/*  */}