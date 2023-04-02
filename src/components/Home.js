/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Fragment } from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class Home extends Component {
  render() {
    return (
      <Fragment>
        <h1 className='display-5 text-center mt-4'>Bank of React</h1>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Image fluid roundedCircle src='https://picsum.photos/200/200' />
          </Col>
        </Row>
        <br />
        <AccountBalance accountBalance={this.props.accountBalance} />
      </Fragment>
    );
  }
}

export default Home;