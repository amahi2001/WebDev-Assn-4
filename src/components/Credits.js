/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Fragment } from 'react';
//react bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';


const Credits = (props) => {
  return (
    <Fragment>
      <h1 className="display-5 text-center">Credits</h1>
      <br />
      <ListGroup as="ol">
        {
          props.credits.map((credit) => {
            const date = new Date(credit.date);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

            return (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={credit.id}
              >
                <span className="ms-2 me-auto">
                  <div className="fw-bold">{`${credit.id}. ${credit.description}`}</div>
                  {date.toLocaleDateString("en-US", options)}
                </span>
                <Badge bg="primary" pill>
                  {`$${credit.amount}`}
                </Badge>
              </ListGroup.Item>
            )
          }
          )
        }
      </ListGroup>

    </Fragment>
  );
}

export default Credits;