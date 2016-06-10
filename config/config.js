/**
 * Created by javier on 17/05/2016.
 */

/* app general configuration */
const SECRET = 'aMdoeb5ed87zorRdkD6greDML81DcnrzeSD648ferFejmplx';
const TOKEN_EXPIRATION_SEC = 3600; //1 hour

/* mongo config */
const DB_PORT = 27017;
const DB_URL = 'mongodb://javier:mongodb;localhost:' + this.DB_PORT + '/test';

/*redis config */
const DB_PORT_REDIS = 6379;

module.exports = {
  secret : SECRET,
  portDBMongo : DB_PORT,
  portDBRedis : DB_PORT_REDIS,
  database : DB_URL,
  tokenExpiration : TOKEN_EXPIRATION_SEC
};