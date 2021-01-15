import React from 'react';
import { Card, Avatar } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toCurrency } from '../../utils';
const { Meta } = Card;

const CardWrapper = styled.div`
  ${(props) =>
    !props.isPublic &&
    `
    ::before {
    position: absolute;
    z-index: 1;
    top: 25%;
    left: 50%;
    font-size: 20px;
    padding: 10px;
    transform: translate(-50%,-50%);
    content: '未公開課程';
    background-color: grey;
    color: white;
  }
  border: red solid 3px;
  `}
  border: ${(props) => props.theme.colors.primary.main} 1px solid;
  border-bottom: ${(props) => props.theme.colors.primary.main} 5px solid;
  :hover {
    opacity: 0.7;
    border: transparent 1px solid;
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

export default function CourseCard({ course }) {
  return (
    <>
      <Link to={`/courseInfo/${course.id}`}>
        <CardWrapper isPublic={course.isPublic}>
          <Card cover={<img alt="unavailable" src={course.imgUrl} />}>
            <Meta
              title={course.title}
            />
              <Student>同學</Student>
              <Price>{toCurrency(course.price)}</Price>
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
