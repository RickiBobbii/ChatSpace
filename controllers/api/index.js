const router = require('express').Router();
const animalRoutes = require('./animalRoute');
const movieRoutes = require('./movieRoute');
const musicRoutes = require('./musicRoute');
const projectRoutes = require('./projectRoute');
const userRoutes = require('./userRoutes');

//Add user route
router.use('/users', userRoutes);
router.use('/animals', animalRoutes);
router.use('/movies', movieRoutes);
router.use('/music', musicRoutes);
router.use('/projects', projectRoutes);

module.exports = router;