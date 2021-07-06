import { body, validationResult } from 'express-validator';
import nc from 'next-connect';
import middleware from '../../../middleware';
import Post from '../../../models/Post';

const handler = nc();
handler.use(middleware);

handler.post(
  body('body')
    .trim()
    .isLength({ min: 3, max: 2000 })
    .withMessage('Posts must be between 3 and 2000 characters!')
    .escape(),
  async (req, res) => {
    if (!req.user) return res.status(401).end();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postBody = req.body.body;
    const user = req.user.id;

    const post = new Post({
      body: postBody,
      user,
    });

    const savedPost = await post.save();
    return res.json(savedPost);
  },
);

export default handler;
