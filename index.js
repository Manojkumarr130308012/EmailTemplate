const express = require('express');
const multer = require('multer');
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

// Set up multer for file uploads using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// API endpoint to send email
app.post('/send-email', upload.single('attachment'), async (req, res) => {
  const { name, email, phoneNumber, experience , type } = req.body;
  const attachment = req.file;

  if (!to  || !attachment) {
    return res.status(400).send('Missing required fields');
  }

  try {
    if(type == "Carrier"){
        await sendEmail(to, "Carrier", name, email, phoneNumber, experience, attachment);
    }
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
