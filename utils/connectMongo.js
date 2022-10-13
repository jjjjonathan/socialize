import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not set');
}

// Maintain cached connection across hot reloads
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongo = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseConn) => mongooseConn);
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectMongo;
