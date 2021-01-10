import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnitListByCourse,
  updateLocalUnitList,
  updateUnitList,
  selectUnit,
  selectUnitList,
  selectCourse,
  selectIsLoading,
} from "../../redux/reducers/unitReducer";
import styled from "styled-components";
import {
  Layout,
  Breadcrumb,
  Button,
  Form,
  Input,
  Table,
  Tag,
  Space,
  Typography,
} from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
// import UnitForm from "./UnitForm";
import Loading from "../../components/Loading";
const { Content } = Layout;
const { Text } = Typography;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormContainer = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

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

export default function EditUnitPage() {
  const { id, unitId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const course = useSelector(selectCourse);
  const unitList = useSelector(selectUnitList);
  const isLoading = useSelector(selectIsLoading);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUnitListByCourse(id));
    const unit = unitList.find((unit) => unit.id == unitId);
    form.setFieldsValue({ ...unit });

    return () => {};
  }, [dispatch, id, unitId]);

  const onFinish = (values) => {
    console.log("完成表單", values);

    const newUnitList = unitList.map((unit) => {
      if (unit.id == unitId) {
        return { ...unit, ...values };
      }
      return unit;
    });
    console.log(newUnitList);
    dispatch(updateUnitList(id, newUnitList));
    history.push(`/console/courses/${id}`); // 把頁面導向單元列表
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <InfoHeader>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/console/courses">課程列表</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/console/courses/${id}`}>
                  課程管理({course.title})
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>編輯單元</Breadcrumb.Item>
            </Breadcrumb>
          </InfoHeader>
          <FormContainer>
            <Form
              {...layout}
              form={form}
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="title"
                label="單元名稱"
                rules={[{ required: true }]}
              >
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
          </FormContainer>
        </>
      )}
    </>
  );
}
