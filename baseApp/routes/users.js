const { Router } = require('express');
const checkAuth = require("../middleware/check-auth");
const UsersController = require('../controllers/users');
const checkActivation = require("../middleware/check-activation");

const router = Router();

// lista wszystkich użytkowników w bazie, dostępna tylko dla zalogowanych
router.get('/', [checkAuth, checkActivation], UsersController.getUsers);

// resetowanie zawartości kolekcji użytkowników
// są tworzeni dwaj użytkownicy: admin i asdf
// z hasłami odpowiednio stud234 i asdf, jak w resetUsers w kontrolerze
router.get('/reset', UsersController.resetUsers);

module.exports = router;
