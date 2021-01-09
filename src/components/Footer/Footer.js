import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useLocation } from 'react-router-dom';

const FooterContainer = styled.div`
  text-align: center;
  padding: 12px 24px;
  background: ${(props) => props.theme.colors.primary.light};
  color: ${(props) => props.theme.colors.primary.text};
`

export default function Footer() {
  //const themeContext = useContext(ThemeContext);
  const location = useLocation();

  return (
    <>
    {!location.pathname.includes('console') && (
    <FooterContainer>
      <Row gutter={[0, { sm: 24, md: 0}]}>
        <Col xs={12} md={6}>
          <h3><strong>關於</strong></h3>
          <div>關於我們</div>
          <div>加入我們</div>
          <div>服務條款</div>
        </Col>
        <Col xs={12} md={6}>
          <h3><strong>追蹤動態</strong></h3>
          <div>Facebook</div>
          <div>Instagram</div>
          <div>Youtube</div>
        </Col>
        <Col
          xs={24} md={12}
          style={{
            fontSize: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>Teach Table © All Rights Reserved.</div>
        </Col>
      </Row>
    </FooterContainer>
    )}
    </>
  );
}
