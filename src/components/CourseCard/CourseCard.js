import React from 'react';
import { Card, Avatar, Spin } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toCurrency } from '../../utils';
import LazyLoad from 'react-lazyload';

const { Meta } = Card;
const CardWrapper = styled.div`
  border: ${(props) => props.theme.colors.primary.main} 1px solid;
  border-bottom: ${(props) => props.theme.colors.primary.main} 5px solid;
  :hover {
    opacity: 0.7;
  }
`;
const StyledImg = styled.img`
  display: block;
  width: 100%;
`;
const ImgPlaceholder = styled(Spin)`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
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
          <Card
            cover={
              <LazyLoad placeholder={<ImgPlaceholder />} offset={100} once>
                <StyledImg alt="unavailable" src={course.imgUrl} />
              </LazyLoad>
            }
          >
            <Meta title={course.title} />
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
