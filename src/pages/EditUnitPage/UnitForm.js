import React from "react";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 12 },
};

const validateMessages = {
  required: "${label}必填",
  types: {
    number: "${label}格式錯誤",
  },
  number: {
    min: "${label}不可小於 ${min}",
  },
};

export default function CourseSettingForm({ unit, onFinish }) {
  return (
    <Form
      {...layout}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={unit}
    >
      <Form.Item name="title" label="單元名稱" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="單元敘述">
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item name="videoUrl" label="影片連結">
        <Input placeholder="請輸入 Youtube 連結" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
        <Button type="primary" htmlType="submit">
          儲存
        </Button>
      </Form.Item>
    </Form>
  );
}
