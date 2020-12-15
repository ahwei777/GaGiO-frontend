import React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setList, selectList } from '../../redux/reducers/cartReducer';
import { ThemeContext } from 'styled-components';
import { Table } from 'antd';
import { StarOutlined, DeleteOutlined } from '@ant-design/icons';

const MainWrapper = styled.div`
  display: flex;
  position: relative;
`;
const LeftContainer = styled.div`
  flex: 1 1 0%;
  margin-right: 36px;
`;
const RightContainerOuter = styled.div`
  flex: 0 1 250px;
`;
const RightContainerInner = styled.div`
  width: 300px;
  position: fixed;
  right: 20px;
  padding: 24px 12px;
  background: ${(props) => props.theme.colors.secondary.main};
`;

export default function Cart() {
  const cartList = useSelector(selectList);
  let sumPrice = 0;
  cartList.forEach((el) => {
    sumPrice += el.price;
  });

  const handleAddToFavorite = (id) => {
    console.log('handleAddToFavorite id', id);
  };

  const handleDeleteFromCart = (id) => {
    console.log('handleDeleteFromCart id', id);
  };

  const columns = [
    { title: '課程ID', dataIndex: 'key', key: 'key' },
    { title: '課程名稱', dataIndex: 'title', key: 'title' },
    { title: '售價', dataIndex: 'price', key: 'price' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <>
          <div>購買單堂</div>
          <StarOutlined
            style={{ fontSize: '24px' }}
            onClick={() => handleAddToFavorite(record.id)}
          />
          ,
          <DeleteOutlined
            style={{ fontSize: '24px' }}
            onClick={() => handleDeleteFromCart(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <MainWrapper>
      <LeftContainer>
        <h1>購物車清單</h1>
        <h3>共有{cartList.length}堂課</h3>
        <hr />
        {cartList.length === 0 && (
          <>
            <center>
              <h1>購物車是空的，看看課程？</h1>
              <h1><Link to="/">探索課程</Link></h1>
            </center>
          </>
        )}
        {cartList.length > 0 && (
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            dataSource={cartList}
          />
        )}
      </LeftContainer>
      <RightContainerOuter>
        <RightContainerInner>
          <h5>訂單明細</h5>
          <hr />
          <div>小計 NT$ {sumPrice}</div>
          <br></br>
          <button size="lg" block>
            結帳
          </button>
        </RightContainerInner>
      </RightContainerOuter>
    </MainWrapper>
  );
}
