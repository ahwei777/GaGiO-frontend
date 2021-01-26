import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsGettingCourse,
  getUnitByUnitId,
  selectUnit,
  updateUnitByUnitId,
} from '../../../redux/reducers/courseReducer';
import styled from 'styled-components';
import { Layout, Breadcrumb, Button, Form, Input, message } from 'antd';
import Loading from '../../../components/Loading';
const { Content } = Layout;

const PageWrapper = styled.div`
  padding: 24px;
`;
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
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const validateMessages = {
  required: '${label}必填',
  types: {
    number: '${label}格式錯誤',
  },
  number: {
    min: '${label}不可小於 ${min}',
  },
};

export default function EditUnitPage() {
  const { id, unitId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const unit = useSelector(selectUnit);
  const isGettingCourse = useSelector(selectIsGettingCourse);
  const [form] = Form.useForm();
  console.log('original unit', unit);
  console.log('isGettingCourse', isGettingCourse)

  useEffect(() => {
    console.log('useEffect');
    dispatch(getUnitByUnitId(id, unitId));
  }, [dispatch, id, unitId]);

  if (unit) {
    form.setFieldsValue({
      title: unit.title,
      description: unit.description || '',
      videoUrl: unit.videoUrl || '',
    });
  }
  
  const onFinish = (values) => {
    dispatch(updateUnitByUnitId(id, unitId, values)).then((json) => {
      if (json.ok === 1) {
        message.success('單元更新成功', 5);
        return history.push(`/teacher/courses/${id}`); // 把頁面導向單元列表
      }
      return message.error(json.errorMessage, 5);
    });
    //
  };

  return (
    <>
      {isGettingCourse && <Loading />}
      {!isGettingCourse && unit && (
        <PageWrapper>
          <InfoHeader>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <Link to="/teacher/courses">課程列表</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/teacher/courses/${id}`}>
                  課程管理({unit.courseTitle})
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>編輯單元(id:{unit.id})</Breadcrumb.Item>
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
                <Input.TextArea rows={8} style={{ resize: 'none' }} />
              </Form.Item>
              <Form.Item name="videoUrl" label="影片連結">
                <Input placeholder="請輸入 Youtube 連結" />
              </Form.Item>
              <center>
                <Button type="primary" size="large" htmlType="submit">
                  儲存
                </Button>
              </center>
            </Form>
          </FormContainer>
        </PageWrapper>
      )}
    </>
  );
}
