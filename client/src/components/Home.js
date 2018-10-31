import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoardRow from './BoardRow';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSudokus } from '../actions/SudokuActions';


class Home extends Component {

  componentWillMount() {
    this.props.getSudokus();
  }

  render() {
    const { boardRows, boards } = this.props.sudoku;
    const cols = boards.map((board) => {
      return (
        <Col key={board._id}>
          <Link to={"Sudoku/" + board._id}>Test</Link>
            <table className="sudoku-board">
              <tbody>
                {boardRows.map(boardRow => (
                  <BoardRow key={boardRow} row={boardRow} fields={board.initialBoard} />
                ))}
              </tbody>
            </table>
        </Col>
        )
    });
    return (
      <div>
        <Container>
          <Row>
            {cols}
          </Row>
        </Container>
      </div>
    )
  }
}

Home.propTypes = {
  getSudokus: PropTypes.func,
  sudoku: PropTypes.object
}

const mapStateToProps = (state) => ({
  sudoku: state.sudoku,
});

export default connect(mapStateToProps, { getSudokus })(Home);