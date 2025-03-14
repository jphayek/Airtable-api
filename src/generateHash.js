const bcrypt = require('bcryptjs');

const password = 'password123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Mot de passe haché :', hashedPassword);
    }
});