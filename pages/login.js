import {React, useEffect} from 'react'
import GoTrue from 'gotrue-js';
import { Button, Checkbox, Form, Input, Modal } from 'antd';

const auth = new GoTrue({
  APIUrl: 'https://ecomtemplate1.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});

export default function Login() {

  useEffect(()=> {
    // auth.signup('jakenbakenar@aol.com' , 'testP@ss');
    
  },[])

  const onFinish = (values) => {
    console.log('Success:', values);

    auth.login(values.username , values.password).then((response) => {
      console.log(`Success! Response: ${JSON.stringify({ response })}`);
    })
    .catch((error) => console.log(`Failed :( ${JSON.stringify(error)}`));
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
    <Modal open={true} closable={false} title="Login" footer={false} className='auth-form'>


      <Form
      name="login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox><Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Modal>
    </>
  )
}
