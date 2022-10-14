import nc from 'next-connect';
import { nanoid } from 'nanoid';
import Token from '../../../models/Token';
import sendEmail from '../../../utils/sendEmail';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

const handler = nc().post(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();

  // Create token for email verification

  const verificationToken = nanoid(32);
  const tokenObject = new Token({
    token: verificationToken,
    type: 'verifyEmail',
    user: session.user.id,
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
