import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;

function Loading() {
  return (
    <LoadingWrapper>
      <Spin size={'large'}/>
    </LoadingWrapper>
  );
}

export default Loading;
