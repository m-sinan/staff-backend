import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// POST login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Check email and password against .env values
        if (
            email !== process.env.OWNER_EMAIL ||
            password !== process.env.OWNER_PASSWORD
        ) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // If correct → generate JWT token
        const token = jwt.sign(
            { email: email, role: 'owner' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({ 
            message: 'Login successful',
            token: token
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router