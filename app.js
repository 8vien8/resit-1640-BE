const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
//Router
const usersRoutes = require('./routes/users');
const termsConditionsRoutes = require('./routes/termConditions');
const settingsRoutes = require('./routes/systemSettings');
const statisticsRoutes = require('./routes/statistics');
const rolesRoutes = require('./routes/roles');
const filesRoutes = require('./routes/files');
const facultiesRoutes = require('./routes/faculties');
const contributionStatusRoutes = require('./routes/contributionStatus');
const contributionsRoutes = require('./routes/contributions');
const commentsRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
const topicsRoutes = require('./routes/topics');
const publicContributionRoutes = require('./routes/publicContribution');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads')); // Serve static files from uploads directory

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Route for landing page
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/faculties', facultiesRoutes);
app.use('/api/contributions', contributionsRoutes);
app.use('/api/contribution-status', contributionStatusRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/terms-and-conditions', termsConditionsRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/public-contributions', publicContributionRoutes);

// Catch-all route for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
