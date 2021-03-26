module.exports = {
  mode: process.env.NODE_ENV ?? 'production',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV !== 'production'
};