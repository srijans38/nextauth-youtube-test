import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // console.log({ profile });
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
});
