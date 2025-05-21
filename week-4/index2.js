const names = ["David", "Emma", "Olivia", "Liam", "Sophia"];
const numbers = ["1112223333", "4445556666", "7778889999"];
const emails = ["david@email.com", "emma@email.com", "olivia@email.com"];

let users = [];

function userLogin(name, number, email) {
    let user = {
        name: name,
        number: number,
        email: email,
        loginTime: new Date().toLocaleString()
    }

    users.push(user);

    console.log(`User ${name} logged in.`);
    console.log('All Logged-in Users:');
    console.table(users);

}

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandom() {
    const name = getRandom(names);
    const number = getRandom(numbers);
    const email = getRandom(emails);

    userLogin(name, number, email);
}

setInterval(pickRandom, 3000);