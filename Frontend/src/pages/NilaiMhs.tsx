import { FieldTimeOutlined, StopOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const NilaiMhs = () => {
  return (
    <div 
        className='about-container' style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          background:'#d7d1c9',

    }}
    >
      <Typography.Title level={1} style={{ padding:'0',margin:'0' }}>
        {/* <StopOutlined style={{ color: 'red',marginRight:'10px' }} />   */}
        <FieldTimeOutlined style={{fontSize:'64px'}} />  
      </Typography.Title> 
      <Typography.Text  style={{ padding:'0',margin:'1rem' }}>
        Nilai sedang diproses, mohon cek lagi nanti!      
      </Typography.Text> 
    </div>
  )
}

export default NilaiMhs