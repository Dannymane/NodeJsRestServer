const { Router } = require('express');
// const checkAuth = require("../middleware/check-auth");
const checkToken = require("../middleware/check-token"); //
const AnimalsController = require('../controllers/AnimalsController');
const checkActivation = require("../middleware/check-activation");

const router = Router();

// router.get('/api/zad2/number_of_groups', controller.api_number_of_groups);
router.get('/reset', AnimalsController.resetAnimals);

router.get("/", [checkActivation, checkToken], AnimalsController.getAnimals);
// router.get('/api/zad2/groups', [checkActivation, checkToken], AnimalsController.api_groups);
router.get('/:animal_id', [checkActivation, checkToken], AnimalsController.getAnimal);

router.put('/:animal_id', [checkActivation, checkToken], AnimalsController.putAnimal);
router.post('/', [checkActivation, checkToken], AnimalsController.postAnimal);
router.delete('/:animal_id', [checkActivation, checkToken], AnimalsController.deleteAnimal);


// router.put('/api/zad2/update_group/:group_id', [checkActivation, checkToken], AnimalsController.api_update_group);
// router.get('/zad10/remove_group/:group_id', [checkActivation, checkToken], AnimalsController.remove_group);
// router.delete('/api/zad2/remove_group/:group_id', [checkActivation, checkToken], AnimalsController.api_remove_group);
// router.get("/add_group", [checkActivation, checkToken], AnimalsController.add_group_page);
// router.post('/zad10/add_group', [checkActivation, checkToken], AnimalsController.add_group);
// router.post('/api/zad2/add_group', [checkActivation, checkToken], AnimalsController.api_add_group);

module.exports = router;
