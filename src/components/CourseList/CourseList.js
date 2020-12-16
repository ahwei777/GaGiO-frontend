import React from 'react';
import { Row, Col } from 'antd';
import CourseCard from '../CourseCard/';

export default function Cart() {
  return (
    <>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col xs={12} md={8}>
          <CourseCard
            courseInfo={{
              key: 1,
              title: '從零開始學習 HTML',
              description: '教到你會',
              price: 1500,
              imgUrl: '/img/courseList/html.jpg',
            }}
          />
        </Col>
        <Col xs={12} md={8}>
          <CourseCard
            courseInfo={{
              key: 2,
              title: '從零開始學習 CSS',
              description: '教到你會',
              price: 1000,
              imgUrl: '/img/courseList/css.jpg',
            }}
          />
        </Col>
        <Col xs={12} md={8}>
          <CourseCard
            courseInfo={{
              key: 3,
              title: '從零開始學習 JavaScript',
              description: '教到你會',
              price: 3000,
              imgUrl: '/img/courseList/javascript.jpg',
            }}
          />
        </Col>
        <Col xs={12} md={8}>
          <CourseCard
            courseInfo={{
              key: 4,
              title: '中級 JavaScript',
              description: '教到你會',
              price: 3000,
              imgUrl: '/img/courseList/javascript.jpg',
            }}
          />
        </Col>
        <Col xs={12} md={8}>
          <CourseCard
            courseInfo={{
              key: 5,
              title: '進階 JavaScript',
              description: '教到你會',
              price: 3000,
              imgUrl: '/img/courseList/javascript.jpg',
            }}
          />
        </Col>
      </Row>
    </>
  );
}
