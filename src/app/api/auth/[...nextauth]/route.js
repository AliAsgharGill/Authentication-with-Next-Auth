import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  // Github provider
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Access account object here
      console.log('Account Object:', account);
      // You can perform actions like saving user to database
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token, user }) {
      // Modify session object
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) { 
      // Initial sign in
      if (account && user) {
        token.accessToken = account.accessToken;
        token.idToken = account.idToken;
        token.refreshToken = account.refreshToken;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
