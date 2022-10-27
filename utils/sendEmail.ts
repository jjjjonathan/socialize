import sgMail, { MailDataRequired } from '@sendgrid/mail';

const key = process.env.SENDGRID_API_KEY;

if (key) sgMail.setApiKey(key);

const sendEmail = async (message: MailDataRequired) => {
  try {
    await sgMail.send(message);
  } catch (error: any) {
    throw new Error(`Error sending email: ${error?.message}`);
  }
};

export default sendEmail;
