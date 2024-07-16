const nodemailer = require('nodemailer');

const sendEmail = async (subject,name,email,phoneNumber,experience, attachment) => {
  try {
    // Create a transporter object
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: 'manojkumarr21@gmail.com', // Replace with your email
        pass: 'svbqxfxdopigapuh', // Replace with your email password
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'manojkumarr21@gmail.com', // Replace with your sender info
      to: to,
      subject: subject,
      html: `
      <html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #eaeaea;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    .header {
      text-align: center;
      padding: 10px 0;
    }
    .header h1 {
      margin: 0;
      color: #333;
    }
    .content {
      margin: 20px 0;
    }
    .content p {
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      padding: 10px 0;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Contact Information</h1>
    </div>
    <div class="content">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Experience:</strong> ${experience}</p>
    </div>
    <div class="footer">
      <p>Thank you for contacting us!</p>
    </div>
  </div>
</body>
</html>
    `,
      attachments: [
        {
          filename: attachment.originalname,
          path: attachment.path,
        },
      ],
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
