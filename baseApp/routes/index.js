const { Router } = require('express');
const checkAuth = require("../middleware/check-auth");
const UsersController = require('../controllers/users');
const PagesController = require('../controllers/pages');

const router = Router();

// Strona główna
router.get('/', PagesController.mainPage);

// wyświetlanie formularza do logowania
router.get('/login', PagesController.loginForm);

// informacje o sesji użytkownika
router.get('/sesja', checkAuth, PagesController.sessionInfo);

// inforamcja o kilku obiektach przechowujących dane zalogowanego użytkownika
router.get('/zalogowany', checkAuth, PagesController.authUserInfo);

// router.get('/notActivated', checkAuth, PagesController.authUserInfo);



// logowanie użytkownika
// poprawne logowanie - przekierowanie na stronę główną
// brak uwierzytelnienia - przekierowanie na strone logowania
router.post('/login', UsersController.loginUser);

// wylogowanie i przekierowanie na stronę główną
router.get('/logout', checkAuth, UsersController.logoutUser);



module.exports = router;
