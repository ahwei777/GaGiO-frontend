import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export default function Footer() {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <Container
        style={{
          textAlign: 'center',
          background: themeContext.colors.primary.light,
          padding: 16,
        }}
        fluid
      >
        <Row>
          <Col md={3}>
            <h4>關於</h4>
            <div>關於我們</div>
            <div>加入我們</div>
            <div>服務條款</div>
          </Col>
          <Col md={3}>
            <h4>追蹤動態</h4>
            <div>Facebook</div>
            <div>Instagram</div>
            <div>Youtube</div>
          </Col>
          <Col
            md={6}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>Teach Table © All Rights Reserved.</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
