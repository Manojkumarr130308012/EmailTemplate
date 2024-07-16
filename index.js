const express = require('express');
const multer = require('multer');
const {sendEmail} = require('./sendEmail');
const {sendContactEmail} = require('./sendEmail');
const {sendContact} = require('./sendEmail');
const {sendService} = require('./sendEmail');


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
  const { name, email, phoneNumber, experience,type,job } = req.body;
  const attachment = req.file;

  if (!attachment) {
      return res.status(400).send('Missing required fields');
    }

  try {
    await sendEmail("Carrier", name, email, phoneNumber, experience,job,attachment);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});


app.post('/send/contactemail', async (req, res) => {
    const { firstName, lastName, email,phone,subject,company,message,countryCode } = req.body;
    //Contact Form
    try {
      await sendContactEmail(firstName, lastName, email,phone,subject,company,message,countryCode);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  });


  app.post('/send/contact', async (req, res) => {
    const { firstName, email, phone,service,message,country } = req.body;
    //Contact Form
    try {
      await sendContact(firstName, email, phone,service,message,country);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  });


  app.post('/send/service', async (req, res) => {
    const { name, email, companyWebsite,phoneNumber,budget,country,projectDetails } = req.body;
    //Service
    try {
      await sendService(name, email, companyWebsite,phoneNumber,budget,country,projectDetails);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
