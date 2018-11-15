import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

const WinnersModal = props => {
  const { errors } = props;
  const { secs, mins, hours } = props.time;

  let time = (hours.toString > 0 ? hours.toString() + ':' : '');
  time +=  (mins.toString().length > 1 ? mins.toString() : '0' + mins.toString()) + ':'; 
  time +=  (secs.toString().length > 1 ? secs.toString() : '0' + secs.toString());

  return (
    <div>
      <Modal isOpen={true}>
        <ModalHeader>Good Job!</ModalHeader>
        <ModalBody>
          <p>Your Time: <span className="winners-modal-detail">{time}</span></p>
          <p>Errors: <span className="winners-modal-detail">{errors}</span></p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" tag={Link} to="/">Play More</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default WinnersModal;