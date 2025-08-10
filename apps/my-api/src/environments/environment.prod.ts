export const environment = {
  production: true,
  // In production, this will be overridden by ALLOWED_ORIGINS env variable
  allowedOrigins: [],
  corsOptions: {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    maxAge: 86400,
  }
};
