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
const LoadingBackground = styled.div`
  background-color: lightgray;
  // padding-top percentage is based on the width of the element.
  padding-top: 75%;
  position: relative;
`;
const StyledImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  display: block;
  width: 100%;
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
              <LoadingBackground>
                {/* 因上層 padding-top 排擠，須修正定位以讓 lazyload 正確偵測該元素是否進入 viewport */}
                <LazyLoad
                  style={{ position: 'absolute', top: '0px', width: '100%' }}
                  debounce={500}
                  offset={100}
                  resize={true}
                  once
                >
                  <StyledImg alt="unavailable" src={course.imgUrl} />
                </LazyLoad>
              </LoadingBackground>
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
