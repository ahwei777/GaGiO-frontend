import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Divider, Card, List, Avatar, Button, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyOrderList,
  selectOrderList,
} from "../../redux/reducers/orderReducer";

const AboutMeWrapper = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const PageTitle = styled.div`
  padding-top: 32px 0;
  font-size: 34px;
`;
const EmptyOrderList = styled.div`
  padding: 32px;
  font-size: 28px;
`;
const HistoryList = styled.div``;
const HistoryItem = styled(List.Item)`
  margin: 12px;
`;
const OrderDetailTitle = styled.div`
  width: 10%;
`;
const OrderDetailContent = styled.div`
  width: 15%;
`;
const OrderIsPaid = styled.div`
  width: 25%;
  color: ${(props) => props.theme.colors.primary.main};
  font-weight: bold;
`;
export default function AccountSetting() {
  const dispatch = useDispatch();
  const orderList = useSelector(selectOrderList);
  useEffect(() => {
    dispatch(getMyOrderList());
  }, [dispatch]);

  return (
    <AboutMeWrapper>
      <PageTitle>訂單記錄</PageTitle>
      <Divider />
      {orderList ? (
        <HistoryList>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={orderList}
            split={true}
            renderItem={(item) => (
              <HistoryItem>
                <OrderDetailTitle>購買人：</OrderDetailTitle>
                <OrderDetailContent>{item.name}</OrderDetailContent>
                <OrderDetailTitle>付款方式：</OrderDetailTitle>
                <OrderDetailContent>{item.paymentType}</OrderDetailContent>
                <OrderDetailTitle>總金額：</OrderDetailTitle>
                <OrderDetailContent>{item.sumPrice}</OrderDetailContent>
                <OrderIsPaid>{item.isPaid ? "已完成" : "未完成"}</OrderIsPaid>
              </HistoryItem>
            )}
          />
        </HistoryList>
      ) : (
        <EmptyOrderList>目前沒有訂單記錄</EmptyOrderList>
      )}
    </AboutMeWrapper>
  );
}
