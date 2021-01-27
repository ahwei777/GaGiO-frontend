import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  setUserErrorMessage,
  updateMyPassword,
  logout,
} from '../../../redux/reducers/userReducer';
import { useHistory } from 'react-router';
import { isStrongPassword } from '../../../utils';

const BoxWrapper = styled.div`
  text-align: center;
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
};

const UpdateForm = forwardRef(({ setModalText }, ref) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      form.resetFields();
      dispatch(setUserErrorMessage(null));
    },
  }));

  const handleFinish = (value) => {
    const { oldPassword, newPassword } = value;
    message.loading({
      content: '變更密碼中',
      key: 'isUpdating',
      duration: 0,
    });

    dispatch(updateMyPassword(oldPassword, newPassword)).then((json) => {
      // 更新成功 登出
      if (json.ok === 1) {
        message.success({
          content: '變更密碼成功',
          key: 'isUpdating',
          duration: 5,
        });
        setModalText('更新成功，將於三秒後登出，請使用新密碼重新登入');
        return setTimeout(() => {
          dispatch(logout());
          history.push('/login');
        }, 3000);
      }
      // 更新失敗,設置錯誤訊息
      message.error({
        content: json.errorMessage,
        key: 'isUpdating',
        duration: 5,
      });
    });
  };

  return (
    <BoxWrapper>
      <Form
        form={form}
        {...layout}
        name="updatePassword"
        onFinish={handleFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="舊密碼"
          name="oldPassword"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="新密碼"
          name="newPassword"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, inputValue) {
                if (!inputValue || isStrongPassword(inputValue)) {
                  return Promise.resolve();
                }
                return Promise.reject('密碼規則不符!');
              },
            }),
          ]}
          extra="8～20個字，至少一個數字、一個大寫以及一個小寫字母"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="確認密碼"
          name="confirm"
          dependencies={['newPassword']}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, inputValue) {
                if (
                  !inputValue ||
                  getFieldValue('newPassword') === inputValue
                ) {
                  return Promise.resolve();
                }
                return Promise.reject('密碼和確認密碼不相同!');
              },
            }),
          ]}
          extra="請再次輸入密碼"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            確定
          </Button>
        </Form.Item>
      </Form>
    </BoxWrapper>
  );
});

export default function ModalUpdatePassword({ visible, setVisible }) {
  const ChildRef = useRef();
  const closeModal = () => {
    setVisible(false);
    ChildRef.current.resetForm();
  };
  const [modalText, setModalText] = React.useState();

  useEffect(() => {
    setModalText(<UpdateForm setModalText={setModalText} ref={ChildRef} />);
  }, []);

  return (
    <Modal
      title="變更密碼"
      onCancel={closeModal}
      afterClose={() => setUserErrorMessage(null)}
      visible={visible}
      footer={null}
      closable
    >
      {modalText}
    </Modal>
  );
}
