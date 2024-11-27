const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../src/model/userModel');


const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ name, email, password: hashedPassword });
    if (!user) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
    
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await userModel.findUser(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' }); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' }); 
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error:',err,
    });
  }
};


module.exports = {signUp, login};