/** @format */

// const keys = require('./../../config/keys')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')

// Load Profile model
const Profile = require('../models/Profile')
// Load User model
const User = require('../models/User')

/**
 * @route  	GET api/profile/test
 * @desc   	Test profile route
 * @access 	Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Profiles Works' }))

/**
 * @route  	GET api/profile
 * @desc   	Get current users profile
 * @access 	Private
 */
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {}

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (!profile) {
				return res.status(200).json(errors)
			}
		})
	}
)

module.exports = router
