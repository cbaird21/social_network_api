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
    'I want food, do you?'
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random name
const getRandomUserName = () => `${getRandomArrItem(names)} ${getRandomArrItem(names)}`

// get a random thought
const getRandomThought = () => `${getRandomArrItem(thoughtText)}`