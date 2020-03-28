var express = require('express');
var router = express.Router();
let User = require('../models/User');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().then(data => {
    res.status(200).json({
      users: data
    })
  })  
});

router.get('/photoesOfUser', function(req, res, next) {
  User.find({userEmail: req.query.userEmail}).then(data => {
    res.status(200).json({
      users: data
    })
  })  
});

module.exports = router;
