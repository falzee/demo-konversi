import { Button, ConfigProvider, Divider, Space, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import Table, { ColumnsType } from 'antd/es/table';
import { title } from 'process';
import React, { useEffect, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

const FormDosen = ( ) => {
  useDocumentTitle('PII TA | Form');

  // css margin  
  // w,x,y,z =>top,right,bottom left
  // x,y,z =>top,(l+r),bottom
  // y,z =>(t+b),(l+r)
  return (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: '#6b7aa1', // Default background color
          colorPrimaryHover: '#7e90be', // Hover background color#7e90be
          defaultBorderColor:'#6b7aa1',
          defaultColor:'#6b7aa1',
          defaultBg:'none',
        },
      },
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className='form' style={{ padding: '1rem', width: '100%', maxWidth: '800px', backgroundColor: '' }}>
      {/* header tambahin underline sama shadow(opsional) */}
      <h2 style={{ padding: '0 0 1rem', textAlign: 'left', width: '100%', borderBottom: '2px solid #D3D3D3' }}>Pengisian Formulir</h2>
  
      <h3 style={{ padding: '1rem 0 0' }}>Silakan pilih formulir yang akan anda isi di bawah ini!</h3>
  
      <Link
        to='/form/d/faip'
        style={{ textDecoration: 'none', display: 'block', width: '100%', margin: '1rem 0' }}
      >
        <Button data-cy="faip-dsn" style={{ borderRadius: '3px', width: '100%', textAlign: 'left', height: 'auto', padding: '10px' }}>
          <h2 style={{ margin: 0, whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            <FormOutlined /> Penilaian FAIP
          </h2>
          <Divider style={{ margin: '5px 0', borderColor: '#7e90be', borderWidth: '1px' }} plain />
          <p style={{ margin: 0, whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            Konversi nilai mahasiswa dari FAIP ke nilai akhir
          </p>
        </Button>
      </Link>

    </div>
  </div>
  </ConfigProvider>
  )
}
export default FormDosen