import { StopOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import oops from "../images/404pii.webp"

const unauthorized = () => {
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
      <img src={oops} style={{width: '600px',
        maxWidth: '100%',
        objectFit: 'cover',
        padding:'0 2rem'}} alt="oops" />
      <Typography.Title  level={2}  style={{ padding:'1rem 2rem 0',margin:'0' }}>
        403 Unauthorized
      </Typography.Title> 
    
    </div>
  )
}

export default unauthorized