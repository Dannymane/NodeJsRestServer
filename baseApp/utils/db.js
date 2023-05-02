const mongoose = require('mongoose');
const { SHA3 } = require("sha3");
const hash = new SHA3(256);

mongoose.connect('mongodb://localhost/baseApp', function(err) {
    if(err) {
        console.log('błąd połączenia', err);
    } else {
        console.log('połączenie udane');
    }
});

// schemat dokumentu opisującego użytkowników w kolekcji users
var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true},
	password: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    activated: { type: Boolean, default: false}
});

// walidacja poprawności hasła
userSchema.methods.validPassword = function(pass) {
  hash.reset();
  return hash.update(pass).digest('hex')==this.password;
};

// schemat dokumentu opisującego zierząt w kolekcji animals
var animalSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true},
    age: { type: Number, required: true},
    type: { type: String, required: true},
    owner: { type: String, required: true}
});

module.exports = {
    User: mongoose.model('user', userSchema),
    Animal: mongoose.model('animal', animalSchema)
};
