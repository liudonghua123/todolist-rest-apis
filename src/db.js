import mongoose from 'mongoose';

export default callback => {
  const dbUrl =
    process.env.NODE_ENV === 'prod'
      ? `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
          process.env.MONGO_INITDB_ROOT_PASSWORD
        }@database:27017/?authMechanism=SCRAM-SHA-1&authSource=admin`
      : `mongodb://localhost:27017/`;
  console.info(`connecting dbUrl: ${dbUrl}`);

  mongoose.connect(dbUrl);

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connected to database');
  });

  db.on('disconnected', () => {
    console.log('Connection to database disconnected');
  });

  db.on('error', error => {
    console.log(
      'Error occured while connecting to database:',
      JSON.stringify(error)
    );
  });

  callback(db);
};
