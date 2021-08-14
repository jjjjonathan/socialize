import nc from 'next-connect';
import middleware from '../../middleware';
import { defaultDate } from '../../utils/dateHelpers';

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  const origDate = Date.now();
  const datePlusTwenty = origDate + 1000 * 60 * 20;

  const formatOrig = defaultDate(origDate);
  const formatTwenty = defaultDate(datePlusTwenty);

  const other = +new Date();
  const otherPlusTwenty = other + 1000 * 60 * 20;

  const formatOther = defaultDate(other);
  const formatOtherTwenty = defaultDate(otherPlusTwenty);

  return res.json({
    origDate,
    datePlusTwenty,
    formatOrig,
    formatTwenty,
    other,
    otherPlusTwenty,
    formatOther,
    formatOtherTwenty,
  });
});

export default handler;
