const { User, Thought } = require('../models')

module.exports = {
    // GET all users
    async getUser(req, res) {
        User.find()
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(500).json(err));
    },
    // GET a user by id
    async getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID." })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a user
    async createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    // UPDATE a user
    async updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) =>
            !user
                ? res.status(404).json({message: "No user found with this ID"})
                :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a user
    async deleteUser(req,res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
        !user
        ? res.status (404).json({ message: "No user found with this ID."})
        // bonus Remove a users associate thoughts when deleted
        : Thought.deleteMany({_id: {$in: user.thoughts}})
        )
        .then(() => res.json({ message: " User and their thoughts have been deleted"}))
        .catch((err) => res.status(500).json(err))
    },
    // add a freiend to a users friend list
    async addFriend(req,res){
        User.findOneAndUpdate(
            {id: req.params.userId},
            {$addtoSet: { friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
        ?res.status(404).json({message: "No user found with this ID"})
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    // delete friend
    async deleteFriend(req, res) {
        User.findOneAndUpdate(
            { id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
}