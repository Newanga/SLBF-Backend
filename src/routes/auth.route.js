const express = require('express');
const { validateRequestSchema } = require('../middleware/validate.request.schema');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { loginValidator, registerValidator } = require('../validation/auth.validation.schema')

router.post('/login', loginValidator, validateRequestSchema, controller.login);
router.post('/register', registerValidator, validateRequestSchema, controller.register);



module.exports = router