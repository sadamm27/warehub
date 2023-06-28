const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'uriah.bode17@ethereal.email',
            pass: 'JjsENShbewgxTz768e'
        }
    });

    const info = await transporter.sendMail({
      from: 'warehubproject28@gmail.com',
      to,
      subject,
      html,
    });

    console.log('Email sent successfully. Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

module.exports = {
  sendEmail,
};
