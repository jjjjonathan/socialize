import nc from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();
const upload = multer({ dest: '/tmp' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

handler.use(middleware);

handler.post(upload.single('profilePicture'), async (req, res) => {
  if (!req.user) return res.status(401).end();

  const image = await cloudinary.uploader.upload(req.file.path, {
    width: 512,
    height: 512,
    crop: 'fill',
    gravity: 'faces',
  });

  console.log(image);

  const profilePicture = image.public_id;

  const { id } = req.user;
  await User.findByIdAndUpdate(id, { profilePicture });

  return res.json(204);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
