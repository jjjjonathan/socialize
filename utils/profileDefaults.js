import { paramCase } from 'param-case';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

export const defaultUsername = (name) => {
  const kebab = paramCase(name);
  const id = nanoid();

  return `${kebab}-${id}`;
};

export const defaultProfilePicture = (username, name) => {
  let tag = '';

  if (name) {
    const nameArray = name.split(' ');
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue[0];
    const initials = nameArray.reduce(reducer, '').toUpperCase();
    tag = `&text=${initials}`;
  }

  return `https://avatar.tobi.sh/${username}.svg?size=512${tag}`;
};

export const getFacebookProfilePicture = (facebookId, accessToken) =>
  `https://graph.facebook.com/${facebookId}/picture?width=512&height=512&access_token=${accessToken}`;
