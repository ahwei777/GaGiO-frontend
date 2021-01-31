import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../../redux/reducers/courseReducer';
import styled from 'styled-components';
import {
  Form,
  Input,
  InputNumber,
  Layout,
  Select,
  Breadcrumb,
  Button,
  Upload,
  message,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


const { Content } = Layout;
const { Option } = Select;

const PageWrapper = styled.div`
  padding: 24px;
  text-align: center;
`;
const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FormContainer = styled(Content)`
  margin: 0px 30px;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const validateMessages = {
  required: '${label}必填',
  types: {
    number: '${label}格式錯誤',
  },
  number: {
    range: '${label}需介於於 ${min}~${max}',
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

export default function NewCoursePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleOnFinish = (value) => {
    if (!value.upload) {
      return message.error('圖片上傳失敗，請稍後再試');
    }
    dispatch(
      addCourse({
        title: value.title,
        price: value.price,
        description: value.description,
        imgUrl: value.upload,
      })
    ).then((res) => {
      if (res.ok === 1) {
        message.success('新增課程成功');
        //dispatch(getMe());
        return history.push('/teacher/courses');
      }
      return message.error(res.errorMessage);
    });
  };

  const handleChange = (info) => {
    //console.log('info', info);
    if (info.file.status === 'uploading') {
      setIsUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      //console.log('done');
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
      return;
    }
  };

  return (
    <PageWrapper>
      <InfoHeader>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/teacher/courses">課程列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增課程</Breadcrumb.Item>
        </Breadcrumb>
      </InfoHeader>
      <FormContainer>
        <Form
          {...layout}
          form={form}
          validateMessages={validateMessages}
          initialValues={{ isPublic: '非公開' }}
          onFinish={handleOnFinish}
        >
          <Form.Item name="isPublic" label="課程狀態">
            <Select disabled>
              <Option value="非公開">非公開</Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="課程名稱" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="課程金額"
            rules={[{ required: true, type: 'number', min: 0, max: 9999 }]}
            extra="單位：新台幣, 限制 0~9999"
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="課程敘述"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} style={{ resize: 'none' }} />
          </Form.Item>
          <Form.Item
            name="upload"
            label="上傳課程封面圖"
            extra="限制格式：JPG/PNG，大小 2 MB 以內"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ImgCrop rotate grid aspect={4/3} modalTitle={'上傳圖片'}>
              <Upload
                name="image"
                listType="picture-card"
                className="upload-course"
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
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <>
                    {isUploading ? (
                      <LoadingOutlined style={{ fontSize: '30px', padding: '60px' }} />
                    ) : (
                      <PlusOutlined style={{ fontSize: '30px', padding: '60px' }} />
                    )}
                  </>
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <center>
            <Button type="primary" size="large" htmlType="submit">
              新增課程
            </Button>
          </center>
        </Form>
      </FormContainer>
    </PageWrapper>
  );
}
