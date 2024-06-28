import multer from 'multer';
import CredenceData from '../models/dataModel.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
    }
});
const upload = multer({ storage }).single('img');


export const getData = async (req, res) => {
    try {
        const data = await CredenceData.find({});
        res.status(200).json({
            success: true,
            data,
            message: 'Successfully fetched!',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addData = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });
        try {
            const { name, summary } = req.body;
            const img = req.file.path;
            const cateData = new CredenceData({ name, img, summary });
            const saveData = await cateData.save();
            res.status(201).json({
                success: true,
                data: saveData,
                message: 'Data successfully inserted!',
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

export const updateData = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });
        try {
            const id = req.params.id;
            const { name, summary } = req.body;
            const img = req.file ? req.file.path : undefined;
            const updateFields = { name, summary };
            if (img) {
                updateFields.img = img;
            }
            const updateData = await CredenceData.updateOne({ _id: id }, { $set: updateFields });
            res.status(200).json({
                success: true,
                data: updateData,
                message: 'Updated successfully',
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

export const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await CredenceData.deleteOne({ _id: id });
        if (data.acknowledged) {
            res.status(200).json({
                success: true,
                message: 'Deleted successfully',
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


