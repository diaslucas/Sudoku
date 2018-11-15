import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import BoardRow from './BoardRow';
import Timer from './Timer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetCurrentSudoku } from '../actions/SudokuActions';
import Level from './Level';
import WinnersModal from './WinnersModal';

class Sudoku extends Component {

  constructor(props) {
    super(props)

    this.state = {
      secs: 0,
      mins: 0,
      hours: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    const { secs, mins, hours } = this.state;
    let newSecs = secs + 1;
    let newMins = mins;
    let newHours = hours;
    if (newSecs === 60) {
      newSecs = 0;
      newMins = mins + 1;
      if (newMins === 60) {
        newSecs = 0;
        newMins = 0;
        newHours = hours + 1;
      }
    }

    this.setState({
      secs: newSecs,
      mins: newMins,
      hours: newHours
    });
  }

  Errors = (props) => {
    if(props.value === 0){
      return false;
    }
    return <div className="sudoku-errors">Errors: <span>{props.value}</span></div>;
  }

  render() {
    if (this.props.sudoku.currentSudoku != null) {
      const { secs, mins, hours } = this.state;
      const { boardRows, currentSudoku, boardState, errors } = this.props.sudoku;
      const { initialBoard, finalBoard, level } = currentSudoku;
      const time = {secs, mins, hours};
      let isSudokuComplete = false;
      if (boardState.toString() === finalBoard.toString()) {
        clearInterval(this.timer);
        isSudokuComplete = true;
      }
      return (
        <Container>
          <Row>
            <Col md="3"></Col>
            <Col md="6">
              {isSudokuComplete &&
                 <WinnersModal time={time} errors={errors}/> 
              }
              <div style={{ width: '486px' }}>
                <table className="sudoku-board">
                  <tbody>
                    {boardRows.map(boardRow => (
                      <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={initialBoard} boardResults={finalBoard}/>
                      ))}
                  </tbody>
                </table>
                <Level value={level} size='2x' marginTop='30px'/>
              </div>
            </Col>
            <Col md="3">
              <this.Errors value={this.props.sudoku.errors} />
              <Timer secs={secs} mins={mins} hours={hours} />
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}


Sudoku.propTypes = {
  sudoku: PropTypes.object,
  resetCurrentSudoku: PropTypes.func
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku
});

export default connect(mapStateToProps, { resetCurrentSudoku })(Sudoku);