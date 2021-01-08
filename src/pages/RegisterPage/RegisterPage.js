import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  selectUser,
  selectErrorMessage,
} from "../../redux/reducers/userReducer";
import { useHistory, Link } from "react-router-dom";

const RegisterPageWrapper = styled.div`
  justify-content: center;
  font-family: Noto Sans TC, Roboto, arial, sans-serif;
`;
const RegisterBox = styled.div`
  padding-top: 24px;
  margin: 100px auto;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.primary.light};
  border-radius: 8px;
  max-width: 750px;
  text-align: center;
`;
const FormTitle = styled.div`
  font-size: 32px;
  padding-bottom: 18px;
`;
const FormItem = styled(Form.Item)`
  .ant-form-item {
    text-align: left;
    &-extra {
      text-align: left;
      padding-left: 3px;
    }
    &-explain-error {
      text-align: left;
      padding-left: 3px;
    }
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
`;
const ErrorMessage = styled.div`
  font-size: 12;
  text-align: left;
  color: #ff0000;
`;
const HasAccount = styled(Link)`
  color: ${(props) => props.theme.colors.primary.main};
  padding: 12px;
  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
    font-weight: bold;
  }
`;
export default function Register() {
  const layout = {
    labelCol: {
      span: 7,
      offset: 4,
    },
    wrapperCol: {
      span: 10,
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
  const errorMessage = useSelector(selectErrorMessage);
  const handleFinish = (value) => {
    const { email, password, confirm, nickname } = value;
    dispatch(register(email, password, confirm, nickname));
    if (user) history.push("/");
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      return history.push("/");
    }
  }, [user, history]);

  return (
    <RegisterPageWrapper>
      <RegisterBox>
        <FormTitle>註冊</FormTitle>
        <HasAccount to="/login">已經有帳號了！點擊登入</HasAccount>
        <Form
          {...layout}
          name="register"
          onFinish={handleFinish}
          validateMessages={validateMessages}
        >
          <FormItem
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
            extra="8～20個字，至少一個數字、一個大寫以及一個小寫字母"
          >
            <Input.Password />
          </FormItem>
          <FormItem
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, inputValue) {
                  if (!inputValue || getFieldValue("password") === inputValue) {
                    return Promise.resolve();
                  }
                  return Promise.reject("!");
                },
              }),
            ]}
            extra="請再輸入一次密碼"
          >
            <Input.Password />
          </FormItem>
          <FormItem
            label="Nickname"
            name="nickname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem {...tailLayout}>
            <SubmitButton htmlType="submit">註冊</SubmitButton>
          </FormItem>
        </Form>
      </RegisterBox>
    </RegisterPageWrapper>
  );
}
