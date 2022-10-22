import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import Token from '../../../../models/Token';
import User from '../../../../models/User';
import sendEmail from '../../../../utils/sendEmail';
import connectMongo from '../../../../utils/connectMongo';

const router = nc<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await connectMongo();

  if (!req.body?.email) return res.status(401).end();
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Email not found' });

  const { id, name } = user;

  // Create token for email verification

  const verificationToken = nanoid(32);
  const tokenObject = new Token({
    token: verificationToken,
    type: 'changePassword',
    user: id,
  });

  await tokenObject.save();

  // Send verification email

  const verificationLink = `${process.env.WEB_URI}/change-password/${verificationToken}`;

  await sendEmail({
    to: email,
    from: {
      name: 'Jonathan at Socialize',
      email: process.env.EMAIL_FROM || '',
    },
    subject: 'Password reset request',
    text: `Hello, ${name}! Please follow this link to reset your password: ${verificationLink} (Link will expire in 20 minutes)`,
    html: `
    <div>
      <h3>Hello, ${name}!</h3>
      <p>Please follow the link below to reset your password:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>The above link will expire in 20 minutes.</p>
    </div>
    `,
  });

  return res.end();
});

export default router;
