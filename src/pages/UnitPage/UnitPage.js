import React, { useEffect } from "react";
import styled from "styled-components";
import { Layout, Menu, Breadcrumb, Divider } from "antd";
import { useParams } from "react-router-dom";
import Youtube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import {
  getUnitListByCourse,
  getUnitByUnitId,
  selectCourse,
  selectUnit,
} from "../../redux/reducers/unitReducer";
const { Content, Sider } = Layout;

const UnitWrapper = styled(Layout)`
  max-width: 1280px;
  margin: 0 auto;
`;
const UnitSider = styled(Sider)`
  background-color: #ffffff;
  color: #000000;
  width: 300px;
`;
const CourseImage = styled.img`
  width: 100%;
  object-fit: contain;
`;
const CourseTitle = styled.div`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;
const UnitListWrapper = styled.div``;
const Unit = styled(Menu)``;
const UnitItem = styled(Menu.Item)`
  align-items: center;
  white-space: pre-wrap;
  overflow-wrap: normal;
  word-wrap: break-word;
`;
const ContentWrapper = styled(Content)`
  margin: 15px;
  justify-content: center;
  align-items: center;
`;
const UnitTitle = styled.div`
  font-weight: bold;
  font-size: 34px;
  padding: 12px 0;
`;
const UnitDescriprion = styled.div`
  font-size: 16px;
  padding: 12px 0;
`;

const UnitVideo = styled(Youtube)`
  width: 100%;
  height: 500px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
export default function UnitPage() {
  const dispatch = useDispatch();
  const course = useSelector(selectCourse);
  const unit = useSelector(selectUnit);
  console.log("unit", unit);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUnitListByCourse(id));
  }, [dispatch, id]);
  const handleClick = (e) => {
    console.log(e.key);
    dispatch(getUnitByUnitId(course, e.key));
  };
  const options = {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    playerVars: {
      autoplay: 1,
    },
  };
  const getYoutubeId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };
  return (
    <>
      {course && unit ? (
        <UnitWrapper>
          <UnitSider>
            <CourseImage src={course.imgUrl} alt="課程圖片" />
            <CourseTitle>{course.title}</CourseTitle>
            <Divider />
            <UnitListWrapper>
              <Unit
                defaultOpenKeys={"unit"}
                defaultSelectedKeys={"0"}
                onClick={handleClick}
              >
                <Menu.ItemGroup key="unit">
                  {course.unit_list.map((unit, index) => (
                    <UnitItem
                      style={{
                        lineHeight: "25px",
                        height: "100%",
                        minHeight: "40px",
                      }}
                      key={index}
                    >
                      {unit.title}
                    </UnitItem>
                  ))}
                </Menu.ItemGroup>
              </Unit>
            </UnitListWrapper>
          </UnitSider>
          <ContentWrapper>
            <Breadcrumb>
              <Breadcrumb.Item>{course.title}</Breadcrumb.Item>
              <Breadcrumb.Item>{unit.title}</Breadcrumb.Item>
            </Breadcrumb>
            <UnitTitle>{unit.title}</UnitTitle>
            <UnitDescriprion>{unit.descriprion}</UnitDescriprion>
            {unit.videoUrl && (
              <UnitVideo videoId={getYoutubeId(unit.videoUrl)} opt={options} />
            )}
          </ContentWrapper>
        </UnitWrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}
