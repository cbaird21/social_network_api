const router = require('express').Router();


const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// api/users
// Get all and Post
router.route('/').get(getUser).post(createUser);

// api/users/:userId
// GET one user, PUT(UPDATE), AND DELETE
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// api/user/LuserId/friends:friendId 
// POST and DELETE BY ID
router.route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);
