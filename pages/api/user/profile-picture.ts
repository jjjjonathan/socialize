import nc from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { unstable_getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import { authOptions } from '../auth/[...nextauth]';
import connectMongo from '../../../utils/connectMongo';

const upload = multer({ dest: '/tmp' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = nc<NextApiRequest, NextApiResponse>();

router.post(upload.single('profilePicture'), async (req, res) => {
  await connectMongo();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end();
  if (!req.file) return res.status(400).end();

  const image = await cloudinary.uploader.upload(req.file.path, {
    width: 512,
    height: 512,
    crop: 'fill',
    gravity: 'faces',
  });

  const profilePicture = image.public_id;

  const { id } = session.user;
  await User.findByIdAndUpdate(id, { profilePicture });

  return res.json(204);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router;
