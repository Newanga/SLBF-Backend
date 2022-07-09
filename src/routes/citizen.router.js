const express = require('express');
const { ROLE_BUREAU, ROLE_COMPANY, ROLE_CITIZEN } = require('../constants/ROLES');
const router = express.Router()
const controller = require('../controllers/citizen.controller')
const { checkRole } = require('../middleware/authorization');
const {
    citizenProfileValidator,
    documentIDValidator,
    nationalIDValidator,
    verifyCitizenValidator,
    updateCitizenValidator,
    qualificationValidator
} = require('../validation/citizen.validation.schema');
const { validateRequestSchema } = require('../middleware/validate.request.schema');


router.post('/', checkRole([ROLE_CITIZEN]), citizenProfileValidator, validateRequestSchema, controller.completeCitizenProfile);

router.get('/:id', checkRole([ROLE_BUREAU]), documentIDValidator, validateRequestSchema, controller.getCitizenByID);

router.get('/national-id/:id', checkRole([ROLE_BUREAU]), nationalIDValidator, validateRequestSchema, controller.getCitizenByNationalID);

router.delete('/:id', checkRole([ROLE_BUREAU]), documentIDValidator, validateRequestSchema, controller.removeCitizenFromSystem);

router.put('/verify', checkRole([ROLE_BUREAU]), verifyCitizenValidator, validateRequestSchema, controller.verifyCitizen);

router.get('/', checkRole([ROLE_COMPANY]),qualificationValidator, validateRequestSchema, controller.getCitizensByQualification);
// 
router.put('/', checkRole([ROLE_CITIZEN]), updateCitizenValidator, validateRequestSchema, controller.updateCitizenProfile);




module.exports = router