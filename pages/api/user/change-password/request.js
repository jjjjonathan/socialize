import nc from 'next-connect';
import { nanoid } from 'nanoid';
import { unstable_getServerSession } from 'next-auth/next';
import Token from '../../../../models/Token';
import sendEmail from '../../../../utils/sendEmail';
import User from '../../../../models/User';
import { authOptions } from '../../auth/[...nextauth]';
import connectMongo from '../../../../utils/connectMongo';

const handler = nc().post(async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session && !req.body?.email) return res.status(401).end();

  let email;
  let userId;
  let name;

  if (req.body?.email) {
    email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Email not found' });

    userId = user.id;
    name = user.name;
  } else {
    email = session.user.email;
    userId = session.user.id;
    name = session.user.name;
  }

  // Create token for email verification

  const verificationToken = nanoid(32);
  const tokenObject = new Token({
    token: verificationToken,
    type: 'changePassword',
    user: userId,
  });

  await tokenObject.save();

  // Send verification email

  const verificationLink = `${process.env.WEB_URI}/change-password/${verificationToken}`;

  await sendEmail({
    to: email,
    from: { name: 'Jonathan at Socialize', email: process.env.EMAIL_FROM },
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

export default handler;
