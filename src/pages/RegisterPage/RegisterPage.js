import React from 'react';
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { register, getMe, selectUser } from '../../redux/reducers/userReducer';
import { useHistory, Link } from 'react-router-dom';
import { isStrongPassword } from '../../utils';

const RegisterBox = styled.div`
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
  padding-bottom: 10px;
`;
const HasAccountMessage = styled(Link)`
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
  required: '此為必填項目',
  types: {
    email: '請輸入正確信箱格式',
  },
};

export default function Register() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const handleFinish = (value) => {
    const { email, password, nickname } = value;
    message.loading({
      content: '註冊中',
      key: 'isRegistering',
      duration: 0,
    });
    dispatch(register(email, password, nickname)).then((json) => {
      if (json.ok === 1) {
        message.success({
          content: '註冊成功',
          key: 'isRegistering',
          duration: 5,
        });
        dispatch(getMe());
        return history.push('/');
      }
      return message.error({
        content: json.errorMessage,
        key: 'isRegistering',
        duration: 5,
      });
    });
  };

  return (
    <RegisterBox>
      <FormTitle>註冊</FormTitle>
      <HasAccountMessage to="/login">已經有帳號了?</HasAccountMessage>
      <StyledForm
        {...layout}
        name="register"
        onFinish={handleFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input placeholder="請輸入電子信箱" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, inputValue) {
                if (!inputValue || isStrongPassword(inputValue)) {
                  return Promise.resolve();
                }
                return Promise.reject('密碼規則不符!');
              },
            }),
          ]}
          extra="8～20個字，包含大寫、小寫字母和數字"
        >
          <Input.Password placeholder="請輸入密碼" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={['password']}
          extra="請再次輸入密碼"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, inputValue) {
                if (!inputValue || getFieldValue('password') === inputValue) {
                  return Promise.resolve();
                }
                return Promise.reject('密碼和確認密碼不相同!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nickname"
          name="nickname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="請輸入暱稱" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary" size="large">
            註冊
          </Button>
        </Form.Item>
      </StyledForm>
    </RegisterBox>
  );
}
