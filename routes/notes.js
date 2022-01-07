const express = require('express');
const Joi = require('joi');
const { auth } = require('../middleware/auth')
const { User } = require('../model/user')
const validateId = require('../middleware/validateObjId')
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })
    if (!user) return res.status(404).send("invalid user.")
    res.send(user.notes)
})

router.post('/add', auth, async (req, res) => {
    const note = req.body;
    const error = validateNote(note);
    if (error) return res.status(400).send(error.details[0].message)
    const result = await User.findOneAndUpdate({ _id: req.user._id }, {
        $push: { notes: note }
    },
        { new: true })
    const addedNote = result.notes[result.notes.length - 1]
    if (result) return res.send(addedNote)
    return res.status(404).send('user not available')
})

router.put('/edit/:id', [auth, validateId], async (req, res) => {
    const note = req.body;
    const error = validateNote(note);
    if (error) return res.status(400).send(error.details[0].message)

    const result = await User.updateOne({ _id: req.user._id, "notes._id": req.params.id }, {
        $set: {
            "notes.$.title": note.title,
            "notes.$.text": note.text
        }
    })
    if (result.modifiedCount > 0 || result.matchedCount == 1) return res.send('updated successfully')
    return res.status(404).send('note not available')
})

router.delete('/delete/:id', [auth, validateId], async (req, res) => {
    const result = await User.updateOne({ _id: req.user._id }, {
        $pull: {
            notes: { _id: req.params.id }
        }
    })
    if (result.modifiedCount > 0) return res.send('deleted successfully')
    return res.status(404).send('note not available')
})


const validateNote = (note) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(255),
        text: Joi.string().min(1).max(1024)
    })
    return schema.validate(note).error;
}

exports.notes = router



