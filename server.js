
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

const serviceAccount = require('./firebaseServiceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userRef = db.collection('users').doc();
    await userRef.set({ id: userRef.id, name, email, password });
    res.status(201).send({ id: userRef.id, name, email });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await db.collection('users')
      .where('email', '==', email)
      .where('password', '==', password)
      .get();
    if (users.empty) return res.status(401).send('Invalid credentials');

    const user = users.docs[0].data();
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send('User not found');
    res.send(doc.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).update(req.body);
    res.send({ message: 'User updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).delete();
    res.send({ message: 'User deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
