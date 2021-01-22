import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import fire from './firebase';

const LoginForm = () => {
  const onFinish = async (values: { email: string; password: string }) => {
    console.log('Received values of form: ', values);
    try {
      await fire.auth().signInWithEmailAndPassword(values.email, values.password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
