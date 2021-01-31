import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getMe } from '../../../redux/reducers/userReducer';
import { updateTeacherInfo } from '../../../redux/reducers/teacherReducer';
import ImgCrop from 'antd-img-crop';

const PageWrapper = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 24px;
`;

const Info = styled.div`
  font-size: 16px;
  text-align: center;
`;
const FormContainer = styled.div`
  margin-top: 12px;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
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

export default function TeacherSetting() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: user.Teacher.name,
      description: user.Teacher.description,
      upload: user.Teacher.avatarUrl,
    });
    setImageUrl(user.Teacher.avatarUrl);
  }, [form, user]);

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
      form.setFieldsValue({
        upload: returnUrl,
      });
    }
  };

  const handleOnFinish = (value) => {
    console.log(value);
    if (!value.upload) {
      return message.error('圖片上傳失敗，請稍後再試');
    }
    // 重複判定
    if (
      value.name === user.Teacher.name &&
      value.description === user.Teacher.description &&
      value.upload === user.Teacher.avatarUrl
    ) {
      return message.warning('資料無異動');
    }
    dispatch(
      updateTeacherInfo({
        name: value.name,
        description: value.description,
        avatarUrl: value.upload,
      })
    ).then((res) => {
      if (res.ok === 1) {
        message.success('資料更新成功');
        return dispatch(getMe());
      }
      return message.error(res.errorMessage);
    });
  };

  return (
    <PageWrapper>
      <Info>申請時間：{new Date(user.Teacher.createdAt).toLocaleString()}</Info>
      <Info>更新時間：{new Date(user.Teacher.updatedAt).toLocaleString()}</Info>
      <FormContainer>
        <Form {...layout} form={form} onFinish={handleOnFinish}>
          <Form.Item
            name="name"
            label="老師名稱"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="老師介紹"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} style={{ resize: 'none' }} />
          </Form.Item>
          <Form.Item
            name="upload"
            label="上傳大頭照"
            //valuePropName="fileList"
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
                  <>{isUploading ? <LoadingOutlined /> : <PlusOutlined />}</>
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <center>
            <Button type="primary" size="large" htmlType="submit">
              確認更新
            </Button>
          </center>
        </Form>
      </FormContainer>
    </PageWrapper>
  );
}
