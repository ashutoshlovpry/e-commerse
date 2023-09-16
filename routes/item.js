const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

router.post('/items', itemController.get_items);
router.post('/items',itemController.post_item);
router.put('/items/:id',itemController.update_item);
router.delete('/items/:id',itemController.delete_item);
router.post('/search',itemController.seach_item)
router.get('/all_items',itemController.get_all_items)
module.exports = router;