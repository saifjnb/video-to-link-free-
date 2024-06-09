const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد multer للتعامل مع رفع الملفات
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// إنشاء مجلد 'uploads' إذا لم يكن موجودًا
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// تقديم ملفات HTML
app.use(express.static('public'));

// معالجة رفع الفيديو
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const videoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, url: videoUrl });
});

// تقديم مجلد 'uploads'
app.use('/uploads', express.static('uploads'));

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});