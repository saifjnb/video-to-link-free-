
// استجابة طلب الحصول على المستخدمين
exports.getUsers = (req, res) => {
    res.status(200).json({ message: 'قائمة المستخدمين' });
};

// استجابة طلب إضافة مستخدم جديد
exports.createUser = (req, res) => {
    res.status(201).json({ message: 'تم إضافة المستخدم بنجاح' });
};
