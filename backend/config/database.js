import dotenv from 'dotenv';
import neo4j from 'neo4j-driver';

dotenv.config();

let driver;

export const initializeNeo4j = async () => {
  try {
    driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
      {
        maxConnectionPoolSize: 50,
        maxTransactionRetryTime: 30000,
        encryption: 'ENCRYPTION_ON',
      }
    );

    await driver.verifyConnectivity();
    console.log('✅ Neo4j Aura connected successfully');
    return driver;
  } catch (error) {
    console.error('❌ Neo4j connection failed:', error.message);
    throw error;
  }
};

export const getDriver = () => {
  if (!driver) {
    throw new Error('Neo4j driver not initialized. Call initializeNeo4j first.');
  }
  return driver;
};

export const closeNeo4j = async () => {
  if (driver) {
    await driver.close();
    console.log('Neo4j connection closed');
  }
};

export const createConstraints = async () => {
  const session = driver.session();
  try {
    // Create constraints for email uniqueness
    await session.run('CREATE CONSTRAINT email_unique IF NOT EXISTS FOR (u:User) REQUIRE u.email IS UNIQUE');
    
    // Create index for email lookups
    await session.run('CREATE INDEX email_index IF NOT EXISTS FOR (u:User) ON (u.email)');
    
    // Create index for verification tokens
    await session.run('CREATE INDEX verification_token_index IF NOT EXISTS FOR (u:User) ON (u.verificationToken)');
    
    console.log('✅ Database constraints and indexes created');
  } catch (error) {
    if (!error.message.includes('already exists')) {
      console.error('Error creating constraints:', error);
    }
  } finally {
    await session.close();
  }
};
