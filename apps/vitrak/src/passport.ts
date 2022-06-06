import { IncomingMessage } from 'http'
import passport from 'passport'
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import { getPrismaClient } from '@teilen/api/graphql-lib'

import { GOOGLE_OPTIONS } from './constants'

const googleCallback = async (
  _req: IncomingMessage,
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) => {
  const prisma = getPrismaClient()
  let matchingUser = await prisma.user.findFirst({
    where: { googleId: profile.id },
  })

  if (matchingUser) {
    return done(null, {
      id: matchingUser.id,
      email: matchingUser.email,
    })
  }

  const email = profile._json.email
  if (!email) {
    return done(new Error('Email not available'))
  }

  // Update user if exist
  matchingUser = await prisma.user.findUnique({
    where: { email: email },
  })

  const userData = {
    firstName: profile.name?.givenName,
    lastName: profile.name?.familyName,
    email: email,
    googleId: profile.id,
    imageUrl: profile._json.picture,
  }

  if (matchingUser) {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: userData,
    })

    return done(null, {
      id: updatedUser.id,
      email: updatedUser.email,
    })
  }

  const newUser = await prisma.user.create({
    data: userData,
  })

  return done(null, {
    id: newUser.id,
    email: newUser.email,
  })
}

passport.use(new GoogleStrategy(GOOGLE_OPTIONS, googleCallback))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id: string, done) => {
  const prisma = getPrismaClient()
  const user = await prisma.user.findUnique({
    where: { id: id },
  })

  if (!user) {
    done(new Error('User not available'))
  } else {
    done(null, { id: user.id, email: user.email })
  }
})
