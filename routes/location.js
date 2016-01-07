var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var model = require('../models/Location');
var User = require('../models/User');


// configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// end configuration for passport

function buildErrorResponse(err) {
  return {
    message: err,
    status: 500,
    note: 'This response was generated due to user error.'
  };
};


/* GET locations listing. */
router.get('/', function(req, res, next) {
  model.find(function(err, locations) {
    if (err) {
      res.json(buildErrorResponse(err));
    } else {
      res.json(locations);
    }
  });
});

router.get('/query', function(req, res, next) {
  model.find({ foodtruck:true, latenight:true, byob:true, price:4 },function(err, locations) {
    if (err) {
      res.json(buildErrorResponse(err));
    } else {
      res.json(locations);
    }
  });
});

router.get('/q', function(req, res, next) {
  var url = require("url");
  var parts = url.parse(req.query.terms, true);
  res.send("terms is set to " + req.query.terms + "parts is " + parts[1]);
  // var url = require("url");
  var parts = url.parse(req.params.terms, true);
  // console.log(parts);
  // model.find({ foodtruck:true, latenight:true, byob:true, price:4 },function(err, locations) {
  //   if (err) {
  //     res.json(buildErrorResponse(err));
  //   } else {
  //     res.json(locations);
  //   }
  // });
});

// var url = require("url");
// var parts = url.parse("http://test.com?page=25&foo=bar", true);

router.get('/:id', function(req, res, next) {
  model.findById(req.params.id, function(err, location) {
    if (err) {
      res.json(buildErrorResponse(err));
    } else {
      res.json(location);
    }
  });
});

router.get('/location/:id', function(req, res, next) {
 model.findById(req.params.id, function(err, location) {
   if (err) {
     res.json(buildErrorResponse(err));
   } else {
     res.json(location);
   }
 });
});

router.get('/location/burger/:id', function(req, res, next) {
 model.findById(req.params.id, function(err, burger) {
   if (err) {
     res.json(buildErrorResponse(err));
   } else {
     res.json(burger);
   }
 });
});

router.post('/', function(req, res, next) {
  model.create(req.body, function(err, location) {
    if (err) {
      res.json(buildErrorResponse(err));
    } else {
      res.json(location);
    }
  });
});

router.put('/:id', function(req, res, next) {
  model.findByIdAndUpdate(req.params.id, req.body, function(err, location) {
    if (err) {
      res.json(buildErrorResponse(err));
    } else {
      res.json(location);
    }
  });
});

router.patch('/:id', function(req, res, next) {
  model.findByIdAndUpdate(req.params.id, req.body, function(err, location) {
    if (err) {
      res.json(buildErrorResponse(err));
    } else {
      res.json(location);
    }
  });
});


router.delete('/:id', function(req, res, next) {
  model.findByIdAndRemove(req.params.id, req.body, function(err, location) {
    if (err) {
      res.json(buildErrorResponse(err));
    } else {
      res.json(location);
    }
  });
});


module.exports = router;
