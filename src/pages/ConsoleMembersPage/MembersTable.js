import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMemberList,
  selectMemberList,
  selectIsGettingMemberList,
} from "../../redux/reducers/memberReducer";
import { Space, Table } from "antd";
import Loading from "../../components/Loading";
import { translateAuth } from "../../utils";

export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "信箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "會員身份",
    dataIndex: "auth",
    key: "auth",
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
        <Link to={`/console/members/${record.id}`}>more</Link>
      </Space>
    ),
  },
];

export default function MembersTable() {
  const dispatch = useDispatch();
  const members = useSelector(selectMemberList);
  const isGettingMemberList = useSelector(selectIsGettingMemberList);

  useEffect(() => {
    dispatch(getMemberList());
    //return () => {};
  }, [dispatch]);

  return (
    <>
      {isGettingMemberList && <Loading />}
      {!isGettingMemberList && (
        <Table
          columns={columns}
          dataSource={
            members &&
            members.map((item) => ({
              ...item,
              key: item.id,
              updatedAt: new Date(item.updatedAt).toLocaleString(),
              auth: translateAuth(item.authTypeId),
            }))
          }
        />
      )}
    </>
  );
}
