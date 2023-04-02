/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Fragment } from 'react';
//react bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Credits = (props) => {
  function onSubmit(e) {
    e.preventDefault();
    props.addCredit({
      id: props.credits.length + 1,
      amount: Number(e.target.amount.value),
      description: e.target.desc.value,
      date: new Date().toJSON()
    });
  }

  const TotalCredits = props.credits.reduce((total, credit) => total + credit.amount, 0);

  return (
    <Fragment>
      <h1 className="display-5 text-center">Credits</h1>
      <br />
      <p className="lead"> <b> Account Balance:</b> {`$${props.accountBalance.toFixed(2)}`}</p>
      
      <Form onSubmit={onSubmit}>
        <Row>
          <Form.Group className="mb-3" controlId="amount" as={Col} md={4}>
            <Form.Label>Amount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" required aria-label="Amount" step="any" />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="desc" as={Col} md={4}>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required aria-label="Description" />
          </Form.Group>
          <Col className="my-auto">
            <Button type="submit" className="rounded-pill" variant="outline-primary">
              Add Credit
            </Button>
          </Col>
        </Row>
      </Form>

      <ListGroup as="ol">
        {
          props.credits.map((credit) => {
            return (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={credit.id}
              >
                <span className="ms-2 me-auto">
                  <div className="fw-bold">{`${credit.id}. ${credit.description}`}</div>
                  {credit.date.slice(0, 10)}
                </span>
                <Badge bg="primary" pill>
                  {`$${credit.amount.toFixed(2)}`}
                </Badge>
              </ListGroup.Item>
            )
          }
          )
        }
      </ListGroup>
      <p className="lead mt-2"> <b> Total Credits:</b> {`$${TotalCredits.toFixed(2)}`}</p>

    </Fragment>
  );
}

export default Credits;