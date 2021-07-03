import { paramCase } from 'param-case';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

const defaultUsername = (name) => {
  const kebab = paramCase(name);
  const id = nanoid();

  return `${kebab}-${id}`;
};

export default defaultUsername;
