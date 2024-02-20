const express = require('express');
const admin = require('./firebase-admin');
const cors = require('cors');

const app = express();

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

app.post('/add-mentor', async (req, res) => {
  try {
    const mentorData = req.body; // It's important to validate this data!
    const docRef = await admin.firestore().collection('mentors').add(mentorData);
    res.status(200).send({ id: docRef.id });
  } catch (error) {
    // Consider logging the error to a file or external service for production
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
