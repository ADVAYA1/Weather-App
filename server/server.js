import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  favorites: [String]
});
const User = mongoose.model('User', UserSchema);

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ error: 'User exists' });
  await User.create({ email, password, favorites: [] });
  res.json({ success: true });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  res.json({ success: true, favorites: user.favorites });
});

app.post('/api/favorites', async (req, res) => {
  const { email, favorites } = req.body;
  const user = await User.findOneAndUpdate({ email }, { favorites }, { new: true });
  if (!user) return res.status(400).json({ error: 'User not found' });
  res.json({ success: true, favorites: user.favorites });
});

app.listen(5000, () => console.log('Server running on port 5000'));
