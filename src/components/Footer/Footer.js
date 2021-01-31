import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  GithubOutlined,
} from '@ant-design/icons';

const FooterContainer = styled.div`
  text-align: center;
  padding: 12px 24px;
  background: ${(props) => props.theme.colors.grey};
  color: ${(props) => props.theme.colors.primary.text};
`;
const MediaCol = styled(Col)`
  display: flex;
  flex-direction: column;
`;
const MediaWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    font-size: 24px;
    transition: all 0.5s;
    :hover {
      cursor: pointer;
      font-size: 36px;
    }
  }
`;

export default function Footer() {
  //const themeContext = useContext(ThemeContext);

  return (
    <FooterContainer>
      <Row gutter={[0, { sm: 24, md: 0 }]}>
        <Col xs={12} md={6}>
          <h3>
            <strong>關於我們</strong>
          </h3>
          <div>加入我們</div>
          <div>服務條款</div>
        </Col>
        <MediaCol xs={12} md={6}>
          <h3>
            <strong>追蹤動態</strong>
          </h3>
          <MediaWrapper>
            <FacebookFilled />
            <TwitterSquareFilled />
            <InstagramFilled />
            <a
              href="https://github.com/ahwei777/GaGiO-frontend"
              style={{ color: 'black' }}
            >
              <GithubOutlined />
            </a>
          </MediaWrapper>
        </MediaCol>
        <Col
          xs={24}
          md={12}
          style={{
            fontSize: 24,
          }}
        >
          <div>GaGiO © All Rights Reserved.</div>
          {/* credits */}
          <div
            style={{
              fontSize: 12,
            }}
          >
            <a href="https://www.freepik.com/vectors/technology">
              Technology vector created by vectorjuice - www.freepik.com
            </a>
            <div>
              Icons made by{' '}
              <a href="https://www.freepik.com" title="Freepik">
                Freepik
              </a>{' '}
              from{' '}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </div>

          {/* credits */}
        </Col>
      </Row>
    </FooterContainer>
  );
}
