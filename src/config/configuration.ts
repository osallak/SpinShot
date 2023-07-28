export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  databaseUrl: process.env.DATABASE_URL,
});
