const router = require('express').Router();
const { Movie, User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all movies
router.get('/', async (req, res) => {
    try {
      const movieData = await Movie.findAll({
      });
      res.status(200).json(movieData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET movie by id
router.get('/:id', async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!movieData) {
      res.status(404).json({ message: 'No movie found with that id!' });
      return;
    }
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// UPDATE a movie by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const movieData = await Movie.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!movieData[0]) {
      res.status(404).json({ message: 'No movie with this id!'});
      return;
    }
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a movie
router.delete('/:id', async (req, res) => {
  try {
    const movieData = await Movie.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!movieData) {
      res.status(404).json({ message: 'No movie found with this id!' });
      return;
    }

    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});  
//CREATE a movie withAuth
router.post('/', withAuth, async (req, res) => {
  try {
    const newMovie = await Movie.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMovie);
  } catch (err) {
    res.status(400).json(err);
  }
});
//DELETE a movie withAuth
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const movieData = await Movie.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!movieData) {
      res.status(404).json({ message: 'No movie found with this id!' });
      return;
    }

    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
