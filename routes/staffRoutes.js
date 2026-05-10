import express from 'express'
import multer from 'multer'
import Staffs from '../models/Staffs.js'
import protect from '../middleware/authMiddleware.js'
import Attendance from '../models/Attendance.js'

const router = express.Router()

// Multer setup - store in memory
const storage = multer.memoryStorage()
const upload = multer({ storage })

// GET all staffs
router.get('/', protect, async (req, res) => {
    try {
        const staffs = await Staffs.find()
        res.json(staffs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET single staff
router.get('/:id', protect, async (req, res) => {
    try {
        const staff = await Staffs.findOne({ staff_Id: req.params.id })
        if (!staff) return res.status(404).json({ message: 'Staff not found' })
        res.json(staff)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST create staff
router.post('/', protect, upload.single('photo'), async (req, res) => {
    try {
        const staffData = { ...req.body }
        if (req.file) {
            staffData.profileImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
        const newStaff = new Staffs(staffData)
        const savedStaff = await newStaff.save()
        res.status(201).json(savedStaff)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// PUT update staff
router.put('/:id', protect, upload.single('photo'), async (req, res) => {
    try {
        const updateData = { ...req.body }
        if (req.file) {
            updateData.profileImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
        const updatedStaff = await Staffs.findOneAndUpdate(
            { staff_Id: req.params.id },
            updateData,
            { new: true }
        )
        if (!updatedStaff) return res.status(404).json({ message: 'Staff not found' })
        res.json(updatedStaff)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE staff
router.delete('/:id', protect, async (req, res) => {
    try {
        // 1. Find and delete the staff
        const deletedStaff = await Staffs.findOneAndDelete({ 
            staff_Id: req.params.id 
        })

        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff not found' })
        }

        // 2. Delete all attendance records for this staff
        await Attendance.deleteMany({ staff_Id: req.params.id })

        res.json({ 
            message: 'Staff and all related attendance deleted successfully' 
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router