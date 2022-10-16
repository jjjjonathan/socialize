import nc from 'next-connect';
import { nanoid } from 'nanoid';
import Token from '../../../models/Token';
import sendEmail from '../../../utils/sendEmail';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';

const handler = nc().post(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).end();

  await connectMongo();

  const user = await User.findOne({ email });
  if (!user || user.isEmailVerified) return res.status(400).end();

  // Create token for email verification

  const verificationToken = nanoid(32);
  const tokenObject = new Token({
    token: verificationToken,
    type: 'verifyEmail',
    user: user._id,
  });

  await tokenObject.save();

  // Send verification email

  const verificationLink = `${process.env.WEB_URI}/verify-email/${verificationToken}`;

  await sendEmail({
    to: email,
    from: { name: 'Jonathan at Socialize', email: process.env.EMAIL_FROM },
    subject: 'Please verify your email with socialize!',
    text: `Hello, ${user.name}! Please follow this link to confirm your email: ${verificationLink} (Link will expire in 20 minutes)`,
    html: `
    <div>
      <h3>Hello, ${user.name}!</h3>
      <p>Please follow the link below to confirm your email:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>The above link will expire in 20 minutes.</p>
    </div>
    `,
  });

  return res.end();
});

export default handler;
