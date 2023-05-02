const { Router } = require('express');
const checkAuth = require("../middleware/check-auth");
const signController = require('../controllers/signController');

const router = Router();

// lista wszystkich użytkowników w bazie, dostępna tylko dla zalogowanych
router.get("/upPage", signController.signup_page);    
router.post("/up", signController.signup);    
router.get("/activate/:user_id", signController.activate);    



module.exports = router;