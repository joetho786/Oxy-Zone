import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export const Flayout = (props) => (
  <Container bsPrefix='filter'>
    <Col md={1}>
    {props.children}
    
  </Col>
  </Container>
)