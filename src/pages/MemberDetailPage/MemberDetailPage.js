import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMember,
  selectMember,
  updateMemberAuth,
  selectIsGettingMember,
} from '../../redux/reducers/memberReducer';
import styled from 'styled-components';
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
} from 'antd';
import Loading from '../../components/Loading';
import { translateAuth } from '../../utils';

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
    title: '課程 ID',
    dataIndex: 'CourseId',
    key: 'CourseId',
    render: (text) => text,
  },
  {
    title: '課程名稱',
    key: 'Course',
    dataIndex: 'Course',
    render: (Course) => Course.CourseTitle,
  },
];

const AuthSelection = ({ selectedUserId, handleChange }) => {
  const authTypeIdList = [1, 2, 3];
  return (
    <>
      <Select
        style={{ width: 120 }}
        onChange={handleChange}
        defaultValue={translateAuth(selectedUserId)}
      >
        {authTypeIdList.map((authTypeId) => (
          <Option key={authTypeId} value={authTypeId}>
            {translateAuth(authTypeId)}
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
  }, [dispatch, id]);

  function handleChange(value) {
    setLocalAuthTypeId(value);
  }

  const handleSave = () => {
    if (localAuthTypeId === 0 || localAuthTypeId === member.authTypeId) return;
    dispatch(updateMemberAuth(id, localAuthTypeId));
    history.push(`/console/members`); // 把頁面導向會員列表
  };

  return (
    <>
      {isGettingMember && <Loading />}
      {!isGettingMember && member && (
        <>
          <InfoHeader>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <Link to="/console/members">會員列表</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>會員資料 (ID: {member.id})</Breadcrumb.Item>
            </Breadcrumb>
            <Space size="large">
              <AuthSelection
                handleChange={handleChange}
                selectedUserId={member.authTypeId}
              />
              <Button type="primary" onClick={handleSave}>
                變更身分
              </Button>
            </Space>
          </InfoHeader>
          <MemberContent>
            <Descriptions title="會員資料" bordered>
              <Descriptions.Item label="會員 ID">{member.id}</Descriptions.Item>
              <Descriptions.Item label="目前身份" span={2}>
                {translateAuth(member.authTypeId)}
              </Descriptions.Item>
              <Descriptions.Item label="會員信箱">
                {member.email}
              </Descriptions.Item>
              <Descriptions.Item label="會員暱稱" span={2}>
                {member.nickname}
              </Descriptions.Item>
              <Descriptions.Item label="註冊日期">
                {new Date(member.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="更新日期" span={2}>
                {new Date(member.updatedAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="購買課程清單" span={3}>
                {member.courseList.length > 0 ? (
                  <Table
                    columns={columns}
                    dataSource={member.courseList.map((item) => ({
                      ...item,
                      key: item.CourseId,
                    }))}
                  />
                ): (
                  <div>尚未購買任何課程</div>
                )}
              </Descriptions.Item>
            </Descriptions>
          </MemberContent>
        </>
      )}
    </>
  );
}
