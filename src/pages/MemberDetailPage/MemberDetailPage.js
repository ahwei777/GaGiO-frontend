import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMember,
  selectMember,
  updateMemberAuth,
  selectIsGettingMember,
} from "../../redux/reducers/memberReducer";
import styled from "styled-components";
import {
  Layout,
  Breadcrumb,
  Button,
  Typography,
  Divider,
  Select,
  Space,
  Table,
  Tag,
  Descriptions,
} from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import Loading from "../../components/Loading";
import { translateAuth } from "../../utils";

const { Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberContent = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

const columns = [
  {
    title: "課程 ID",
    dataIndex: "CourseId",
    key: "CourseId",
    render: (text) => text,
  },
  {
    title: "課程名稱",
    key: "Course",
    dataIndex: "Course",
    render: (Course) => Course.CourseTitle,
  },
];

const AuthSelection = ({ handleChange }) => {
  const authTypeIds = [1, 2, 3];
  return (
    <>
      <Select
        defaultValue="變更身份"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        {authTypeIds.map((authId) => (
          <Option key={authId} value={authId}>
            {translateAuth(authId)}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default function MemberDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [localAuthTypeId, setLocalAuthTypeId] = useState(0);
  const member = useSelector(selectMember);
  const isGettingMember = useSelector(selectIsGettingMember);

  useEffect(() => {
    dispatch(getMember(id));

    return () => {};
  }, [dispatch]);

  function handleChange(value) {
    setLocalAuthTypeId(value);
  }

  const handleSave = () => {
    if (localAuthTypeId === 0 || localAuthTypeId === member.auth_type) return;
    console.log(localAuthTypeId);
    dispatch(updateMemberAuth(id, localAuthTypeId));
    history.push(`/console/members`); // 把頁面導向會員列表
  };

  return (
    <>
      {isGettingMember && <Loading />}
      {!isGettingMember && member && (
        <>
          <InfoHeader>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/console/members">會員列表</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>會員資料 (ID: {member.id})</Breadcrumb.Item>
            </Breadcrumb>
            <Space size="large">
              <AuthSelection handleChange={handleChange} />
              <Button type="primary" onClick={handleSave}>
                儲存變更
              </Button>
            </Space>
          </InfoHeader>
          <MemberContent>
            <Descriptions title="會員資料" bordered>
              <Descriptions.Item label="會員 ID">{member.id}</Descriptions.Item>
              <Descriptions.Item label="目前身份" span={2}>
                {translateAuth(member.auth_type)}
              </Descriptions.Item>
              <Descriptions.Item label="會員信箱">
                {member.email}
              </Descriptions.Item>
              <Descriptions.Item label="會員暱稱" span={2}>
                {member.nickname}
              </Descriptions.Item>
              <Descriptions.Item label="註冊日期">
                {member.created_at.slice(0, 10)}
              </Descriptions.Item>
              <Descriptions.Item label="更新日期" span={2}>
                {member.updated_at.slice(0, 10)}
              </Descriptions.Item>
              <Descriptions.Item label="購買課程清單" span={3}>
                <Table
                  columns={columns}
                  dataSource={
                    member &&
                    member.courseList.map((item) => ({
                      ...item,
                      key: item.CourseId,
                    }))
                  }
                />
              </Descriptions.Item>
            </Descriptions>
          </MemberContent>
        </>
      )}
    </>
  );
}
