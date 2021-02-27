let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');
// helper function for guard purpose

function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    
    }
    next();
}

let contactController = require('../controllers/contact')

/*GET  Route for the Contact List Page - READ operation*/
router.get('/', contactController.displayContactList);

/*GET  Route for display the Edit Page - CREATE operation*/
router.get('/edit/:id', contactController.displayEditPage);

/*POST  Route for processing the Edit Page - CREATE operation*/
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/*GET to perform Deletion- DELETE Operation*/
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;