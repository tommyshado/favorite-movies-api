import 'dotenv/config';
import pgPromise from 'pg-promise';

const pgp = pgPromise();

const configForTests = {
    connectionString: process.env.DATABASE_FOR_TESTS as string,
};
const dbForTests = pgp(configForTests);

/******************************************************************************************/

const configForApp = {
    connectionString: process.env.DATABASE_APP as string,
}
const dbForApp = pgp(configForApp);

export { dbForTests, dbForApp };