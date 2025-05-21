let users = [];

function userLogin(name, number, email) {
    const user = {
        name: name,
        number: number,
        email: email,
        loginTime: new Date().toLocaleString()
    };

    users.push(user);

    console.log(`✅ User "${name}" logged in.`);
    console.log("👥 All Logged-in Users:");
    console.table(users);
}

userLogin("Alice", "1234567890", "alice@example.com");
userLogin("Bob", "9876543210", "bob@example.com");
userLogin("Charlie", "5556667777", "charlie@example.com");