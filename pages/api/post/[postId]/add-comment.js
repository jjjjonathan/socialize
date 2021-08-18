import { body as validate, validationResult } from 'express-validator';
import nc from 'next-connect';
import middleware from '../../../../middleware';
import Comment from '../../../../models/Comment';

const handler = nc();
handler.use(middleware);

handler.post(
  validate('body')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comments must be between 1 and 1000 characters')
    .escape(),

  async (req, res) => {
    if (!req.user) return res.status(401).end();

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400);

    const { postId } = req.query;
    const userId = req.user.id;
    const { body } = req.body;

    const comment = new Comment({
      body,
      post: postId,
      user: userId,
    });

    await comment.save();

    const populatedComment = await comment
      .populate('user', 'name username profilePicture')
      .execPopulate();

    return res.json(populatedComment);
  },
);

export default handler;
