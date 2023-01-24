const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { getRandomUserName, getRandomReaction, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    const users = [];


    for (let i = 0; i < 5; i++) {
        const username = getRandomUserName();
        const newUser = { username, email: username + "@fakemail.com" };
        users.push(newUser);
    }

    const thoughts = [];
    for (let i = 0; i < 5; i++) {
        const thoughtContent = getRandomThought();
        const newThought = { thoughtText: thoughtContent };
        thoughts.push(newThought);
    }
    await User.collection.insertMany(users);
    await Thoughts.collection.insertMany(thoughts);

    // loop through the saved thought, for each video we need to generate a video response and insert the video responses
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});