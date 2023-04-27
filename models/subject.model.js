const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        unique: true,
    },
    articles: [{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }, 
        createdAt: {
            type: Date,
            default: Date.now
        },
    }],
    pdf: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;