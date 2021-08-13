import nc from 'next-connect';
import middleware from '../../middleware';
import sendEmail from '../../utils/sendEmail';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  const email = {
    to: 'hornathanjon@gmail.com',
    from: 'jonathanhorn000@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  await sendEmail(email);

  res.status(204).end();
});

export default handler;
