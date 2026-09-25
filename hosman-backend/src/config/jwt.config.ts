export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-prod',
  expiresIn: '24h',
};
