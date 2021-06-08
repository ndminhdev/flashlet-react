export const PUBLIC_URI = process.env.PUBLIC_URI || 'https://localhost:8080';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;

if (!GOOGLE_CLIENT_ID || !FACEBOOK_APP_ID) {
  console.error('To sign in with Facebook and Google, please set GOOGLE_CLIENT_ID and FACEBOOK_APP_ID');
}
