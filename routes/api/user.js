const keys = require('../../config/keys')
const gravatar = require('gravatar')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

/**
 * @route  	GET api/user/test
 * @desc   	Test user route
 * @access 	Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

/**
 * @route  	POST api/user/register
 * @desc   	Register user route
 * @access 	Public
 */
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body)

	// Check Validations
	if (!isValid) {
		return res.status(400).json(errors)
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = 'Email already exists'
			return res.status(400).json(errors)
		} else {
			const avatar = (url = gravatar.url(req.body.email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm', // Default
			}))

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password,
			})

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err
					newUser.password = hash
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err))
				})
			})
		}
	})
})

/**
 * @route  	POST api/user/test
 * @desc   	Test user route
 * @access 	Public
 */
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body)

	// Check Validations
	if (!isValid) {
		return res.status(400).json(errors)
	}

	const email = req.body.email
	const password = req.body.password

	// Find User By Email.
	User.findOne({ email: req.body.email }).then(user => {
		// Check for user
		if (!user) {
			errors.email = 'User not found'
			return res.status(400).json(errors)
		}

		// Check for Password'
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User Matched
				const payload = { id: user.id, name: user.name, avatar: user.avatar } // create jwt payload

				// Sign Token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
						})
					}
				)
			} else {
				errors.password = 'Password incorrect'
				return res.status(400).json(errors)
			}
		})
	})
})

/**
 * @route  	GET api/user/current
 * @desc   	Return user route
 * @access 	Private
 */
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			_id: req.user.id,
			name: req.user.name,
			email: req.user.email,
		})
	}
)

module.exports = router
