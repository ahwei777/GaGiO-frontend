import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { useParams, Link, Switch, Route } from 'react-router-dom';
import Youtube from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import {
  selectUnit,
  getUnitByUnitId,
} from '../../redux/reducers/courseReducer';

const UnitTitle = styled.div`
  font-weight: bold;
  font-size: 34px;
  padding: 12px 0;
`;
const UnitDescription = styled.div`
  font-size: 16px;
  margin: 20px auto;
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
  const unit = useSelector(selectUnit);
  const { id, unitId } = useParams();

  useEffect(() => {
    dispatch(getUnitByUnitId(id, unitId));
  }, [dispatch, id, unitId]);

  const options = {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    playerVars: {
      autoplay: 1,
    },
  };
  const getYoutubeId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };
  return (
    <>
      {unit ? (
        <>
          <Breadcrumb>
          <Breadcrumb.Item>
                <Link to={`/classroom/${unit.courseId}`}>{unit.courseTitle}</Link>
              </Breadcrumb.Item>
            <Breadcrumb.Item>{unit.title}</Breadcrumb.Item>
          </Breadcrumb>
          <UnitTitle>{unit.title}</UnitTitle>
          <UnitDescription>{unit.description}</UnitDescription>
          {unit.videoUrl && (
            <UnitVideo videoId={getYoutubeId(unit.videoUrl)} opt={options} />
          )}
        </>
      ) : (
      <Loading />
      )}
    </>
  );
}
