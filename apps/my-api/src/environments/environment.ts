export const environment = {
  production: process.env.NODE_ENV === 'production',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4200'],
  corsOptions: {
    credentials: true, // If you need to support cookies/auth
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    maxAge: 86400, // 24 hours in seconds
  }
};
