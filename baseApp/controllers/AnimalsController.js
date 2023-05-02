const passport = require('passport');
const db = require('../utils/db');
// const { SHA3 } = require("sha3");
// const hash = new SHA3(256);

exports.resetAnimals = function(req, res, next) {
  db.Animal.deleteMany({}, function (err) {
    if (err) return handleError(err);
    var Animal1 = new db.Animal({age: 5, name: 'Bart', type: 'cat', owner: 'admin'})
    var Animal2 = new db.Animal({ age: 3, name: 'Lisa', type: 'dog', owner: 'admin' });
    Animal1.save( function(err,data) {
      if (err) return console.error(err);
      Animal2.save( function(err,data2) {
        if (err) return console.error(err);
        res.render('reset', { data: data, data2: data2} );
      })
    });
  });
}




exports.getAnimals = function(req, res) {
  db.Animal.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    res.json(data);
  })
}

exports.getAnimal = (req, res) => {
    db.Animal.findOne({
        _id: req.params.animal_id
    })
    .exec((err, adnimal) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!adnimal) {
            res.status(404).send({ message: "Failed! Animal not found!" });
            return;
        }
        
        return res.status(200).json(adnimal);
    });
};

exports.postAnimal = function(req, res) {
  var animal = new db.Animal(req.body);
  animal.save( function(err,data) {
    if (err) return console.error(err);
    res.json(data);
  });
}

exports.putAnimal = function(req, res) {
  db.Animal.findbyId(req.params.id, function (err, animal) {
    if (err) return console.error(err);
    animal.name = req.body.name;
    animal.age = req.body.age;
    animal.type = req.body.type;
    animal.owner = req.body.owner;
    animal.save( function(err,data) {
      if (err) return console.error(err);
      res.json(data);
    });
  });
}


exports.deleteAnimal =  function(req, res) {
    db.Animal.findByIdAndRemove(req.params.animal_id, function (err, animal) {
    if (err) return console.error(err);
    res.json(animal);
  });
}