import React from 'react';
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { login, getMe, selectUser } from '../../redux/reducers/userReducer';
import { useHistory, Link } from 'react-router-dom';

const LoginBox = styled.div`
  padding-top: 10px;
  margin: 16px auto;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.primary.main};
  border-radius: 8px;
  max-width: 750px;
  text-align: center;
`;
const FormTitle = styled.div`
  font-size: 32px;
  padding-bottom: 18px;
`;
/*
const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary.light};
  transition: tranform 0.3s;
  &:hover {
    background-color: #ffffff;
    color: ${(props) => props.theme.colors.primary.main};
    border: 1px solid ${(props) => props.theme.colors.primary.main};
  }
  &:visited {
    background-color: ${(props) => props.theme.colors.primary.light};
    border: 0;
    color: #000000;
  }
`;
*/
const NoAccountMessage = styled(Link)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary.main};
  &:hover {
    font-weight: bold;
  }
`;
const StyledForm = styled(Form)`
  margin: 10px auto;
`;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};
const validateMessages = {
  required: '${label} is required',
  types: {
    email: '請輸入正確信箱格式',
  },
};

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  React.useEffect(() => {
    if (user) {
      return history.push('/');
    }
  }, [user, history]);

  const handleFinish = (value) => {
    const { email, password } = value;
    message.loading({
      content: '登入中',
      key: 'isLogging',
      duration: 0,
    });
    dispatch(login(email, password)).then((json) => {
      if (json.ok === 1) {
        message.success({
          content: '登入成功',
          key: 'isLogging',
          duration: 5,
        });
        dispatch(getMe());
        return history.push('/');
      }
      return message.error({
        content: json.errorMessage,
        key: 'isLogging',
        duration: 5,
      });
    });
  };

  return (
    <LoginBox>
      <FormTitle>登入</FormTitle>
      <NoAccountMessage to="/register">還沒有帳號?</NoAccountMessage>
      <StyledForm
        {...layout}
        name="login"
        onFinish={handleFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="請輸入您註冊的電子信箱" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="請輸入您註冊的密碼" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </StyledForm>
    </LoginBox>
  );
}
