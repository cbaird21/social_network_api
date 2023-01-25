
const { User, Thoughts } = require('../models')

module.exports = {
    // GET all users
    async getThought(req, res) {
        await Thoughts.find()
            .then((thought) => res.status(200).json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // GET a thought by id
    async getSingleThought(req, res) {
        await Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    async createThought(req, res) {
        await Thoughts.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id } }).then((user) => {
                    res.json(thought);
                });
            })
            .catch((err) => res.status(500).json(err));
    },
    // UPDATE a thought
    async updateThought(req, res) {
        await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a thought
    async deleteThought(req, res) {
        await Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No thought found with that ID" })
                    : User.findOneAndUpdate({ username: user.username }, { $pull: { thoughts: user._id } })
            )
            .then(() => res.json({ message: "Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    // createReaction
    async createReaction(req, res) {
        await Thoughts.findOneAndUpdate(
            { id: req.params.thoughtId },
            { $push: { reactions: req.body } },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    // delete reaction
    async deleteReaction(req, res) {
        await Thoughts.updateOne(
            { id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    }
}