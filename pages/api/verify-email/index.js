import nc from 'next-connect';
import { nanoid } from 'nanoid';
import { unstable_getServerSession } from 'next-auth/next';
import Token from '../../../models/Token';
import sendEmail from '../../../utils/sendEmail';
import { authOptions } from '../auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';

const handler = nc().post(async (req, res) => {
  const { email } = req.body;

  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session && !email) return res.status(401).end();

  let emailToVerify;
  let userIdToVerify;
  let nameToVerify;

  if (session) {
    emailToVerify = session.user.email;
    userIdToVerify = session.user.id;
    nameToVerify = session.user.name;
  } else {
    const user = await User.findOne({ email });
    if (!user || user.isEmailVerified) return res.status(400).end();
    emailToVerify = user.email;
    userIdToVerify = user._id;
    nameToVerify = user.name;
  }

  // Create token for email verification

  const verificationToken = nanoid(32);
  const tokenObject = new Token({
    token: verificationToken,
    type: 'verifyEmail',
    user: userIdToVerify,
  });

  await tokenObject.save();

  // Send verification email

  const verificationLink = `${process.env.WEB_URI}/verify-email/${verificationToken}`;

  await sendEmail({
    to: emailToVerify,
    from: { name: 'Jonathan at Socialize', email: process.env.EMAIL_FROM },
    subject: 'Please verify your email with socialize!',
    text: `Hello, ${nameToVerify}! Please follow this link to confirm your email: ${verificationLink} (Link will expire in 20 minutes)`,
    html: `
    <div>
      <h3>Hello, ${nameToVerify}!</h3>
      <p>Please follow the link below to confirm your email:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>The above link will expire in 20 minutes.</p>
    </div>
    `,
  });

  return res.end();
});

export default handler;
