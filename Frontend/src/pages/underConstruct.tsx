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
        {/* // css margin  
  // w,x,y,z =>top,right,bottom left
  // x,y,z =>top,(l+r),bottom
  // y,z =>(t+b),(l+r) */}
      <img src={oops} style={{width: '600px',
        maxWidth: '100%',
        objectFit: 'cover',
        padding:'2rem 2rem 0'}} alt="oops" />
      <Typography.Title  level={2}  style={{ padding:'1rem',margin:'0' }}>
        UNDER CONSTRUCTION...
      </Typography.Title> 
    
    </div>
  )
}

export default unauthorized