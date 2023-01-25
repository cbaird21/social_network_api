const router = require('express').Router();


const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// api/users
// Get all and Post
router.route('/').get(getUsers).post(createUser);

// api/users/:userId
// GET one user, PUT(UPDATE), AND DELETE
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// api/user/userId/:friendId 
// POST and DELETE BY ID
router.route('/:userId/friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
