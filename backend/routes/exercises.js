const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.get('/', async (req, res) => {
  const exercices = await Exercise.find();
  res.json(exercices)
});

router.route('/add').post(async (req, res) => {
  const { username } = req.body;
  const { description } = req.body;
  const duration = +req.body.duration;
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  await newExercise.save();
  res.json('Exercise added!')

});

router.get('/:id', async (req, res) => {
  const exercise = await Exercise.findOne({ _id: req.params.id });
  if (exercise) {
    return res.json(exercise)
  }
  res.json('Error')

});

router.delete('/:id',async (req, res) => {

  let ex = await Exercise.findByIdAndDelete(req.params.id)

  if (ex) {
    return res.json('Exercise deleted.')
  }

  res.status(400).json('Error: ')

});

router.post('/update/:id' ,async (req, res) => {

  let exercise = await Exercise.findOne({ _id: req.params.id });
  if (!exercise) {
    return res.status(404).json('Exercice not found')
  }
 
  exercise.username = req.body.username;
  exercise.description = req.body.description;
  exercise.duration = Number(req.body.duration);
  exercise.date = Date.parse(req.body.date);

  await exercise.save();
  res.json('Exercice updated !')

});

module.exports = router;