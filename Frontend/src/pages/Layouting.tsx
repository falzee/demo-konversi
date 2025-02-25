import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Popover, MenuProps } from 'antd';
import logoElektro from '../images/logo-elektro-300.png';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { removeToken, reset } from '../app/authSlice';
import { jwtDecode } from 'jwt-decode';
const { Header, Sider, Content } = Layout;

const Layouting: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  let location = useLocation();
  // const [isSwap, setIsSwap] = useState(false);

  const [current, setCurrent] = useState(location.pathname);
  const [role, setRole] = useState(''); // State to store the user's role

  useEffect(() => {
    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Parse the JWT token to get the payload
      const decodedToken: any = jwtDecode(token);

      setRole(decodedToken.roles);
    }
  }, []); // This effect runs only once on component mount

  const handleButtonClick = () => {
    // Dispatch an action for reducerA
    dispatch(reset()); 
    dispatch(removeToken());
  };

  type MenuItem = Required<MenuProps>['items'][number];
  
  const itemsMahasiswa: MenuItem[] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: (<Link to='./'>Beranda</Link>),
      // roles:  ['mahasiswa']
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: (<Link to='./user'>User</Link>), 
    },
    {
      key: '/form/m',
      icon: <UnorderedListOutlined />,
      label: (<Link to='./form/m'>Form - mahasiswa</Link>),
      
    },
    {
      key: '/login',
      icon: <LogoutOutlined />,
      label: (<Link to='./login' onClick={handleButtonClick}>Logout</Link>),
    },
  ]
  const itemsDosen: MenuItem[] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: (<Link to='./'>Beranda</Link>),
      // roles:  ['mahasiswa']
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: (<Link to='./user'>User</Link>), 
    },
    {
      key: '/form/d',
      icon: <UnorderedListOutlined />,
      label: (<Link to='./form/d'>Form - dosen</Link>),
      
    },
    {
      key: '/login',
      icon: <LogoutOutlined />,
      label: (<Link to='./login' onClick={handleButtonClick}>Logout</Link>),
    },
  ]
  const itemsAdmin: MenuItem[] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: (<Link to='./'>Beranda</Link>),
      // roles:  ['mahasiswa']
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: (<Link to='./user'>User</Link>), 
    },
    {
      key: '/form/a',
      icon: <ToolOutlined />,
      label: (<Link to='./form/a'>Form - admin tools</Link>),
      
    },
    {
      key: '/login',
      icon: <LogoutOutlined />,
      label: (<Link to='./login' onClick={handleButtonClick}>Logout</Link>),
    },
  ]
  // const getItem = (role:string) => { 
  //   return (role === 'mahasiswa') ? itemsMahasiswa :
  //   (role === 'dosen') ? itemsDosen :
  //   (role === 'admin') ? itemsAdmin :
  //   handleButtonClick;
  // }
    
    //or simply use const [current, setCurrent] = useState(location.pathname)        

  useEffect(() => {
    if (location) {
      if( current !== location.pathname ) {
        setCurrent(location.pathname);
        }
    }
    }, [location, current]);
    
  //klo butuh manual
  // function handleClick(e: any) {
  //     setCurrent(e.key);
  // }

  const toHome = () => {
    navigate("./")
  };
  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  const dispatch = useAppDispatch();


  
  const content = (
    <div>
      <Link to='./login' ><Button className='btn-logout' style={{ borderRadius:'0' }} onClick={handleButtonClick}>Logout</Button></Link>
    </div>
  );
  // css margin  
  // w,x,y,z =>top,right,bottom left
  // x,y,z =>top,(l+r),bottom
  // y,z =>(t+b),(l+r)
  return (
    <Layout style={{minHeight: '100vh'}} >
      <Sider trigger={null}  collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} collapsedWidth={0} 
      style={{ 
          backgroundColor:'#11324D',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: '64px',
          bottom: 0,
          zIndex : 9999,
          boxShadow:'2px 0 6px rgba(0, 21, 41, 0.35)'
      }} 
      width={200} >
        
        <Menu
          theme="dark"
          style={{ backgroundColor:'#11324D' }}
          mode="inline"
          selectedKeys={[current]}
          // onClick={handleMenuClick}
          items={(role === 'mahasiswa') ? itemsMahasiswa : (role === 'dosen') ? itemsDosen : itemsAdmin }
        />
      </Sider>
      <div className={`transparent-layer ${collapsed ? 'collapsed' : ''}`} onClick={toggleSider}></div>
      <Layout >
      <Header style={{ padding: 0, backgroundColor:'#11324D',display:'flex',position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          alignItems: 'center' }}>
          <Button
                className='btn-menu-collapse'
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}

                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                  color: 'white',
                  cursor:'pointer'
                }}
              />

              <div className="logo-sider"  style={{ height:'64px',
                  width:'176px',
                  backgroundColor:'colorBgContainer',
                  justifyContent: 'center',
                  marginLeft:'auto',
                  alignItems: 'center',
                  cursor: 'pointer'}} onClick={toHome}>        
                <img src={logoElektro} alt="logo elektro" style={ {marginTop:'10px',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'cover'} } />
              </div>
          <Popover placement="bottomRight"  content={content} trigger="click">
            <UserOutlined style={{marginLeft:'auto',marginRight:'20px',color:'white',fontSize:'130%',cursor: 'pointer'}} />
          </Popover>
        </Header>

        <Content
          style={{
            minHeight: 280,
            overflow: 'initial',
          }}
        >
          <Outlet />
        </Content>
      
      </Layout>

    </Layout>
  );
};

export default Layouting;
