import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

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
  max-width: 600px;
  text-align: center;
`;
const FormTitle = styled.div`
  font-size: 32px;
  padding-bottom: 32px;
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
const InputRule = styled.div`
  font-size: 12;
  text-align: left;
  color: #7b7b7b;
`;

export default function Register() {
  const layout = {
    labelCol: {
      span: 8,
      offset: 2,
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
  const handleFinish = (values) => {
    console.log(values);
  };
  return (
    <RegisterPageWrapper>
      <RegisterBox>
        <FormTitle>註冊</FormTitle>
        <Form
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
                type: "password",
                required: true,
                message: "Please enter your email !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter your password !",
              },
            ]}
          >
            <Input.Password />
            <InputRule>至少一個數字、一個大寫以及一個小寫字母</InputRule>
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
            <InputRule>請再輸入一次密碼</InputRule>
          </Form.Item>
          <Form.Item
            label="Nickname"
            name="nickname"
            rules={[
              {
                required: true,
                message: "Please enter your nickname !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <SubmitButton htmlType="submit">Submit</SubmitButton>
          </Form.Item>
        </Form>
      </RegisterBox>
    </RegisterPageWrapper>
  );
}
