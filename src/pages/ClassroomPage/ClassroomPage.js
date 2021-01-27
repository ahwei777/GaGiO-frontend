import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Typography } from 'antd';
import { useHistory, useParams, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import {
  getDetailCourse,
  selectDetailCourse,
} from '../../redux/reducers/courseReducer';
import { PlayCircleOutlined } from '@ant-design/icons';
import UnitPage from './UnitPage.js';

const { Content, Sider } = Layout;
const { Title } = Typography;
const FixedLayout = styled(Layout)`
  height: 100%;
`;
const ScrollSider = styled(Sider)`
  overflow: auto;
  min-width: 200px !important;
  background-color: ${(prop) => prop.theme.colors.white};
  height: 100%;
`;
const StyledImg = styled.img`
  width: 100%;
`;
const CourseTitle = styled.div`
  margin: 16px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  line-height: 2rem;
`;
const ContentWrapper = styled(Content)`
  padding: 24px;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

export default function ClassroomPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const detailCourse = useSelector(selectDetailCourse);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailCourse(id));
  }, [dispatch, id]);

  const handleClickUnit = (e) => {
    return history.push(`/classroom/${id}/unit/${e.key}`);
  };

  return (
    <>
      {detailCourse ? (
        <FixedLayout>
          <ScrollSider>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
            >
              <StyledImg alt="課程圖片" src={detailCourse.imgUrl} />
              <CourseTitle>{detailCourse.title}</CourseTitle>
              {detailCourse.unit_list.map((unit) => (
                <Menu.Item
                  key={unit.id}
                  icon={<PlayCircleOutlined style={{ fontSize: 20 }} />}
                  onClick={handleClickUnit}
                >
                  {unit.title}
                </Menu.Item>
              ))}
            </Menu>
          </ScrollSider>
          <ContentWrapper>
            <Switch>
              <Route exact path={`/classroom/:id`}>
                <center>
                  <Title>歡迎來到課程：{detailCourse.title}</Title>
                  <Title level={3}>請點擊左方播放清單開始上課</Title>
                </center>
              </Route>
              <Route exact path={`/classroom/:id/unit/:unitId`}>
                <UnitPage />
              </Route>
            </Switch>
          </ContentWrapper>
        </FixedLayout>
      ) : (
        <Loading />
      )}
    </>
  );
}
