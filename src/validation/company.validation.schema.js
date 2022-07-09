const { body, param } = require('express-validator');

const companyProfileValidator = [
    body('name').exists({checkFalsy:true}).withMessage('Name missing.'),
    body('sector').exists({checkFalsy:true}).withMessage('Sector Missing.') ,
    body('contactNO').exists({checkFalsy:true}).withMessage('Invalid contact No.') ,
    body('documentURL').isURL().withMessage('Invalid URL.') ,
    body('address').exists({checkFalsy:true}).withMessage('Address is missing.') ,
    body('latitude').isLatLong().withMessage('Invalid Latitude'),
    body('longitude').isLatLong().withMessage('Invalid Longitude')
];

const verifyCompanyValidator = [
    body('verficiationSTate').exists({checkFalsy:true}).withMessage('State Missing.'),
];

module.exports = {
    companyProfileValidator,
    verifyCompanyValidator
};b   