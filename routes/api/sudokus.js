const express = require('express');
const router = express.Router();

// Sudoku Model
const Sudoku = require('../../models/Sudoku');

// @route GET api/sudokus
// @desc Get all sudokus
router.get('/', (req, res) => {
  Sudoku.find()
  .then(sudokus => res.json(sudokus))
});

// @route GET api/sudokus/:id
// @desc Get a sudoku
router.get('/:id', (req, res) => {
  Sudoku.findById(req.params.id)
  .then(sudoku => res.json(sudoku))
});

// @route POST api/sudokus
// @desc Add a sudoku
router.post('/', (req, res) => {
  const newSudoku = new Sudoku({
    initialBoard: req.body.initialBoard,
    finalBoard: req.body.finalBoard,
    level: req.body.level
  });

  newSudoku
  .save()
  .then(sudoku => res.json(sudoku));
  
});


// @route DELETE api/sudokus
// @desc DELETE a sudoku
router.delete('/:id', (req, res) => {
  Sudoku.findById(req.params.id)
  .then(sudoku => sudoku.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});

module.exports = router;