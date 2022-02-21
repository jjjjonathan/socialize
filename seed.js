import bcrypt from 'bcryptjs';
import User from './models/User';

async function seed() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('NODE_ENV must equal "test"!');
  } else {
    const passwordHash = await bcrypt.hash('password', 11);

    const user = new User({
      name: 'Seed Person',
      email: 'seedy@example.com',
      username: 'seedperson',
      passwordHash,
      profilePicture: 'tckqw4nglwleb7ngz8qz',
    });

    await user.save();
  }
}

seed();
