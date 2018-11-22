const express = require('express');
const router = express.Router();

// Sudoku Model
const Sudoku = require('../../models/Sudoku');

// @route GET api/sudokus
// @desc Get all sudokus
router.get('/', (req, res) => {
  Sudoku.find()
  .then(sudokus => {
    res.json(sudokus)
  })
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
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      const newSudoku = new Sudoku({
        initialBoard: req.body.initialBoard,
        finalBoard: req.body.finalBoard,
        level: req.body.level
      });

      newSudoku
        .save()
        .then(sudoku => res.json({ success: true, sudoku }));
    } else {
      res.json({ success: false, message: 'The user does not have permision to add' });
    }
  } else {
    res.json({ success: false, message: 'No user logged in' });
  }
});

// @route PUT api/sudokus
// @desc UPDATE a sudoku
router.put('/:id', (req, res) => {
  if(req.isAuthenticated()){
    Sudoku.findById(req.params.id)
    .then((sudokuToBeUpdated) => {
      const {hours, mins, secs, errors} = req.body;
      if (hours !== null && mins !== null && secs !== null && errors !== null) {
        const initialScore = 10000;
        let score = initialScore - (((hours * 60 * 60) + (mins * 60) + secs) + (errors * 20));
        const newRecord = {username: req.user.username, hours, mins, secs, errors, score};
        let recs = sudokuToBeUpdated.records;
        recs.push(newRecord);
        sudokuToBeUpdated.set({records: recs});
        sudokuToBeUpdated.save()
        .then(updatedSudoku => res.send({success: true, updatedSudoku}))
        .catch(err => res.status(500).json({success: false, error: err.message}))
      }
    })
    .catch(err => res.status(404).json({success: false, error: err.message}));
  } else {
    res.json({ success: false, message: 'No user logged in' });
  }
});


// @route DELETE api/sudokus
// @desc DELETE a sudoku
router.delete('/:id', (req, res) => {
  if(req.isAuthenticated()){
    if(req.user.role === 'admin'){
      Sudoku.findById(req.params.id)
      .then(sudoku => sudoku.remove().then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
    } else {
      res.json({ success: false, message: 'The user does not have permision to delete' });
    }
  } else {
    res.json({ success: false, message: 'No user logged in' });
  }
});

module.exports = router;