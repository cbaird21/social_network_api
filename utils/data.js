const names = [
    'Holly',
    'Dylan',
    'Cali',
    'Andy',
    'Jordan',
    'Joey',
    'Hunter',
    'Taylor',
    'Deanna',
    'Kevin',
    'Chandler'
];

const last = [
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
]

const reactionBody = [
    'No I dont wanna',
    'Of course I would love to go',
    'Who would want to do that',
    'Yes',
    'No'
];

const thoughtText = [
    'Would you want to go with me?',
    'Should I go to the store?',
    'Do you think she would go?',
    'I want food, do you?',
    'I am hungry',
    'I am happy',
    'I am sad'
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random name
const getRandomUserName = () => `${getRandomArrItem(names)} ${getRandomArrItem(last)}`

// get a random reaction now
const getRandomReaction = () => `${getRandomArrItem(reactionBody)}`

// get a random thought
const getRandomThought = () => `${getRandomArrItem(thoughtText)}`

module.exports = { getRandomUserName, getRandomReaction, getRandomThought }