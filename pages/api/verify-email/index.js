import nc from 'next-connect';
import { nanoid } from 'nanoid';
import middleware from '../../../middleware';
import Token from '../../../models/Token';
import sendEmail from '../../../utils/sendEmail';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  // Create token for email verification

  const verificationToken = nanoid(32);
  const tokenObject = new Token({
    token: verificationToken,
    type: 'verifyEmail',
    user: req.user.id,
  });

  await tokenObject.save();

  // Send verification email

  const verificationLink = `${process.env.WEB_URI}/verify-email/${verificationToken}`;

  await sendEmail({
    to: req.user.email,
    from: { name: 'Jonathan at Socialize', email: process.env.EMAIL_FROM },
    subject: 'Please verify your email with socialize!',
    text: `Hello, ${req.user.name}! Please follow this link to confirm your email: ${verificationLink} (Link will expire in 20 minutes)`,
    html: `
    <div>
      <h3>Hello, ${req.user.name}!</h3>
      <p>Please follow the link below to confirm your email:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>The above link will expire in 20 minutes.</p>
    </div>
    `,
  });

  return res.end();
});

export default handler;
