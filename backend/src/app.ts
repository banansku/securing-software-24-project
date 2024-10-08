import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { sequelize, Click, User } from './db';

const app: Application = express();
const PORT: number = 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ hello: "hello" });
});

/**
 * Here the developer didn't realize that this endpoint can be called infinitely many times thus
 * leaving the app open for attack
 * A10:2017-Insufficient Logging & Monitoring -> a possible fix is to measure how many times a login has
 * been attempted and increase a counter for each failed attempt
 * 
 * The fix is commented out
 */
app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({ error: 'Name and password are required' });
  }
  try {
    const user = await User.findOne({
      where: {
        username,
        password,
      },
    });

    /*
    //
    if (user.password !== password) {
      if (user) {
        user.failedAttempts += 1;

        // If failed attempts reach the threshold, block the user
        if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
          return res.status(403).json({ error: 'Account blocked after too many failed attempts' });
        }
      await user.save();
      }
    }
    // If succesful reset counter
    user.failedAttempts = 0;
    await user.save();
    */

    /*
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    */

    // Generate a JWT token and return it
    //const token = generateToken(user.id);
    //res.status(201).json({ token : token, user: user?.dataValues});

    res.status(201).json(user?.dataValues);
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});


/**
 * Right now passwords are stored in DB without hashing, making them very vulnerable to a data leak
 * using bcrypt or similar they can be hashed and then checked on login with your secret key
 * 
 * A2:2017-Broken Authentication -> FIX is commented out
 * 
 * ALSO the developer accidentally left console logging to their prod release,
 * so the passwords are in clear text in the logs
 * 
 * A3:2017-Sensitive Data Exposure -> Logging passwords in clear text
 */
app.post('/user', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  if (!username || !password) {
    res.status(400).json({ error: 'Name and password are required' });
  }

  const transaction = await sequelize.transaction();
  //const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ username, password }, { transaction });

    await Click.create({
      userId: newUser.dataValues.id,
      clickValue: 0,
      timestamp: new Date()
    }, {
      transaction
    });

    await transaction.commit();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    await transaction.rollback()
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/clicks/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const clicks = await Click.findAll({ where: { userId } });
    res.status(200).json({ clicks: clicks[0].dataValues.clickValue });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

/**
 * Right now anyone can, with the correct userID add to the clicks of any user
 * A5:2017-Broken Access Control -> Fix is found in the authenticateToken middleware
 * This authenticates that the correct user is actually trying to increase their own click score
 */

// app.post('/clicks/:userId', authenticateToken, async (req, res) => {
app.post('/clicks/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const click = await Click.findOne({ where: { userId } });

    if (click) {
      click.clickValue += 1;
      click.timestamp = new Date();
      await click.save();
      res.status(200).json({ clicks: click.dataValues.clickValue });
    } else {
      res.sendStatus(400).json({ error: 'no click found' })
    }

  } catch (error) {
    res.status(500).json({ error: 'Error increasing clicks' });
  }
});

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