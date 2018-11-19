import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import formatTime from '../helpers/formatTime';

const WinnersModal = props => {
  const { errors } = props;
  const { secs, mins, hours } = props.time;

  return (
    <div>
      <Modal isOpen={true}>
        <ModalHeader>Good Job!</ModalHeader>
        <ModalBody>
          <p>Your Time: <span className="purple-bold">{formatTime(hours, mins, secs)}</span></p>
          <p>Errors: <span className="purple-bold">{errors}</span></p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" tag={Link} to="/">Play More</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default WinnersModal;