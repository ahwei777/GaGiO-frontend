import React from "react";

import { Form, Input, InputNumber, Button } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
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

export default function CourseSettingForm() {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name="name" label="課程名稱" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="課程金額"
        rules={[{ required: true, type: "number", min: 0 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="introduction" label="課程敘述">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          確認
        </Button>
      </Form.Item>
    </Form>
  );
}
