const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all projects
router.get('/', async (req, res) => {
    try {
      const projectData = await Project.findAll({
      });
      res.status(200).json(projectData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET project by id
router.get('/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!projectData) {
      res.status(404).json({ message: 'No project found with that id!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// UPDATE a project by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const projectData = await Project.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!projectData[0]) {
      res.status(404).json({ message: 'No project with this id!'});
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});  
//CREATE a project withAuth
router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});
//DELETE a project withAuth
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
