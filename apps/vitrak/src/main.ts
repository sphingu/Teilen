import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import path from 'path'
import express, { Response } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { v4 as uuid } from 'uuid'

import { buildSchema, createServer } from '@teilen/api/graphql-lib'
import * as C from './constants'
import './passport'

async function main() {
  const app = express()
  app.use(cors())
  app.use(
    session({
      genid: () => uuid(),
      secret: C.SESSION_SECRET,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(function (req, res, next): Response | void {
    const isLoginRoute = req.path.indexOf('auth') !== -1
    if (!isLoginRoute && !req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
  })

  // app.use(
  //   morgan('common', {
  //     stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
  //       flags: 'a',
  //     }),
  //   }),
  // )
  app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root
  app.get('/', function (req, res) {
    res.json(req.user ? 'YES' : 'NO')
  })
  app.get('/logout', function (req, res) {
    req.session.destroy(() => {
      req.logout((err)=>{
        console.log('Error while logging out ', err.message)
      })
      res.redirect(C.URLS.LOGOUT_REDIRECT)
    })
  })

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      prompt: 'select_account',
    }),
  )
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: C.URLS.FAILURE_REDIRECT,
      successRedirect: C.URLS.SUCCESS_REDIRECT,
    }),
  )

  const schema = await buildSchema()
  const server = createServer(schema)

  await server.start()

  server.applyMiddleware({ app })

  app.listen(C.PORT, () => {
    console.log(`🚀 Server ready at ${C.API_BASE_URL}`)
  })
}

main().catch(console.error)
