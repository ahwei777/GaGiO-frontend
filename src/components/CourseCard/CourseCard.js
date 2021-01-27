import React from 'react';
import { Card, Avatar } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toCurrency } from '../../utils';

const { Meta } = Card;
const CardWrapper = styled.div`
  border: ${(props) => props.theme.colors.primary.main} 1px solid;
  border-bottom: ${(props) => props.theme.colors.primary.main} 5px solid;
  :hover {
    opacity: 0.7;
  }
`;
const TeacherLink = styled(Link)`
  position: absolute;
  left: 8%;
  top: 8%;
  transition: all 0.5s;
  :hover {
    transform: scale(1.3);
  }
`;
const Student = styled.div`
  margin-top: 12px;
`;
const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: right;
  color: ${(props) => props.theme.colors.primary.main};
`;

export default function CourseCard({ course, isBought }) {
  return (
    <>
      <Link to={`/courses/${course.id}`}>
        <CardWrapper>
          <Card cover={<img alt="unavailable" src={course.imgUrl} />}>
            <Meta
              title={course.title}
            />
              {!isBought && <Price>{toCurrency(course.price)}</Price>}
          </Card>
        </CardWrapper>
      </Link>
      {course.Teacher && (
        <TeacherLink to={`/teacher-info/${course.TeacherId}`}>
          <Avatar size={'large'} src={course.Teacher.avatarUrl} />
        </TeacherLink>
      )}
    </>
  );
}
