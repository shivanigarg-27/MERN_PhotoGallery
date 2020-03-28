
let express = require('express'),
multer = require('multer'),
mongoose = require('mongoose'),
uuidv4 = require('uuid/v4'),
router = express.Router();

let User = require('../models/User');

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
      const filename = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + filename)
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new error('only image format is allowed.'))
    }
  }
})

router.post('/', upload.single('profileImg'), (req, res, next) => {
  
 // console.log('Request', req);
  
  const url = req.protocol + '://' + req.get('host')
  
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    userEmail: req.body.userEmail,
    profileImg: url + '/public/' + req.file.filename
});

  //console.log(user)
  user.save().then(result => {
      res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
              _id: result._id,
              profileImg: result.profileImg
          }
      })
  }).catch(err => {
      console.log('err')
  })
})

module.exports = router;
