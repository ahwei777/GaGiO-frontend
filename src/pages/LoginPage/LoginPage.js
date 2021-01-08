import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/reducers/userReducer";
import { useHistory, Link } from "react-router-dom";

const LoginPageWrapper = styled.div`
  justify-content: center;
  font-family: Noto Sans TC, Roboto, arial, sans-serif;
`;
const LoginBox = styled.div`
  padding-top: 24px;
  margin: 100px auto;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.primary.light};
  border-radius: 8px;
  max-width: 600px;
  text-align: center;
`;
const FormTitle = styled.div`
  font-size: 32px;
  padding-bottom: 18px;
`;
const FormItem = styled(Form.Item)`
  .ant-form-item-extra {
    text-align: left;
  }
`;
const SubmitButton = styled(Button)`
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
const NoAccount = styled(Link)`
  color: ${(props) => props.theme.colors.primary.main};
  padding: 12px;
  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
    font-weight: bold;
  }
`;

export default function Login() {
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
      offset: 4,
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} is required",
    types: {
      email: "Please enter an email",
    },
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleFinish = (value) => {
    console.log("register");
    const { email, password } = value;
    dispatch(login(email, password));
  };

  // 測試用
  const handleTestAdmin = (value) => {
    dispatch(login("test@gmail.com", "Aa123456"));
  };
  const handleTestUser = (value) => {
    dispatch(login("user@gmail.com", "Aa123456"));
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      return history.push("/");
    }
  }, [user, history]);

  return (
    <LoginPageWrapper>
      <LoginBox>
        <FormTitle>登入</FormTitle>
        <NoAccount to="/register">還沒有帳號！點擊註冊</NoAccount>
        <Form
          {...layout}
          name="login"
          onFinish={handleFinish}
          validateMessages={validateMessages}
        >
          <FormItem
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </FormItem>
          <FormItem {...tailLayout}>
            <SubmitButton htmlType="submit">Submit</SubmitButton>
          </FormItem>
        </Form>
        <div>
          {/* 測試用 */}
          <Button danger onClick={handleTestAdmin}>
            管理員快速通道(test@gmail.com)
          </Button>
          <Button onClick={handleTestUser}>
            一般會員快速通道(user@gmail.com)
          </Button>
          {/* 測試用 */}
        </div>
      </LoginBox>
    </LoginPageWrapper>
  );
}
