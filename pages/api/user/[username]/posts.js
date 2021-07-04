import nc from 'next-connect';
import router from '../../../../middleware';
import User from '../../../../models/User';

router.get(async (req, res) => {
  try {
    const { username } = req.query;

    const posts = await User.findOne({ username }, 'posts').populate({
      path: 'posts',
      populate: {
        path: 'user',
        select: 'name username',
      },
    });
    if (!posts) throw new Error('User not found');
    res.json(posts);
  } catch (error) {
    throw new Error('error');
  }
});

export default router;
