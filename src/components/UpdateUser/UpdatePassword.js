import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectErrorMessage,
  updateUserPassword,
} from "../../redux/reducers/userReducer";
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
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const history = useHistory();
  const handleFinish = async (value) => {
    const { newPassword, confirm } = value;
    await dispatch(updateUserPassword(id, newPassword, confirm));
    if (!errorMessage) return history.push("/me");
    console.log(errorMessage);
  };
  return (
    <PageWrapper>
      <Box>
        <FormTitle>變更密碼</FormTitle>
        <Form
          {...layout}
          name="updatePassword"
          onFinish={handleFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="新密碼"
            name="newPassword"
            rules={[{ required: true }]}
            extra="8～20個字，至少一個數字、一個大寫以及一個小寫字母"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="確認密碼"
            name="confirm"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "請再次輸入密碼！" },
              ({ getFieldValue }) => ({
                validator(_, inputValue) {
                  if (
                    !inputValue ||
                    getFieldValue("newPassword") === inputValue
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject("密碼和確認密碼不相同!");
                },
              }),
            ]}
            extra="請再輸入一次密碼"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <SubmitButton htmlType="submit">Submit</SubmitButton>
          </Form.Item>
        </Form>
      </Box>
    </PageWrapper>
  );
}
