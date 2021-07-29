import nc from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).end();

  const { id } = req.user;
  const user = await User.findById(id);

  return res.json(user);
});

export default handler;
