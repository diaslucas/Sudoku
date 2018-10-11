const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SudokuSchema = new Schema({
  initialBoard: {
    type: Array,
    require: true
  },
  finalBoard: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  insertDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sudoku = mongoose.model('sudoku', SudokuSchema);