const { connectToDb } = require('./db');
const User = require('./models/User').User;
const { hashPassword } = require('./models/User');

(async () => {
  const email = 'test@admin.com';
  const password = 'test';
  const role = 'admin'; 
  const db = await connectToDb();
  const userModel = new User(db);

  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    console.log('Email is already in use');
    process.exit(1);
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    email,
    password: hashedPassword,
    role, 
  };
  const createdUser = await userModel.createUser(newUser, role);

  console.log('User created:', createdUser);
  process.exit(0);
})();
