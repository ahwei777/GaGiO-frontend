import React from 'react';
import { Card, Avatar, Progress } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toCurrency } from '../../utils';
const { Meta } = Card;

const CardWrapper = styled.div`
  :hover {
    opacity: 0.7;
    border: transparent 1px solid;
  }
`;

const TeacherLink = styled(Link)`
  position: absolute;
  left: 5%;
  top: 5%;
  transition: all 0.5s;
  :hover {
    transform: scale(1.3);
  }
`;

export default function CourseCard({ course }) {
  return (
    <>
      <Link to={`/courseInfo/${course.id}`}>
        <CardWrapper>
          <Card cover={<img alt="unavailable" src={course.imgUrl} />}>
            <Progress percent={20} />
            <Meta
              title={course.title}
              description={course.description}
              style={{ marginTop: 16 }}
            />
            <h3 align="right">{toCurrency(course.price)}</h3>
            <div>課程時間</div>
            <div>學生人數</div>
          </Card>
        </CardWrapper>
      </Link>
      {course.Teacher && (
        <TeacherLink to={`/teacherInfo/${course.TeacherId}`}>
          <Avatar size={'large'} src={course.Teacher.avatarUrl} />
        </TeacherLink>
      )}
    </>
  );
}
