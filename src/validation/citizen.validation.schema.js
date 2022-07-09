const { body, param } = require('express-validator');

const citizenProfileValidator = [
    body('nationalID').matches("/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/").withMessage('invalis NIC.'),
    body('firstname').exists({checkFalsy:true}).withMessage('First name missing.'),
    body('lastname').exists({checkFalsy:true}).withMessage('Last name missing.') ,
    body('profession').exists({checkFalsy:true}).withMessage('Select a profession.') ,
    body('yearsOfExperience').exists({checkFalsy:true}).withMessage('Experience missing.') ,
    body('dob').isDate().withMessage('Invalid date of birth.') ,
    body('photoURL').isURL().withMessage('Invalid URL.') ,
    body('streetNo').exists({checkFalsy:true}).withMessage('Street No  missing.') , 
    body('streetName').exists({checkFalsy:true}).withMessage('Street name missing.') , 
    body('city').exists({checkFalsy:true}).withMessage('City name missing.') ,
    body('province').exists({checkFalsy:true}).withMessage('Province name missing.') ,
    body('birthCertficateURL').isURL().withMessage('Invalid URL.') ,
    body('policeReportURL').isURL().withMessage('Invalid URL.'),
    body('cvURL').isURL().withMessage('Invalid URL.'),
    body('passportURL').isURL().withMessage('Invalid URL.'),
    body('latitude').isLatLong().withMessage('Invalid Latitude'),
    body('longitude').isLatLong().withMessage('Invalid Longitude')
];

const documentIDValidator = [
    param('id').exists({checkFalsy:true}).withMessage('Document id missing.')
]
const nationalIDValidator = [
    param('id').matches("^([0-9]{9}[x|X|v|V]|[0-9]{12})$").withMessage('invalid NIC.'),
]

const verifyCitizenValidator = [
    body('verficiationSTate').exists({checkFalsy:true}).withMessage('State Missing.'),
];

const updateCitizenValidator = [
    body('latitude').exists({checkFalsy:true}).withMessage('latitude Missing.'),
    body('longitude').exists({checkFalsy:true}).withMessage('longitude Missing.'),
];
const qualificationValidator = [
    body('experience').exists({checkFalsy:true}).withMessage('Experience is missing.'),
    body('profession').exists({checkFalsy:true}).withMessage('Profession is missing.'),
];

module.exports = {
    citizenProfileValidator,
    documentIDValidator,
    nationalIDValidator,
    verifyCitizenValidator,
    updateCitizenValidator,
    qualificationValidator
};