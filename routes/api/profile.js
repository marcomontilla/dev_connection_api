const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load Input Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route  	GET api/profile/test
 * @desc   	Test profile route
 * @access 	Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Profiles Works' }));

/**
 * @route  	GET api/profile
 * @desc   	Get current user profile
 * @access 	Private
 */
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then(profile => {
				if (!profile) {
					errors.noprofile = 'There is no profile for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
			});
	}
);

/**
 * @route  	GET api/profile/all
 * @desc   	GET all profiles
 * @access 	Public
 */
router.get('/all', (req, res) => {
	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles';
				return res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

/**
 * @route  	GET api/profile/handle/:handle
 * @desc   	Get profile by handle
 * @access 	Public
 */
router.get('/handle/:handle', (req, res) => {
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

/**
 * @route  	GET api/profile/user/:user_id
 * @desc   	GET profile by ID
 * @access 	Public
 */
router.get('/user/:user_id', (req, res) => {
	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

/**
 * @route  	POST api/profile
 * @desc   	Create or Edit user profile
 * @access 	Private
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		// Check Validations
		if (!isValid) {
			return res.status(400).json(errors);
		}

		// Get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.handle) profileFields.handle = req.body.handle;
		req.body.githubusername
			? (profileFields.githubusername = req.body.githubusername)
			: (profileFields.githubusername = '');
		req.body.location
			? (profileFields.location = req.body.location)
			: (profileFields.location = '');
		req.body.website
			? (profileFields.website = req.body.website)
			: (profileFields.website = '');
		req.body.company
			? (profileFields.company = req.body.company)
			: (profileFields.company = '');
		req.body.bio
			? (profileFields.bio = req.body.bio)
			: (profileFields.bio = '');

		// Skills - Split into array
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}

		// Social
		profileFields.social = {};

		req.body.youtube
			? (profileFields.social.youtube = req.body.youtube)
			: (profileFields.social.youtube = '');
		req.body.twitter
			? (profileFields.social.twitter = req.body.twitter)
			: (profileFields.social.twitter = '');
		req.body.facebook
			? (profileFields.social.facebook = req.body.facebook)
			: (profileFields.social.facebook = '');
		req.body.linkedin
			? (profileFields.social.linkedin = req.body.linkedin)
			: (profileFields.social.linkedin = '');
		req.body.instagram
			? (profileFields.social.instagram = req.body.instagram)
			: (profileFields.social.instagram = '');

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				// Update Profile if exist
				// Check if handle exist
				Profile.findOne({ handle: req.body.handle }).then(profile => {
					// If profile exist and the user is different return error
					if (profile && profile.user._id != req.user.id) {
						errors.handle = 'That handle already exists';
						return res.status(400).json(errors);
					} else {
						// Update Profile
						Profile.findOneAndUpdate(
							{ user: req.user.id },
							{ $set: profileFields },
							{ new: true }
						).then(profile => res.json(profile));
					}
				});
			} else {
				// Create A New Profile
				// Check if handle exist
				Profile.findOne({ handle: req.body.handle }).then(profile => {
					// If profile exist and the user is different return error
					if (profile && profile._id !== req.user.id) {
						errors.handle = 'That handle already exists';
						return res.status(400).json(errors);
					} else {
						// Save Profile
						new Profile(profileFields)
							.save()
							.then(profile => res.json(profile));
					}
				});
			}
		});
	}
);

/**
 * @route  	POST api/profile/experience
 * @desc   	Add experience to profile
 * @access 	Private
 */
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);

		// Check Validations
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};

			// Add to exp array
			profile.experience.unshift(newExp);
			profile.save().then(profile => res.json(profile));
		});
	}
);

/**
 * @route  	POST api/profile/education
 * @desc   	Add education to profile
 * @access 	Private
 */
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);

		// Check Validations
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};

			// Add to edu array
			profile.education.unshift(newEdu);
			profile.save().then(profile => res.json(profile));
		});
	}
);

/**
 * @route  	DELETE api/profile/experience/:exp_id
 * @desc   	Delete experience from profile
 * @access 	Private
 */
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				// Get remove index
				const removeIndex = profile.experience
					.map(item => item.id)
					.indexOf(req.params.exp_id);

				// Splice out of array
				profile.experience.splice(removeIndex, 1);

				// Save
				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	}
);

/**
 * @route  	DELETE api/profile/education/:edu_id
 * @desc   	Delete education from profile
 * @access 	Private
 */
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				// Get remove index
				const removeIndex = profile.education
					.map(item => item.id)
					.indexOf(req.params.edu_id);

				// Splice out of array
				profile.education.splice(removeIndex, 1);

				// Save
				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	}
);

/**
 * @route  	DELETE api/profile
 * @desc   	Delete user and profile
 * @access 	Private
 */
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id })
			.then(() => {
				User.findOneAndRemove({ _id: req.user.id }).then(() =>
					res.json({ success: true })
				);
			})
			.catch(err => res.status(404).json(err));
	}
);

module.exports = router;
