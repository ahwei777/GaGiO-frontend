import React from "react";
import styled from "styled-components";
import { Divider, Row, Col } from "antd";
import { Link } from "react-router-dom";

const AboutMeWrapper = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const PageTitle = styled.div`
  padding-top: 20px;
  font-size: 34px;
`;
const MeInfo = styled.div`
  text-align: center;
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

export default function AboutMe() {
  const titles = [
    { title: "name", label: "姓名" },
    { title: "nickname", label: "暱稱" },
    { title: "phone_number", label: "電話" },
  ];
  const user = {
    email: "test@gmail.com",
    nickname: "test",
    phone_number: null,
    name: "測試姓名",
    AuthTypeId: 1,
  };
  return (
    <AboutMeWrapper>
      <PageTitle>個人檔案</PageTitle>
      <Divider />
      <MeInfo>
        {titles.map((info) => (
          <Info gutter={16}>
            <InfoTitle span={4} offset={5}>
              {`${info.label}:`}
            </InfoTitle>
            <InfoDetail span={6}>{user[info.title]}</InfoDetail>
            <Update span={4}>
              <UpdateButton to={`/me/update/${info.title}`}>
                {user[info.title] ? `變更${info.label}` : `新增${info.label}`}
              </UpdateButton>
            </Update>
          </Info>
        ))}
      </MeInfo>
    </AboutMeWrapper>
  );
}
