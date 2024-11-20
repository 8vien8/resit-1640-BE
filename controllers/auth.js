const jwt = require('jsonwebtoken');
const User = require('../models/users');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const transporter = require('../config/nodemailer')

exports.register = async (req, res) => {
    try {
        const { username, email, roleID, facultyID } = req.body;
        const defaultRoleID = roleID || "64f000000000000000000015";
        const defaultFacultyID = facultyID || "672f5c343c9809b85f68afd0"
        const password = crypto.randomBytes(10).toString('hex');

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            username,
            passwordHash: password,
            email,
            roleID: defaultRoleID,
            facultyID: defaultFacultyID,
        });

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to COMP_1640 - Your Account Details',
            text: `--------------------------------Hello ${username}---------------------------\n
                   Welcome to COMP_1640! Your account has been created successfully.\n
                   Here are your login credentials:\n
                   Username: ${username}\n
                   Password: ${password}\n
                   Please make sure to change your password after logging in for the first time.\n
                   Best Regards,\n
                   COMP_1640 Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ', info.response);
            }
        });

        const payload = {
            user: {
                id: user.id,
                roleID: user.roleID
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token, message: 'User registered and email sent with password' });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials (password)' });
        }

        const payload = {
            user: {
                id: user.id,
                roleID: user.roleID
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash').populate('roleID').populate('facultyID');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not exist !' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;

        console.log(user)
        console.log(user.resetPasswordToken);
        console.log(user.resetPasswordExpires);

        await user.save();

        const resetURL = `${process.env.BACK_END_URL}/api/auth/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset - Your COMP_1640 Account',
            text: `Hello,\n\n
                   You are receiving this email because you (or someone else) requested a password reset for your COMP_1640 account.\n\n
                   Please click on the following link to reset your password:\n
                   ${resetURL}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n\n
                   Best Regards,\n
                   COMP_1640`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ', info.response);
                res.json({ message: 'Email sent with reset password link' });
            }
        });

    } catch (err) {
        console.error('Error resetting password:', err.message);
        res.status(500).send('Server Error');
    }
}

exports.resetPassword = async (req, res) => {
    const redirectURL = `${process.env.FRONT_END_URL}/reset-password-success`;
    try {
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired password reset token' });
        }

        const newPassword = crypto.randomBytes(8).toString('hex');
        console.log(newPassword);

        user.passwordHash = newPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your password has been reset',
            text: `Hello ${user.username},\n\n
            Your password has been successfully reset. 
            Here is your new password: ${newPassword}\n\n
            Please change your password after logging in for security purposes.\n\n
            Best Regards,\n
            COMP_1640 Team`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ message: 'Password reset but email sending failed' });
            } else {
                res.redirect(redirectURL);
            }
        });

    } catch (err) {
        console.error('Error resetting password:', err.message);
        res.status(500).send('Server Error');
    }
};