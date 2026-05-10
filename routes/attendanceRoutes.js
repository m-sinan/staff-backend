import express from 'express'
import Attendance from '../models/Attendance.js'
import Staffs from '../models/Staffs.js'
import protect from '../middleware/authMiddleware.js'    // 👈 ADD THIS

const router = express.Router()

// 1. GET all attendance → protected (owner only)
router.get('/', protect, async (req, res) => {
    try {
        const attendance = await Attendance.find()
        res.json(attendance)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 2. GET attendance by staff_Id → protected (owner only)
router.get('/staff/:staffId', protect, async (req, res) => {
    try {
        const attendance = await Attendance.find({ 
            staff_Id: req.params.staffId 
        })
        if (attendance.length === 0) {
            return res.status(404).json({ message: 'No attendance found for this staff' })
        }
        res.json(attendance)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 3. GET attendance by location → protected (owner only)
router.get('/location/:location', protect, async (req, res) => {
    try {
        const attendance = await Attendance.find({ 
            location: req.params.location 
        })
        if (attendance.length === 0) {
            return res.status(404).json({ message: 'No attendance found for this location' })
        }
        res.json(attendance)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 4. POST submit attendance → PUBLIC (no protect)
router.post('/', async (req, res) => {
    try {
        // Find staff by ID
        const staff = await Staffs.findOne({ staff_Id: req.body.staff_Id })
        if (!staff) {
            return res.status(404).json({ message: 'Staff ID not found' })
        }

        // Auto fill staff_name from database
        const newAttendance = new Attendance({
            staff_name: staff.name,       // 👈 auto filled!
            staff_Id: req.body.staff_Id,
            master: req.body.master,
            location: req.body.location,
            status: 'Present'
        })

        const saved = await newAttendance.save()
        res.status(201).json(saved)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router