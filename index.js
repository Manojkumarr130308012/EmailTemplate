const express = require('express');
const multer = require('multer');
const path = require('path');
const sendEmail = require('./sendEmail');
const cors = require('cors');
const app = express();
const port = 3000;




const allowedOrigins = ['https://nplustechnologies.com', 'http://192.168.1.17:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Ensure the upload directory exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// API endpoint to send email
app.post('/send-email', upload.single('attachment'), async (req, res) => {
  const { to, subject ,name,email,phoneNumber,experience } = req.body;
  const attachment = req.file;

  if (!to || !subject ||  !attachment) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await sendEmail(to, subject,name,email,phoneNumber,experience,attachment);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
