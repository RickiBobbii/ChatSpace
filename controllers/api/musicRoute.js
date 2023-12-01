const router = require('express').Router();
const { Music, User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all music
router.get('/', async (req, res) => {
    try {
      const musicData = await Music.findAll({
      });
      res.status(200).json(musicData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET music by id
router.get('/:id', async (req, res) => {
  try {
    const musicData = await Music.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!musicData) {
      res.status(404).json({ message: 'No music found with that id!' });
      return;
    }
    res.status(200).json(musicData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// UPDATE a music by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const musicData = await Music.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!musicData[0]) {
      res.status(404).json({ message: 'No music with this id!'});
      return;
    }
    res.status(200).json(musicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a music
router.delete('/:id', async (req, res) => {
  try {
    const musicData = await Music.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!musicData) {
      res.status(404).json({ message: 'No music found with this id!' });
      return;
    }

    res.status(200).json(musicData);
  } catch (err) {
    res.status(500).json(err);
  }
});  
//CREATE a music withAuth
router.post('/', withAuth, async (req, res) => {
  try {
    const newMusic = await Music.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMusic);
  } catch (err) {
    res.status(400).json(err);
  }
});
//DELETE a music withAuth
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const musicData = await Music.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!musicData) {
      res.status(404).json({ message: 'No music found with this id!' });
      return;
    }

    res.status(200).json(musicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
