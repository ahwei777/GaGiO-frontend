import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { selectCartList } from '../../redux/reducers/cartReducer';
import {
  selectCourse,
  getCourse,
  setCourse,
} from '../../redux/reducers/courseReducer';
import { sendOrder } from '../../redux/reducers/orderReducer';
import { getMe } from '../../redux/reducers/userReducer';
import {
  Typography,
  Table,
  Button,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { toCurrency } from '../../utils';
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_TABLET,
} from '../../constants/breakpoint';

const { Title, Paragraph } = Typography;
const PageWrapper = styled.div`
  padding: ${(props) => props.padding}px;
  ${MEDIA_QUERY_MOBILE_M} {
    display: block;
    position: static;
  }
  ${MEDIA_QUERY_TABLET} {
    display: flex;
    position: relative;
  }
`;
const FormWrapper = styled.div`
  ${MEDIA_QUERY_MOBILE_M} {
    display: block;
    position: static;
  }
  ${MEDIA_QUERY_TABLET} {
    display: flex;
    position: relative;
  }
`;
const LeftContainer = styled.div`
  ${MEDIA_QUERY_TABLET} {
    flex: 1 1 0%;
  }
`;
const RightContainerOuter = styled.div`
  ${MEDIA_QUERY_TABLET} {
    flex: 0 1 350px;
    margin-left: 30px;
  }
`;
const RightContainerInner = styled.div`
  padding: 24px 12px;
  background: ${(props) => props.theme.colors.secondary.light};
  ${MEDIA_QUERY_TABLET} {
    width: 350px;
    position: fixed;
    right: 30px;
  }
`;

const { Option } = Select;
const formLayout = 'vertical';

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 12,
  },
};
const buttonItemLayout = {
  wrapperCol: {
    span: 0,
    offset: 0,
  },
};
const validateMessages = {
  required: '${label} is required',
};

export default function CheckoutPage({ padding }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const cartList = useSelector(selectCartList);
  const course = useSelector(selectCourse);
  const [form] = Form.useForm();
  let sumPrice = 0;
  let sumCourse = 0;
  let data = [];

  useEffect(() => {
    if (id) {
      dispatch(getCourse(id));
      // unmount 時先 clean up 避免下次回來時因為仍有舊資料而短暫顯示
      return () => {
        dispatch(setCourse(null));
      };
    }
  }, [dispatch, id]);

  // params 有帶 id => 單堂結帳
  if (id && course) {
    data.push({
      key: course.id,
      id: course.id,
      title: course.title,
      price: course.price,
      priceString: toCurrency(course.price),
    });
    sumPrice = course.price;
    sumCourse = 1;
  } else if (!id && cartList.length > 0) {
    // 多堂結帳
    for (let i = 0; i < cartList.length; i += 1) {
      data.push({
        key: cartList[i].CourseId,
        id: cartList[i].CourseId,
        title: cartList[i].Course.title,
        price: cartList[i].Course.price,
        priceString: toCurrency(cartList[i].Course.price),
      });
      sumCourse += 1;
    }
    cartList.forEach((el) => {
      sumPrice += el.Course.price;
    });
  }

  const columns = [
    { title: '課程ID', dataIndex: ['id'], key: 'id' },
    {
      title: '課程名稱',
      dataIndex: ['title'],
      key: 'title',
      render: (text, record) => (
        <Link to={`/courseInfo/${record.id}`}>{text}</Link>
      ),
    },
    { title: '售價', dataIndex: ['priceString'], key: 'priceString' },
  ];

  const onFinish = (values) => {
    message.loading({
      content: '付款中',
      key: 'isChecking',
      duration: 0,
    });
    const orderData = {
      ...values,
      sumPrice: sumPrice,
      orderCourses: data.map((el) => {
        return {
          CourseId: el.id,
          amountPaid: el.price,
        };
      }),
    };
    dispatch(sendOrder(orderData)).then((json) => {
      if (json.ok === 1) {
        message.success({
          content: json.message,
          key: 'isChecking',
          duration: 5,
        });
        dispatch(getMe());
        return history.push('/my-course');
      }
      message.error({
        content: json.errorMessage,
        key: 'isChecking',
        duration: 5,
      });
    });
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <PageWrapper padding={padding}>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{ width: '100%' }}
      >
        <FormWrapper>
          <LeftContainer>
            {sumPrice === 0 ? (
              <>
                <Title>歡迎加入免費課程</Title>
                <Paragraph>
                  您選擇的課程皆為免費課程，點擊「確認加入」後就可以開始上課囉！
                </Paragraph>
              </>
            ) : (
              <>
                <Title level={3}>付款資訊</Title>
                <hr/>
                <Form.Item
                  name="name"
                  label="姓名"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="paymentType"
                  label="付款方式"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="請選擇付款方式" allowClear>
                    <Option value="信用卡">信用卡</Option>
                    <Option value="LINE Pay">LINE Pay</Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {((!id && cartList.length > 0) || course) && (
              <>
                <Title level={3}>購買清單 </Title>
                <h3>共有{sumCourse}堂課</h3>
                <hr />
                <Table
                  columns={columns}
                  dataSource={data}
                  style={{ fontSize: '18px' }}
                  pagination={{ pageSize: 5 }}
                />
              </>
            )}
          </LeftContainer>
          <RightContainerOuter>
            <RightContainerInner>
              <Title level={3}>訂單明細</Title>
              <hr />
              <h2 align="right">小計 {toCurrency(sumPrice)}</h2>
              <Form.Item {...buttonItemLayout}>
                <Button type="primary" size="large" htmlType="submit" block>
                  {sumPrice === 0 ? '確認加入' : '確認付款'}
                </Button>
              </Form.Item>
              {sumPrice > 0 && (
                <Form.Item {...buttonItemLayout}>
                  <Button
                    htmlType="button"
                    size="large"
                    onClick={onReset}
                    block
                  >
                    清除資料
                  </Button>
                </Form.Item>
              )}
            </RightContainerInner>
          </RightContainerOuter>
        </FormWrapper>
      </Form>
    </PageWrapper>
  );
}
