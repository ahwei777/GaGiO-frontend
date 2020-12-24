import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartList,
  deleteCartItem,
} from '../../redux/reducers/cartReducer';
import { Table, Button } from 'antd';
import { StarOutlined, DeleteOutlined } from '@ant-design/icons';

const PageWrapper = styled.div`
  padding: ${(props) => props.padding}px;
  display: flex;
  position: relative;
`;
const LeftContainer = styled.div`
  flex: 1 1 0%;
  margin-right: 36px;
`;
const RightContainerOuter = styled.div`
  flex: 0 1 250px;
  margin-left: 16px;
`;
const RightContainerInner = styled.div`
  width: 250px;
  position: fixed;
  right: 20px;
  padding: 24px 12px;
  background: ${(props) => props.theme.colors.secondary.main};
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

  const handleAddToFavorite = (id) => {
    console.log('handleAddToFavorite id', id);
  };

  const handleDeleteCartItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  // 加入 react 需要的 key
  const data = [];
  for (let i = 0; i < cartList.length; i += 1) {
    data.push({
      key: cartList[i].id,
      ...cartList[i],
    });
  }

  const columns = [
    { title: '課程ID', dataIndex: ['Course', 'id'], key: 'id' },
    {
      title: '課程名稱',
      dataIndex: ['Course', 'title'],
      key: 'title',
      render: (text, record) => (
        <Link to={`courseInfo/${record.CourseId}`}>{text}</Link>
      ),
    },
    { title: '售價', dataIndex: ['Course', 'price'], key: 'price' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (data) => (
        <>
          <div>
            <Button>購買單堂</Button>
          </div>
          <StarOutlined
            style={{ fontSize: '28px' }}
            onClick={() => handleAddToFavorite(data.CourseId)}
          />
          ,
          <DeleteOutlined
            style={{ fontSize: '28px' }}
            onClick={() => handleDeleteCartItem(data.CourseId)}
          />
        </>
      ),
    },
  ];

  return (
    <PageWrapper padding={padding}>
      <LeftContainer>
        <h1>購物車清單</h1>
        <h3>共有{cartList.length}堂課</h3>
        <hr />
        {cartList.length === 0 && (
          <>
            <center>
              <h1>購物車是空的，看看課程？</h1>
              <h1>
                <Link to="/">探索課程</Link>
              </h1>
            </center>
          </>
        )}
        {cartList.length > 0 && (
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.Course.description}</p>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            dataSource={data}
          />
        )}
      </LeftContainer>
      <RightContainerOuter>
        <RightContainerInner>
          <h5>訂單明細</h5>
          <hr />
          <div>小計 NT$ {sumPrice}</div>
          <br></br>
          <Button size="lg" block>
            結帳
          </Button>
        </RightContainerInner>
      </RightContainerOuter>
    </PageWrapper>
  );
}
