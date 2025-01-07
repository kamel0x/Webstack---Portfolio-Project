// استيراد المكتبات الضرورية
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// تقديم ملفات HTML، CSS، JS من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// إضافة أي مسارات أخرى تحتاجها هنا

// تشغيل السيرفر على المنفذ المحدد
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
