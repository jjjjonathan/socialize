import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (message) => {
  try {
    await sgMail.send(message);
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

export default sendEmail;
