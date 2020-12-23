import React from 'react';
import { Card, Avatar, Progress, Button } from 'antd';
import { StarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, selectCartList } from '../../redux/reducers/cartReducer';
import { toCurrency } from '../../utils';
const { Meta } = Card;

const CourseInfoLinkWrapper = styled.div`
  :hover {
    background-color: ${(props) => props.theme.colors.secondary.light};
  }
`;

export default function CourseCard({ course }) {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCartList);
  const checkIsAlreadyInCart = () => {
    for (let i = 0; i < cartList.length; i += 1) {
      if (cartList[i].CourseId === course.id) {
        // 當前課程已在 cartList 內
        return true;
      }
    }
    return false;
  };
  const handleClickAddToCart = () => {
    if (!checkIsAlreadyInCart()) {
      dispatch(addCartItem(course.id));
    }
  };

  let actionsArray = [];
  if (course.Teacher) {
    actionsArray.push(
      <Link to={`/teacherInfo/${course.TeacherId}`}>
        <Avatar src={course.Teacher.avatarUrl} />
      </Link>
    );
  }
  actionsArray.push(
    <StarOutlined key="star" />,
    checkIsAlreadyInCart() ? (
      <Link to="/cartList">
        <Button type="primary" size="large" danger>
          前進購物車
        </Button>
      </Link>
    ) : (
      <ShoppingCartOutlined key="shopping" onClick={handleClickAddToCart} />
    )
  );

  return (
    <Card
      cover={<img alt="unavailable" src={course.imgUrl} />}
      actions={actionsArray}
    >
      <Progress percent={20} />
      <CourseInfoLinkWrapper>
        <Link to={`/courseInfo/${course.id}`}>
          <Meta
            title={course.title}
            description={course.description}
            style={{ marginTop: 16 }}
          />
          <h3 align="right">{toCurrency(course.price)}</h3>
          <div>課程時間</div>
          <div>學生人數</div>
        </Link>
      </CourseInfoLinkWrapper>
    </Card>
  );
}
