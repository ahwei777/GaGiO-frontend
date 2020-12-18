import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

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

export default function CourseSettingForm() {
  const onFinish = (values) => {
    console.log("完成表單", values);
  };

  return (
    <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
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
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
        <Button type="primary" htmlType="submit">
          確認
        </Button>
      </Form.Item>
    </Form>
  );
}
