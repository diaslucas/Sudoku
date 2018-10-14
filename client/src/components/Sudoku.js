import React, { Component } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import BoardRow from './BoardRow';
import Timer from './Timer';

export default class Sudoku extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardRows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      initialBoard: [],
      finalBoard: [],
      level: null
    }
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/sudokus/${id}`)
      .then(res => {
        this.setState({
          initialBoard: res.data.initialBoard,
          finalBoard: res.data.finalBoard,
          level: res.data.level
        })
      })
  }


  render() {
    const { boardRows, initialBoard, finalBoard } = this.state;
    return (
      <Container>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <table className="sudoku-board">
              <tbody>
                {boardRows.map(boardRow => (
                  <BoardRow key={`boardRow_${boardRow}`} row={boardRow} fields={initialBoard} boardResults={finalBoard} />
                ))}
              </tbody>
            </table>
          </Col>
          <Col md="3">
            <Timer />
          </Col>
        </Row>
      </Container>
    )
  }
}
