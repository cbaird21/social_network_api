
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
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { runValidators: true, new: true }
                )
            })
            .then((thought) =>
                !thought ? res.status(404).json({ message: "no user found with this id" })
                    : res.status(200).json(thought)
            )
            .catch((err) => {
                return res.status(500).json(err);
            })

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
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID." })
                    : res.status(200).json(thought)
            )
            .then((user) =>
                !user
                    ? res.status(404).son({ message: "Thought deleted but user not found" })
                    : res.status(200).json({ message: "The thought was succesfully deleted." })
            )
            .catch((err) => res.status(500).json(err))
    },
    // createReaction
    async createReaction(req, res) {
        await Thoughts.updateOne(
            { id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
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
            { $pull: { reactions: req.params.reactionId } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    }
}