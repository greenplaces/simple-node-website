const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Function to read all doctors from the JSON file
function getAllDoctors() {
    const data = fs.readFileSync(path.join(__dirname, 'doctor.json'), 'utf8');
    return JSON.parse(data);
}

// Function to get a random doctor name
function getRandomDoctor() {
    const doctors = getAllDoctors();
    const randomIndex = Math.floor(Math.random() * doctors.length);
    return doctors[randomIndex];
}

// Route to get all doctor names
app.get('/doctors', (req, res) => {
    const doctors = getAllDoctors();
    res.json(doctors);
});

// Route to get a doctor by ID
app.get('/doctor/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const doctors = getAllDoctors();
    const doctor = doctors.find(doc => doc.id === id);
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ error: 'Doctor not found' });
    }
});

// Route to get a random doctor name
app.get('/doctor', (req, res) => {
    const randomDoctor = getRandomDoctor();
    res.json(randomDoctor);
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.render('home');
});

// Route for the abort page
app.get('/abort', (req, res) => {
    res.render('abort');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
