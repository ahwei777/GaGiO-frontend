import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartList,
  deleteCartItem,
} from '../../redux/reducers/cartReducer';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
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

export default function CartListPage({ padding }) {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCartList);
  let sumPrice = 0;
  if (cartList.length > 0) {
    cartList.forEach((el) => {
      sumPrice += el.Course.price;
    });
  }

  const handleDeleteCartItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  // 加入 react 需要的 key
  let data = [];
  for (let i = 0; i < cartList.length; i += 1) {
    data.push({
      key: cartList[i].CourseId,
      id: cartList[i].CourseId,
      title: cartList[i].Course.title,
      price: toCurrency(cartList[i].Course.price),
    });
  }

  const columns = [
    { title: '課程ID', dataIndex: ['id'], key: 'id' },
    {
      title: '課程名稱',
      dataIndex: ['title'],
      key: 'title',
      render: (text, record) => (
        <Link to={`courseInfo/${record.id}`}>{text}</Link>
      ),
    },
    { title: '售價', dataIndex: ['price'], key: 'price' },
    {
      title: '動作',
      dataIndex: '',
      key: 'x',
      render: (data) => (
        <>
          <Button>
            <Link to={`/checkout/${data.id}`}>購買單堂</Link>
          </Button>{' '}
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCartItem(data.id)}
          >
            刪除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageWrapper padding={padding}>
      <LeftContainer>
        {cartList.length === 0 && (
          <center>
            <h1>購物車是空的，看看課程？</h1>
            <h1>
              <Link to="/">探索課程</Link>
            </h1>
          </center>
        )}
        {cartList.length > 0 && (
          <>
            <h1>購物車清單</h1>
            <h3>共有{cartList.length}堂課</h3>
            <hr />
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          </>
        )}
      </LeftContainer>
      <RightContainerOuter>
        <RightContainerInner>
          <h1>
            <strong>購物車明細</strong>
          </h1>
          <hr />
          <h2 align="right">小計 {toCurrency(sumPrice)}</h2>
          <br></br>
          {cartList.length > 0 && (
            <Button size="large" block>
              <Link to={`/checkout`}>前往結帳</Link>
            </Button>
          )}
        </RightContainerInner>
      </RightContainerOuter>
    </PageWrapper>
  );
}
