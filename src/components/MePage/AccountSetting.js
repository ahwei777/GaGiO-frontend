import React, { useState } from "react";
import styled from "styled-components";
import { Divider, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userReducer";

const AboutMeWrapper = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const PageTitle = styled.div`
  padding-top: 32px;
  font-size: 34px;
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
  const titles = [
    { title: "email", label: "Email" },
    { title: "nickname", label: "暱稱" },
  ];
  const user = useSelector(selectUser);
  return (
    <AboutMeWrapper>
      <PageTitle>帳號設定</PageTitle>
      <Divider />
      <MeInfo>
        {titles.map((info) => (
          <Info gutter={16}>
            <InfoTitle span={4} offset={5}>
              {`${info.label}:`}
            </InfoTitle>
            <InfoDetail span={6}>{user[info.title]}</InfoDetail>
            <Update span={4}>
              <UpdateButton to={`/me/update/${info.title}/${user.id}`}>
                {user[info.title] ? `變更${info.label}` : `新增${info.label}`}
              </UpdateButton>
            </Update>
          </Info>
        ))}
        <Info gutter={16}>
          <Update offset={15} span={4}>
            <UpdateButton to={`/me/update/password/${user.id}`}>
              變更密碼
            </UpdateButton>
          </Update>
        </Info>
      </MeInfo>
    </AboutMeWrapper>
  );
}
