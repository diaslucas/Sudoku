import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoardRow from './BoardRow';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boardRows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      boards: []
    };
  }

  componentWillMount() {
    axios
      .get('/api/sudokus')
      .then(res => {
        this.setState({
          boards: res.data
        })
      })
  }

  render() {
    const { boardRows, boards } = this.state;
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

