var express = require('express');
var router = express.Router();
const { isAuth } = require('../middleware/isAuth');
const db = require('../models');
const ParticipantService = require('../services/ParticipantService');
const participantService = new ParticipantService(db);

/* GET home page. */
router.get('/', isAuth, async (req, res, next) => {
    try {
        const participants = await participantService.getParticipants();
        if (!participants) {
            return res.status(404).send({ message: 'No participants found' });
        }
        res.status(200).send({
        message: 'Participants successfully retrieved',
        data: participants
    });
    } catch (err) {
    res.status(500).json({ error: err.message })
}
});

router.get('/details', isAuth, async (req, res, next) => {
    try {
        const participantDetails = await participantService.getParticipantsDetails();
        if (!participantDetails) {
            return res.status(404).send({ message: 'No participants found' });
        }
        res.status(200).send({
            message: 'Participants details successfully retrieved',
            data: participantDetails
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get('/details/:email', isAuth, async (req, res, next) => {
    try {
        const email = req.params;
        const emailDetails = await participantService.getParticipantEmail(email);
        if (!emailDetails) {
            return res.status(404).send({ message: 'Email not found' });
        }
        res.status(200).send({
            message: 'Participants details successfully retrieved',
            data: emailDetails
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get('/work/:email', isAuth, async (req, res, next) => {
    try {
        const email = req.params;
        const emailWork = await participantService.getWorkEmail(email);
        if (!emailWork) {
            return res.status(404).send({ message: 'Email not found' });
        }
        res.status(200).send({
            message: 'Participants work details successfully retrieved',
            data: emailWork
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get('/home/:email', isAuth, async (req, res, next) => {
    try {
        const email = req.params;
        const emailHome = await participantService.getHomeEmail(email);
        if (!emailHome) {
            return res.status(404).send({ message: 'Email not found' });
        }
        res.status(200).send({
            message: 'Participants home details successfully retrieved',
            data: emailHome
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post('/add', isAuth, async (req, res, next) => {
  try {
    const { Email, FirstName, LastName, Dob, CompanyName, Salary, Currency, Country, City } = req.body;

    const newParticipant = await participantService.create(Email, FirstName, LastName, Dob, CompanyName, Salary, Currency, Country, City);
      res.status(200).send({
        message: 'Participant created successfully',
        data: newParticipant
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:email', isAuth, async (req, res, next) => {
   try {
        const email = req.params;
        const emailDelete = await participantService.deleteEmail(email);

        res.status(200).send({
            message: 'Participant successfully deleted'
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.put('/:email', isAuth, async (req, res, next) => {
   try {
        const { email } = req.params; // or req.body, or req.user
        const updateData = req.body;
        const updatedParticipant = await participantService.update(email, updateData);

        res.status(200).send({
            message: 'Participant successfully updated'
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router;