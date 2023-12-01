const router = require('express').Router();
const { Animal, User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all animals
router.get('/', async (req, res) => {
    try {
      const animalData = await Animal.findAll({
      });
      res.status(200).json(animalData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET animal by id
router.get('/:id', async (req, res) => {
  try {
    const animalData = await Animal.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!animalData) {
      res.status(404).json({ message: 'No animal found with that id!' });
      return;
    }
    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// UPDATE a animal by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const animalData = await Animal.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!animalData[0]) {
      res.status(404).json({ message: 'No animal with this id!'});
      return;
    }
    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a animal
router.delete('/:id', async (req, res) => {
  try {
    const animalData = await Animal.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!animalData) {
      res.status(404).json({ message: 'No animal found with this id!' });
      return;
    }

    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});  
//CREATE a animal withAuth
router.post('/', withAuth, async (req, res) => {
  try {
    const newAnimal = await Animal.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAnimal);
  } catch (err) {
    res.status(400).json(err);
  }
});
//DELETE a animal withAuth
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const animalData = await Animal.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!animalData) {
      res.status(404).json({ message: 'No animal found with this id!' });
      return;
    }

    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
