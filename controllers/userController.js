const { User, Thought } = require('../models')

module.exports = {

    async getUsers(req, res) {
        await User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    async getSingleUser(req, res) {
        await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID" }) : res.json(user)))
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    async createUser(req, res) {
        await User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    // GET all users
    // async getUser(req, res) {
    //     try {
    //         const users = await User.find({})
    //             .populate('friends')
    //             .populate('thoughts');

    //         res.status(200).json(users)
    //     }
    //     catch (error) {
    //         res.status(500).json(error)
    //     }
    // // },
    // // GET a user by id
    // async getSingleUser(req, res) {
    //     await User.findOne({ _id: req.params.userId })
    //         .populate('thoughts')
    //         .populate('friends')
    //         .select('-__v')
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: "No user found with that ID." })
    //                 : res.status(200).json(user)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },
    // // Create a user
    // async createUser(req, res) {
    //     await User.create(req.body)
    //         .then((user) => res.json(user))
    //         .catch((err) => {
    //             console.log(err);
    //             return res.status(500).json(err);
    //         })
    // },
    // UPDATE a user
    async updateUser(req, res) {
        await User.updateOne(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this ID" })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a user
    async deleteUser(req, res) {
        await User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this ID." })
                    // bonus Remove a users associate thoughts when deleted
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: " User and their thoughts have been deleted" }))
            .catch((err) => res.status(500).json(err))
    },
    // add a freiend to a users friend list
    async addFriend(req, res) {
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },


        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    // delete friend
    async deleteFriend(req, res) {
        await User.updateOne(
            { id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }

        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
}