const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Student = require('./models/student');
const Project = require('./models/project');
const Jury = require('./models/jury');
const Deliverable = require('./models/deliverable');
const Professor = require('./models/professor');
const sequelize = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

// STUDENTS
// Create a new student
app.post('/students', async (req, res) => {
  try {
    const { name, isTeamLead, projectId } = req.body;
    const student = await Student.create({ name, isTeamLead, projectId });
    res.status(201).json(student);
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/students', async (req, res) => {
  try {
    const { name, isTeamLead, projectId } = req.query;
    let condition = {};

    if (name) {
      condition.name = name;
    }

    if (projectId) {
      condition.projectId = projectId;
    }

    if (isTeamLead !== undefined) {
      condition.isTeamLead = isTeamLead === 'true';
    }

    const students = await Student.findAll({
      where: condition,
    });

    if (students.length > 0) {
      res.json(students);
    } else {
      res.json([]);
      //res.status(404).json({ error: 'No students found with the provided criteria' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get a student by name
app.get('/students/:name', async (req, res) => {
  res.json(req.params.name);
  try {
    const student = await Student.findOne({
      where: { name: req.params.name },
    });

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
  try {
    const { name, isTeamLead, projectId } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (student) {
      student.name = name;
      student.isTeamLead = isTeamLead;
      student.projectId = projectId;
      await student.save();
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//PROJECTS

// Create a new project
app.post('/projects', async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.create({ name });
    res.status(201).json(project);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a project by ID
app.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a project by ID
app.put('/projects/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.findByPk(req.params.id);
    if (project) {
      project.name = name;
      await project.save();
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a project by ID
app.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.destroy();
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// JURY
// Create a new jury
app.post('/juries', async (req, res) => {
  try {
    const { grade, projectId, studentId } = req.body;
    const jury = await Jury.create({ grade, projectId, studentId });

    res.status(201).json(jury);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all juries
app.get('/juries', async (req, res) => {
  try {
    const { projectId, studentId } = req.query;
    let condition = {};

    if (studentId) {
      condition.studentId = studentId;
    }

    if (projectId) {
      condition.projectId = projectId;
    }
    const juries = await Jury.findAll({
      where: condition,
    });
    if (juries.length > 0) {
      res.json(juries);
    } else {
      res.json([]);
      // res.status(404).json({ error: 'No juries found with the provided criteria' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get a jury by ID
app.get('/juries/:id', async (req, res) => {
  try {
    const jury = await Jury.findByPk(req.params.id);
    if (jury) {
      res.json(jury);
    } else {
      res.status(404).json({ error: 'Jury not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/juries/grade', async (req, res) => {
  try {
    const { projectId, studentId, grade } = req.body;
    const jury = await Jury.findOne({
      where: {
        projectId: projectId,
        studentId: studentId
      }
    });

    if (jury) {
      jury.grade = grade;
      await jury.save();
      res.json(jury);
    } else {
      res.status(404).json({ error: 'Jury not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a jury by ID
app.delete('/juries/:id', async (req, res) => {
  try {
    const jury = await Jury.findByPk(req.params.id);
    if (jury) {
      await jury.destroy();
      res.json({ message: 'Jury deleted successfully' });
    } else {
      res.status(404).json({ error: 'Jury not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Deliverable

// Create a new deliverable
app.post('/deliverables', async (req, res) => {
  try {
    const { name, description, link, projectId, studentId } = req.body;
    const deliverable = await Deliverable.create({ name, description, link, projectId, studentId });

    res.status(201).json(deliverable);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all deliverables
app.get('/deliverables', async (req, res) => {
  try {
    const { projectId, studentId } = req.query;
    let condition = {};

    if (studentId) {
      condition.studentId = studentId;
    }

    if (projectId) {
      condition.projectId = projectId;
    }
    const deliverables = await Deliverable.findAll({
      where: condition,
    });
    if (deliverables.length > 0) {
      res.json(deliverables);
    } else {
      res.json([]);
      //res.status(404).json({ error: 'No deliverables found with the provided criteria' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a deliverable by ID
app.get('/deliverables/:id', async (req, res) => {
  try {
    const deliverable = await Deliverable.findByPk(req.params.id);
    if (deliverable) {
      res.json(deliverable);
    } else {
      res.status(404).json({ error: 'Deliverable not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a deliverable by ID
app.put('/deliverables/:id', async (req, res) => {
  try {
    const { name, description, link, projectId, studentId } = req.body;
    const deliverable = await Deliverable.findByPk(req.params.id);
    if (deliverable) {
      deliverable.name = name;
      deliverable.description = description;
      deliverable.link = link;
      deliverable.projectId = projectId;
      deliverable.studentId = studentId;
      await deliverable.save();
      res.json(deliverable);
    } else {
      res.status(404).json({ error: 'Deliverable not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a deliverable by ID
app.delete('/deliverables/:id', async (req, res) => {
  try {
    const deliverable = await Deliverable.findByPk(req.params.id);
    if (deliverable) {
      await deliverable.destroy();
      res.json({ message: 'Deliverable deleted successfully' });
    } else {
      res.status(404).json({ error: 'Deliverable not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Professor
// Create a new professor
app.post('/professors', async (req, res) => {
  try {
    const { name } = req.body;
    const professor = await Professor.create({ name });

    res.status(201).json(professor);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all professors
app.get('/professors', async (req, res) => {
  try {
    const professors = await Professor.findAll();
    res.json(professors);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a professor by ID
app.get('/professors/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      res.json(professor);
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a professor by ID
app.put('/professors/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      professor.name = name;
      await professor.save();
      res.json(professor);
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a professor by ID
app.delete('/professors/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      await professor.destroy();
      res.json({ message: 'Professor deleted successfully' });
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



sequelize.sync() // Use { force: true } only during development to drop existing tables
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
