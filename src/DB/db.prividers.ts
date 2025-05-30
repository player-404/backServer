import mongoose from 'mongoose';

export const DBproviders = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect(process.env.MONGODB_URI || '', {}),
};
