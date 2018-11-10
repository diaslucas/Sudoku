import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import BoardRow from './BoardRow';
import Timer from './Timer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetBoardState } from '../actions/SudokuActions';
import Level from './Level';

class Sudoku extends Component {

  render() {
    if (this.props.sudoku.currentSudoku != null) {
      const { boardRows, currentSudoku, boardState } = this.props.sudoku;
      const { initialBoard, finalBoard, level } = currentSudoku;
      if (boardState.toString() === finalBoard.toString()) {
        console.log('Good Job!');
      }
      return (
        <Container>
          <Row>
            <Col md="3"></Col>
            <Col md="6">
              <div style={{ width: '486px' }}>
                <table className="sudoku-board" ref="inner">
                  <tbody>
                    {boardRows.map(boardRow => (
                      <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={initialBoard} boardResults={finalBoard} />
                      ))}
                  </tbody>
                </table>
                <Level value={level} size='2x' marginTop='30px'/>
              </div>
            </Col>
            <Col md="3">
              <Timer />
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
  resetBoardState: PropTypes.func
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku
});

export default connect(mapStateToProps, { resetBoardState })(Sudoku);