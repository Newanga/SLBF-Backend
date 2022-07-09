const express=require('express');
const { ROLE_COMPANY, ROLE_BUREAU } = require('../constants/ROLES');
const router=express.Router();
var controller = require('../controllers/company.controller');
const {checkRole} = require('../middleware/authorization')
const { validateRequestSchema } = require('../middleware/validate.request.schema');
const { companyProfileValidator,verifyCompanyValidator } = require('../validation/company.validation.schema');

router.post('/', checkRole([ROLE_COMPANY]) ,companyProfileValidator,validateRequestSchema,controller.completeCompanyProfile);
router.put('/verify', checkRole([ROLE_BUREAU]) ,verifyCompanyValidator,validateRequestSchema,controller.verifyCompany);



module.exports=router