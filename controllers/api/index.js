const router = require('express').Router();
const userRoutes = require('./userRoutes');

//Add user route
router.use('/users', userRoutes);

module.exports = router;