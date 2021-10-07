export default {
    JWT_SECRET: process.env.JWT_SECRET ?? 'EXPRESS_API_JWT_SECRET',
    EXPIRESIN_TOKEN: process.env.EXPIRESIN_TOKEN ?? '1H'
   }