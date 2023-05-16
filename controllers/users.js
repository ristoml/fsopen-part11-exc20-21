const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const checkUser = await User.findOne({ username: username })
  if (checkUser) return response.status(400).json({ error: 'username already exists' })

  if (username.length < 3) return response.status(400).json({ error: 'username too short' })

  if (password.length < 3) return response.status(400).json({ error: 'password too short' })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter