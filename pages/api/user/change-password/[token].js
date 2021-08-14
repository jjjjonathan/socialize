import nc from 'next-connect';
import middleware from '../../../../middleware';
import Token from '../../../../models/Token';
import User from '../../../../models/User';

const handler = nc();
handler.use(middleware);

handler.post(async (req, res) => {
  const { token } = req.query;

  const tokenObject = await Token.findOne({ token });

  if (!tokenObject || tokenObject.type !== 'changePassword')
    return res.status(400).json({ error: 'invalid' });

  const createdTime = +tokenObject.timestamp;
  const expiryTime = createdTime + 1000 * 60 * 20;
  const currentTime = Date.now();

  if (expiryTime - currentTime < 0) {
    return res.status(401).json({ error: 'expired' });
  }

  const user = await User.findById(tokenObject.user);

  return res.status(200).json(user);
});

export default handler;
