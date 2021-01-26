import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMyOrderList,
  selectOrderList,
} from '../../../redux/reducers/orderReducer';
import { toCurrency } from '../../../utils';

const PageWrapper = styled.div`
  padding: 24px;
`
const EmptyOrderList = styled.div`
  padding: 32px;
  font-size: 28px;
  text-align: center;
`;
const CourseImg = styled.img`
  max-width: 60px;
`;

export default function AccountSetting() {
  const dispatch = useDispatch();
  const orderList = useSelector(selectOrderList);
  useEffect(() => {
    dispatch(getMyOrderList());
  }, [dispatch]);

  const columns = [
    { title: '訂單編號', dataIndex: 'id', key: 'id' },
    { title: '付款者姓名', dataIndex: 'name', key: 'name' },
    { title: '付款方式', dataIndex: 'paymentType', key: 'paymentType' },
    { title: '訂單總額', dataIndex: 'sumPrice', key: 'sumPrice' },
    { title: '已付款', dataIndex: 'isPaid', key: 'isPaid' },
    { title: '訂單成立時間', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  const data = [];
  if (orderList) {
    for (let i = 0; i < orderList.length; ++i) {
      data.push({
        key: i,
        id: orderList[i].id,
        name: orderList[i].name,
        paymentType: orderList[i].paymentType,
        sumPrice: toCurrency(orderList[i].sumPrice),
        isPaid: orderList[i].isPaid ? '是' : '否',
        createdAt: new Date(orderList[i].createdAt).toLocaleString(),
      });
    }
  }
  const expandedRowRender = (row) => {
    const columns = [
      {
        title: '',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render: (imgUrl) => <CourseImg src={imgUrl} />,
      },
      { title: '課程名稱', dataIndex: 'title', key: 'title' },
      { title: '目前售價', dataIndex: 'price', key: 'price' },
      { title: '實付金額', dataIndex: 'amountPaid', key: 'amountPaid' },
    ];
    const data = [];
    const selectedOrderItems = orderList[row.key].Order_items;
    for (let i = 0; i < selectedOrderItems.length; ++i) {
      data.push({
        key: i,
        imgUrl: selectedOrderItems[i].Course.imgUrl,
        title: selectedOrderItems[i].Course.title,
        price: toCurrency(selectedOrderItems[i].Course.price),
        amountPaid: toCurrency(selectedOrderItems[i].amountPaid),
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  return (
    <>
      {orderList ? (
        <PageWrapper>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
          />
        </PageWrapper>
      ) : (
        <EmptyOrderList>目前沒有訂單記錄</EmptyOrderList>
      )}
    </>
  );
}
