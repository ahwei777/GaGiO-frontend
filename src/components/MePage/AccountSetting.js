import React, { useState } from "react";
import styled from "styled-components";
import { Divider, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userReducer";
import Loading from "../Loading";

const AboutMeWrapper = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const PageTitle = styled.div`
  padding-top: 32px;
  font-size: 34px;
  &:before {
    display: block;
    content: "";
    height: 45px;
  }
`;
const MeInfo = styled.div`
  text-align: center;
  padding-bottom: 24px;
`;
const Info = styled(Row)`
  padding-top: 4px;
`;
const InfoTitle = styled(Col)`
  text-align: right;
`;
const InfoDetail = styled(Col)`
  text-align: left;
`;
const Update = styled(Col)`
  text-align: right;
`;
const UpdateButton = styled(Link)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary.main};
  transition: transform 0.3s;
  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
    text-decoration: underline;
  }
`;

export default function AccountSetting() {
  const user = useSelector(selectUser);
  return (
    <AboutMeWrapper>
      {user ? (
        <>
          <PageTitle id="accountSetting">帳號設定</PageTitle>
          <Divider />
          <MeInfo>
            <Info gutter={16}>
              <InfoTitle span={4} offset={5}>
                Email：
              </InfoTitle>
              <InfoDetail span={6}>{user.email}</InfoDetail>
            </Info>
            <Info gutter={16}>
              <InfoTitle span={4} offset={5}>
                暱稱：
              </InfoTitle>
              <InfoDetail span={6}>{user.nickname}</InfoDetail>
              <Update span={4}>
                <UpdateButton to={`/me/update/nickname/${user.id}`}>
                  {user.nickname ? `變更暱稱` : `新增暱稱`}
                </UpdateButton>
              </Update>
            </Info>
            <Info gutter={16}>
              <Update offset={15} span={4}>
                <UpdateButton to={`/me/update/password/${user.id}`}>
                  變更密碼
                </UpdateButton>
              </Update>
            </Info>
          </MeInfo>
        </>
      ) : (
        <Loading />
      )}
    </AboutMeWrapper>
  );
}
