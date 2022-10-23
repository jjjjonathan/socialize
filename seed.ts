/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import bcrypt from 'bcryptjs';
import connectMongo from './utils/connectMongo';
import User from './models/User';
import Token from './models/Token';
import Post from './models/Post';
import Comment from './models/Comment';

async function seed() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('NODE_ENV must equal "test"!');
  }

  try {
    await connectMongo();

    console.log('Resetting database...');
    await Promise.all([
      User.deleteMany({}),
      Token.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
    ]);

    console.log('Hashing passwords...');
    const [examplePasswordHash, seedPasswordHash] = await Promise.all([
      bcrypt.hash('examplePassword', 11),
      bcrypt.hash('password', 11),
    ]);

    console.log('Seeding users...');

    const exampleUser = new User({
      name: 'Example Test',
      email: 'example@example.com',
      username: 'exampletest',
      passwordHash: examplePasswordHash,
      profilePicture: 'tckqw4nglwleb7ngz8qz',
    });

    const seedUser = new User({
      name: 'Seed Person',
      email: 'seedy@example.com',
      username: 'seedperson',
      passwordHash: seedPasswordHash,
      profilePicture: 'bhfuf041l0daetumeaxj',
    });

    // Save seeded users
    await Promise.all([exampleUser.save(), seedUser.save()]);

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('An error occurred while seeding the database:', error);
  }
}

seed();
