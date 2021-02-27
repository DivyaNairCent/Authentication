let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


//create a reference to the model
let Contact = require('../models/contact');

module.exports.displayContactList = (req,res,next) =>{
    Contact.find().sort({name:1}).exec((err, ContactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);
            res.render('contact/list', 
            {title:'Business Contacts', 
            ContactList: ContactList,
            displayName: req.user ? req.user.displayName : ''
        });
        }
    });
};


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;


    Contact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //show the edit view
            res.render('contact/edit', 
            {
                title: 'Update Bussiness Contact', 
                contact: contactToEdit,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    }); 
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id" : id, 
        "name" : req.body.name,
        "number" : req.body.number,
        "email" : req.body.email,
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the Contact list
            res.redirect('/contact-list');

        }
    });
}

module.exports.performDelete =  (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list

            res.redirect('/contact-list');
        }
    });
}