import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import nc from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import { defaultProfilePicture } from '../../../utils/profileDefaults';
import { authOptions } from '../auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = nc<NextApiRequest, NextApiResponse>();

router.post(
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .escape(),

  body('email')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Email must be between 5 and 100 characters')
    .isEmail()
    .withMessage('Email must be in a valid format')
    .escape(),

  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .escape(),

  body('password')
    .isLength({ min: 8, max: 40 })
    .withMessage('Password must be between 8 and 40 characters'),

  body('passwordConf').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords must match');
    }
    return true;
  }),

  async (req, res) => {
    await connectMongo();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, username, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({
        errors: [
          {
            msg: `User already exists with email address ${email} Try logging in or use a different email.`,
          },
        ],
      });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({
        errors: [
          {
            msg: `Username ${username} is already in use. Try something different!`,
          },
        ],
      });

    const passwordHash = await bcrypt.hash(password, 11);

    const image = await cloudinary.uploader.upload(
      defaultProfilePicture(username, name),
      {
        width: 512,
        height: 512,
        crop: 'fill',
        gravity: 'faces',
      },
    );
    const profilePicture = image.public_id;

    const user = new User({
      name,
      email,
      username,
      passwordHash,
      profilePicture,
    });

    const savedUser = await user.save();

    return res.status(201).json(savedUser);
  },
);

router.get(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.json({ user: null });
  return res.json(session.user);
});

export default router;
