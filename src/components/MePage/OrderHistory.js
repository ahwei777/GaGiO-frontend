import React, { useState } from "react";
import styled from "styled-components";
import { Divider, Card } from "antd";

const { Meta } = Card;

const AboutMeWrapper = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const PageTitle = styled.div`
  padding-top: 32px;
  font-size: 34px;
`;
const HistoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const HistoryCard = styled(Card)`
  margin: 12px 1.5%;
  width: 30%;
`;
const CardImage = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: contain;
`;
const CardMeta = styled(Meta)`
  text-align: left;
`;

export default function AccountSetting() {
  const [courses, setCourses] = useState([
    {
      name: "test",
      discription: "this is a good course",
      image: null,
    },
    {
      name: "test",
      discription: "this is a good course",
      image: null,
    },
    {
      name: "test",
      discription: "this is a good course",
      image: null,
    },
    {
      name: "test",
      discription: "this is a good course",
      image: null,
    },
    {
      name: "test",
      discription: "this is a good course",
      image: null,
    },
  ]);

  return (
    <AboutMeWrapper>
      <PageTitle>訂單記錄</PageTitle>
      <Divider />
      <HistoryList>
        {courses.map((course) => (
          <HistoryCard
            hoverable
            cover={
              <CardImage
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <CardMeta title={course.name} description={course.discription} />
          </HistoryCard>
        ))}
      </HistoryList>
    </AboutMeWrapper>
  );
}
