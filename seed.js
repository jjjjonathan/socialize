import bcrypt from 'bcryptjs';
import User from './models/User';
import Token from './models/Token';
import Post from './models/Post';
import Comment from './models/Comment';

async function seed() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('NODE_ENV must equal "test"!');
  } else {
    // Clean out database
    await Promise.all([
      User.deleteMany({}),
      Token.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
    ]);

    // Hash passwords
    const [examplePasswordHash, seedPasswordHash] = await Promise.all([
      bcrypt.hash('examplePassword', 11),
      bcrypt.hash('password', 11),
    ]);

    // Create user objects

    const exampleUser = new User({
      _id: 'example_user_id',
      name: 'Example Test',
      email: 'example@example.com',
      username: 'exampletest',
      examplePasswordHash,
      profilePicture: 'tckqw4nglwleb7ngz8qz',
    });

    const seedUser = new User({
      name: 'Seed Person',
      email: 'seedy@example.com',
      username: 'seedperson',
      seedPasswordHash,
      profilePicture: 'bhfuf041l0daetumeaxj',
    });

    // Save seeded users
    await Promise.all([exampleUser.save(), seedUser.save()]);
  }
}

seed();
