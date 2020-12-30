import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseList,
  selectCourseList,
  selectIsGettingCourseList,
} from "../../redux/reducers/courseReducer";
import Loading from "../../components/Loading";
import { dummyData as data } from "./dummyData";

export const columns = [
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
      <Link to={`/courseInfo/${record.id}`}>{text}</Link>
    ),
  },
  {
    title: "金額（台幣）",
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
        <Link to={`/console/courses/${record.id}`}>編輯</Link>
      </Space>
    ),
  },
];

export default function CoursesTable() {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourseList);
  const isGettingCourseList = useSelector(selectIsGettingCourseList);

  useEffect(() => {
    dispatch(getCourseList());
    console.log(courses);

    return () => {};
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
              isPublic: item.isPublic ? "是" : "否",
              updatedAt: item.updatedAt.slice(0, 10),
            }))
          }
        />
      )}
    </>
  );
}
