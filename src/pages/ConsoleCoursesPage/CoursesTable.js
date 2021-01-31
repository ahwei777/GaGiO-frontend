import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseList,
  selectCourseList,
  selectIsGettingCourse,
} from "../../redux/reducers/courseReducer";
import Loading from "../../components/Loading";
import { toCurrency } from '../../utils'
// import { dummyData as data } from "./dummyData";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "課程名稱",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <Link to={`/courses/${record.id}`}>{text}</Link>
    ),
  },
  {
    title: "目前售價",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "是否公開",
    dataIndex: "isPublic",
    key: "isPublic",
  },
  {
    title: "更新於",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/classroom/${record.id}`}>預覽上課頁</Link>
      </Space>
    ),
  },
];

export default function CoursesTable() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourseList);
  const isGettingCourseList = useSelector(selectIsGettingCourse);

  useEffect(() => {
    dispatch(getCourseList({getPublic: 'all'}));
  }, [dispatch]);

  return (
    <>
      {isGettingCourseList && <Loading />}
      {!isGettingCourseList && (
        <Table
          columns={columns}
          dataSource={
            courses &&
            courses.map((item) => ({
              ...item,
              key: item.id,
              price: toCurrency(item.price),
              isPublic: item.isPublic ? "是" : "否",
              updatedAt: item.updatedAt.slice(0, 10),
            }))
          }
        />
      )}
    </>
  );
}
