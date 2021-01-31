import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
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

function CourseSettingForm({ course }, ref) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  useImperativeHandle(ref, () => ({
    getFieldsValue: () => {
      return form.validateFields();
    },
  }));
  useEffect(() => {
    form.setFieldsValue({
      isPublic: course.isPublic ? '公開' : '非公開',
      title: course.title,
      price: course.price,
      description: course.description,
      upload: course.imgUrl,
    });
    setImageUrl(course.imgUrl);
  }, [form, course]);
  return (
    <Form form={form} {...layout} validateMessages={validateMessages}>
      <center>建立時間：{new Date(course.createdAt).toLocaleString()}</center>
      <center>最後更新：{new Date(course.updatedAt).toLocaleString()}</center>
      <br />
      <Form.Item name="isPublic" label="課程狀態" rules={[{ required: true }]}>
        <Select>
          <Option value="公開">公開</Option>
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
        label="Upload"
        //valuePropName="fileList"
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
              <div>
                {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>上傳大頭照</div>
              </div>
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>
    </Form>
  );
}

export default forwardRef(CourseSettingForm);
