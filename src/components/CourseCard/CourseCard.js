import React from 'react';
import { Card, Avatar, Progress } from 'antd';
import { StarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setList, selectList } from '../../redux/reducers/cartReducer';
const { Meta } = Card;

export default function CourseCard({ courseInfo }) {
  const dispatch = useDispatch();

  const handleClickAddToCart = () => {
    dispatch(setList(courseInfo));
  };

  return (
    <Card
      cover={<img alt="example" src={courseInfo.imgUrl} />}
      actions={[
        <StarOutlined key="star" />,
        <ShoppingCartOutlined key="shopping" onClick={handleClickAddToCart} />,
      ]}
    >
      <Progress percent={20} />
      <Meta
        avatar={<Avatar src={courseInfo.imgUrl} />}
        title={courseInfo.title}
        description={courseInfo.description}
        style={{ marginTop: 16 }}
      />
    </Card>
  );
}
