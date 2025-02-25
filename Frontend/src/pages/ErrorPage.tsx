import { StopOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import oops from "../images/404pii.webp"

const ErrorPage = () => {
  return (
    <div 
        className='error-container' style={{ 
        display:'flex',
        flexDirection:'column',
        padding:'0',
        width:'100vw',
        height:'100vh',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        background:'#d7d1c9',
    }}
    >
      <img src={oops} style={{width: '600px',
            maxWidth: '100%',
            objectFit: 'cover',
            padding:'0 2rem'}} alt="oops" />
      <Typography.Title  level={2}  style={{ padding:'1rem 2rem 0',margin:'0' }}>
        404 Page Not Found   
      </Typography.Title> 
    
    </div>
  )
}

export default ErrorPage