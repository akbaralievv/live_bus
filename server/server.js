import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose
  .connect(
    'mongodb+srv://kgkgg28:mongoosepassword@cluster0.rcab4ib.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB Error', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ users: [1, 2, 3, 4, 5, 6] });
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);
  const token = jwt.sign({ email: req.body.email, fullName: req.body.fullName }, 'secret123');
  res.json({ success: true, token });
});

app.post('/auth/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  });

  const user = await doc.save();

  res.json(user);
});

app.listen(PORT, (error) => {
  if (error) return console.log(error);
  console.log('Server started on port 5000');
});
