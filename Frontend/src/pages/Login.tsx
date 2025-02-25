import { App, Button, Form, Input,message } from 'antd'
import background from '../images/bg-ta-login.jpg';
import logoHome from '../images/logo-elektro-login.png';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAppSelector,useAppDispatch } from '../hooks/reduxHooks';
import { postLogIn } from '../app/authSlice';
import { AppDispatch } from '../app/Store';

const Login = () => {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const {isLogin,error,loading} = useAppSelector((state)=> state.auth)
    const auth = useAppSelector((state)=> state.auth)


    const successMessage = () => {
      message.success('Successfully Logged in');
    };
    const errorMessage = () => {
      message.error('Please Enter Correct Email Address and Password');
    };

    // const serverLost = () => {
    //   message.error('Failed connected to server...');
    // };
    
    const loadMessage = () => {
      const hide = message.loading('Please Wait..', 0);
      // Dismiss manually and asynchronously
      setTimeout(hide, 200);
    };
    
    useEffect(() => {
      form.setFieldsValue(auth)
    }, [form, auth])

    const onFinish = (values:any) => {
      form.validateFields()
			.then(() => {
        const { emailOrId, password } = values;
        const loginCredentials = {
          // Use optional chaining (?.) to handle undefined emailOrId
          email: emailOrId?.includes('@') ? emailOrId : undefined,
          nomerInduk: emailOrId?.includes('@') ? undefined : emailOrId,
          password
        };
			  dispatch(postLogIn(loginCredentials));  
			})
			.catch((error) => {
        console.error('Error fetching login data'); 
      });
    };

    const onFinishFailed = (errorInfo : any) => {
      console.log('Failed:', errorInfo);
    };

    useEffect(() => {
      if (error === true) {
        errorMessage();
        navigate('/login' , { replace: true }); 
      }else if(loading){
        loadMessage();
      }else if(isLogin){
        successMessage();
        navigate('/' , { replace: true }); 
      }
    }, [error,loading]);
    // console.log(isLogin) 
  
    useDocumentTitle('PII TA')

return (
    <div className='container-page' 
    style={{ 
        // backgroundImage: `url(${background})` ,
        backgroundSize: 'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        position:'relative'}}
    >
        
        <div className='auth-container'>
        <img className="logo-login" src={logoHome} alt="PII Logo"
        style={{
            width: '100%'
            }} />

        <div className='login-desc' 
        style={{
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '10px',
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 2,
            color: "#212529",
            textAlign: 'center'
        }}>
            <h2 style={{
                fontWeight: '500',
                marginBottom:'1rem',
                lineHeight: '1',
                fontSize: '2rem'}}>Login</h2>
        </div>
        
        <Form
            form={form}
            name="basic"
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
            requiredMark={false}
        >
          
            <Form.Item
            className='auth-item'
            name="emailOrId"
            rules={[
              {
                required: true,
                message: 'Isian ini harus diisi!',
                
              },
            ]}
            >
            <Input bordered={true} className='input-login-page' placeholder="No. KTA atau Email Anda" />
            </Form.Item>

            <Form.Item
            className='auth-item'
            name="password"
            rules={[
              {
                required: true,
                message: 'Isian ini harus diisi!',

              },
              // {
              //   validator: validateExampleField, // Custom validation rule
              // },
            ]}
            >

            <Input.Password bordered={true} className='input-login-page' placeholder="Password" />
            
            </Form.Item>

            <Form.Item>
                <Button className="button-login" type='primary' htmlType="submit" >
                    Sign In
                </Button>
            </Form.Item>
        </Form>
            {/* <div className='bottom-auth'>
                <p>Belum memiliki akun ? - <a>Silakan Daftar Disini</a></p>
            </div> */}
        </div>
    </div>
    )
}

export default Login
