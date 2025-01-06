const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const app = express();
app.use(bodyParser.json());

// إعدادات البريد الإلكتروني
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // ضع بريدك
        pass: 'your-password', // كلمة المرور
    },
});

// نقطة API لإعداد الإشعار
app.post('/set-reminder', (req, res) => {
    const { email, time } = req.body;
    const scheduleTime = new Date(time);

    if (scheduleTime < new Date()) {
        return res.status(400).json({ message: 'Please choose a future time.' });
    }

    schedule.scheduleJob(scheduleTime, () => {
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Task Reminder',
            text: 'This is your reminder for the scheduled task!',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

    res.json({ message: 'Reminder set successfully!' });
});

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
