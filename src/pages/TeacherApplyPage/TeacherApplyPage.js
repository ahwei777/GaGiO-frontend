import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { applyTeacher } from '../../redux/reducers/teacherReducer';
import { getMe } from '../../redux/reducers/userReducer';
import ImgCrop from 'antd-img-crop';

const RegisterPageWrapper = styled.div`
  padding: 10px;
`;
const RegisterBox = styled.div`
  padding: 10px;
  margin: 10px auto;
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
const StyledForm = styled(Form)`
  margin: 10px auto;
`;

const layout = {
  labelCol: {
    span: 6,
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

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  if (isJpgOrPng && isLt2M) {
    message.loading({
      content: '圖片上傳中...',
      key: 'isUploading',
      duration: 0,
    });
  }
  return isJpgOrPng && isLt2M;
}

export default function TeacherApplyPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();

  const handleChange = (info) => {
    console.log('info', info);
    if (info.file.status === 'uploading') {
      setIsUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log('done');
      message.success({
        content: '圖片上傳完成',
        key: 'isUploading',
        duration: 2,
      });
      // Get this url from response in real world.
      const returnUrl = info.file.response.data.link;
      setImageUrl(returnUrl);
      console.log('returnUrl', returnUrl)
      form.setFieldsValue({
        upload: returnUrl,
      });
      return
    }
  };

  const handleOnFinish = (value) => {
    console.log(value);
    if (!value.upload) {
      return message.error('圖片上傳失敗，請稍後再試');
    }
    dispatch(
      applyTeacher({
        name: value.name,
        description: value.description,
        avatarUrl: value.upload,
      })
    ).then((res) => {
      if (res.ok === 1) {
        message.success('申請老師成功');
        dispatch(getMe());
        return history.push('/');
      }
      return message.error(res.errorMessage);
    });
  };

  return (
    <RegisterPageWrapper>
      <RegisterBox>
        <FormTitle>申請開課</FormTitle>
        <StyledForm
          {...layout}
          form={form}
          onFinish={handleOnFinish}
          validateMessages={validateMessages}
        >
          <FormItem
            label="老師姓名"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="請輸入老師姓名" />
          </FormItem>
          <Form.Item
            label="老師介紹"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea
              rows={8}
              style={{ resize: 'none' }}
              placeholder="請輸入介紹文字"
            />
          </Form.Item>
          <Form.Item
            name="upload"
            label="上傳大頭照"
            extra="限制格式：JPG/PNG，大小 2 MB 以內"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ImgCrop rotate shape="round">
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                action="https://api.imgur.com/3/image"
                headers={{
                  Authorization: 'Client-ID ef0e0fd605be920',
                  'X-Requested-With': null,
                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: '100%', borderRadius: '50%' }}
                  />
                ) : (
                  <>
                    {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                  </>
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <br />
          <FormItem {...tailLayout}>
            <Button htmlType="submit" size="large" type="primary">
              送出申請
            </Button>
          </FormItem>
        </StyledForm>
      </RegisterBox>
    </RegisterPageWrapper>
  );
}
