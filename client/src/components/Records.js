import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import formatTime from '../helpers/formatTime';

const Records = props => {
  
  let recordsList = props.list;

  if(recordsList.length === 0){
    return false
  }

  // Sorting list by score asc
  recordsList.sort((a,b) => {
    return a.score - b.score;
  });
  // Reversing list to sort by score desc
  recordsList.reverse();

  return (
    <React.Fragment>
    <h5>Records</h5>
    <ListGroup>
      {recordsList.map(record => {
        return(
          <ListGroupItem className="justify-content-between" key={record.username}>
            <span className="purple-bold" style={{ display: 'block' }}>{record.username}</span>
            <span style={{ display: 'block', marginLeft: '15px' }}>
              Time <Badge color="primary">{formatTime(record.hours, record.mins, record.secs)}</Badge>
            </span>
            <span style={{ display: 'block', marginLeft: '15px' }}>
              Errors <Badge color="danger">{record.errors}</Badge>
            </span>
            <span style={{ display: 'block', marginLeft: '15px' }}>
              Score <Badge color="success">{record.score}</Badge>
            </span>
          </ListGroupItem>
        )
      })}
    </ListGroup>
    </React.Fragment>
  );
}

export default Records;