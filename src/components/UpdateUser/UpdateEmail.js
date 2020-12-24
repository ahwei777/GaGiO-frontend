import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

const PageWrapper = styled.div`
  justify-content: center;
  font-family: Noto Sans TC, Roboto, arial, sans-serif;
`;
const Box = styled.div`
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
  &:visited {
    background-color: ${(props) => props.theme.colors.primary.light};
    border: 0;
    color: #000000;
  }
`;

export default function UpdatePhone() {
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
    type: {
      email: "Please enter an Email",
    },
  };
  const handleFinish = (value) => {};
  return (
    <PageWrapper>
      <Box>
        <FormTitle>變更 Email</FormTitle>
        <Form
          {...layout}
          name="updateEmail"
          onFinish={handleFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="新 Email"
            name="newEmail"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <SubmitButton htmlType="submit">Submit</SubmitButton>
          </Form.Item>
        </Form>
      </Box>
    </PageWrapper>
  );
}
