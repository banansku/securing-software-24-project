import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import sequelize from './db';
import User from './Models/user.model';

const app: Application = express();
const PORT: number = 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ hello: "hello" });
});

app.post('/login', (req: Request, res: Response) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const userId = 1
    const userObject = { username: username, userId: userId }
    res.status(201).json({ userObject: userObject });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Create a new user
app.post('/user', async (req, res) => {
  console.log(req.body)
  try {
    const { username, password } = req.body;
    console.log(username)
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});