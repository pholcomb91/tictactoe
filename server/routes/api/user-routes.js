
const router = require('express').Router();
const {
 
} = require('../../controllers/user-controller');

// This imports needed middleware
const { authMiddleware } = require('../../utils/auth');

// This places middleware where it's needed for token user verification
router.route('/').post(    ).put(        );

router.route('/  ').post(    );

router.route('/   ').get(authMiddleware,      );

router.route('   ').delete(authMiddleware,     );

module.exports = router;