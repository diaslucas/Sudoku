import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import formatTime from '../helpers/formatTime';

const Records = props => {
  if(props.value.length === 0){
    return false
  }
  return (
    <React.Fragment>
    <h5>Records</h5>
    <ListGroup>
      {props.value.map(record => {
        return(
          <ListGroupItem className="justify-content-between" key={record.username}>
            <span className="purple-bold" style={{ display: 'block' }}>{record.username}</span>
            <span style={{ display: 'block', marginLeft: '8px' }}>
              Time <Badge color="primary">{formatTime(record.hours, record.mins, record.secs)}</Badge>
            </span>
            <span style={{ display: 'block', marginLeft: '8px' }}>
              Errors <Badge color="danger">{record.errors}</Badge>
            </span>
          </ListGroupItem>
        )
      })}
    </ListGroup>
    </React.Fragment>
  );
}

export default Records;