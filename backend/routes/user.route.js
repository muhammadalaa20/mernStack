// routes/user.route.js

import express from 'express';
import { getUsers, createUser } from '../controllers/user.controller.js';

const router = express.Router();

// Route to get all users
router.get('/', getUsers);

// Route to create a new user
router.post('/', createUser);

export default router;
