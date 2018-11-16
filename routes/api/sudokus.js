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



// @route PUT api/sudokus
// @desc UPDATE a sudoku
router.put('/:id', (req, res) => {
  Sudoku.findById(req.params.id)
  .then((sudokuToBeUpdated) => {
    const {username, hours, mins, secs, errors} = req.body;
    if (username !== null && hours !== null && mins !== null && secs !== null && errors !== null) {
      const newRecord = {username: username, hours: hours, mins: mins, secs: secs, errors: errors};
      let recs = sudokuToBeUpdated.records;
      recs.push(newRecord);
      sudokuToBeUpdated.set({ records: recs });
      sudokuToBeUpdated.save()
      .then(updatedSudoku => res.send({ success: true, updatedSudoku }))
      .catch(err => res.status(500).json({success: false, error: err.message}))
    }
  })
  .catch(err => res.status(404).json({success: false, error: err.message}));
});


// @route DELETE api/sudokus
// @desc DELETE a sudoku
router.delete('/:id', (req, res) => {
  Sudoku.findById(req.params.id)
  .then(sudoku => sudoku.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});

module.exports = router;