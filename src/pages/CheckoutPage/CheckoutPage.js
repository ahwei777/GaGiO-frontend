import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { selectCartList, getCartList } from '../../redux/reducers/cartReducer';
import {
  selectCourse,
  getCourse,
  setCourse,
} from '../../redux/reducers/courseReducer';
import { sendOrder } from '../../redux/reducers/orderReducer';
import { getMe } from '../../redux/reducers/userReducer';

import { Table, Button, Form, Input, Select } from 'antd';
import { toCurrency } from '../../utils';
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_TABLET,
} from '../../constants/breakpoint';

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

export default function CheckoutPage({ padding }) {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCartList);
  const { id } = useParams();
  const history = useHistory();
  const course = useSelector(selectCourse);
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

  // 收到結帳成功通知

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

  const [form] = Form.useForm();
  const onFinish = (values) => {
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
    dispatch(sendOrder(orderData)).then((res) => {
      dispatch(getCartList());
      dispatch(getMe());
      history.push('/myCourse');
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
        style={{ width: '100%' }}
      >
        <FormWrapper>
          <LeftContainer>
            <h1>付款資訊</h1>
            <hr />
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '此為必填項目' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="paymentType"
              label="付款方式"
              rules={[{ required: true, message: '此為必填項目' }]}
            >
              <Select placeholder="請選擇付款方式" allowClear>
                <Option value="信用卡">信用卡</Option>
                <Option value="LINE Pay">LINE Pay</Option>
              </Select>
            </Form.Item>
            <h1>購買清單</h1>
            {((!id && cartList.length > 0) || course) && (
              <>
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
              <h1>
                <strong>訂單明細</strong>
              </h1>
              <hr />
              <h2 align="right">小計 {toCurrency(sumPrice)}</h2>
              <br></br>
              <Form.Item {...buttonItemLayout}>
                <Button type="primary" size="large" htmlType="submit" block>
                  確認付款
                </Button>
              </Form.Item>
              <Form.Item {...buttonItemLayout}>
                <Button htmlType="button" size="large" onClick={onReset} block>
                  清除資料
                </Button>
              </Form.Item>
            </RightContainerInner>
          </RightContainerOuter>
        </FormWrapper>
      </Form>
    </PageWrapper>
  );
}
