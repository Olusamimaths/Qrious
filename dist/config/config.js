import dotenv from 'dotenv';
dotenv.config();

function configuration(NODE_ENV) {
  if (NODE_ENV === 'test') {
    return {
      connectionString: process.env.TEST_DB,
      SECRET_KEY: 'anythingcangoHERE'
    };
  }

  if (NODE_ENV === 'development') {
    return {
      connectionString: process.env.DATABASE_URL,
      SECRET_KEY: process.env.JWT_KEY
    };
  }

  if (NODE_ENV === 'production') {
    return {
      connectionString: process.env.DATABASE_URL,
      SECRET_KEY: process.env.JWT_KEY
    };
  }

  throw new Error("Environment configuration ".concat(NODE_ENV, " does not exist"));
}

export default configuration;