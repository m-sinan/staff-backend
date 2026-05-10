import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const protect = (req, res, next) => {
    try {
        // 1. Get token from request header
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, access denied' })
        }

        // 2. Extract the token (remove "Bearer " prefix)
        const token = authHeader.split(' ')[1]

        // 3. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 4. Attach owner info to request
        req.owner = decoded

        // 5. Move to next step
        next()

    } catch (error) {
        res.status(401).json({ message: 'Invalid token, access denied' })
    }
}

export default protect