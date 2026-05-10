import mongoose from "mongoose";

const staffsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    staff_Id: {
        type: Number,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    phone_Number: {
        type: Number,
        required: true
    },
    profileImage: {
        data: Buffer,
        contentType: String,
    },
},
{
    timestamps: true
});

const Staffs = mongoose.model('staffs', staffsSchema);

export default Staffs;