import nc from 'next-connect';
import middleware from '../../../middleware';
import User from '../../../models/User';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  const user = await User.findById(process.env.EXAMPLE_USER_ID);

  req.login(user, (error) => {
    if (error) throw error;
    res.redirect('/');
  });
});

export default handler;
