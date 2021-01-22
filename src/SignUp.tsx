import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import fire from './firebase';

const SignUpForm = () => {
  const onFinish = async (values: { email: string; password: string }) => {
    console.log('Received values of form: ', values);
    try {
      await fire.auth().createUserWithEmailAndPassword(values.email, values.password);
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

      <Form.Item
        name="passwordConfirm"
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="passwordConfirm"
          placeholder="Password Confirm"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
