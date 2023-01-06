const router = require('express').Router();


const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// localhost:3001/api/thoughts
// Get all and Post
router.route('/').get(getThought).post(createThought);

// localhost:3001/api/thoughts/:thoughtId
// GET one thought, PUT(UPDATE), AND DELETE
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
// POST and DELETE BY ID
router.route('/:thoughtId/reactions/:reactionsId')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;