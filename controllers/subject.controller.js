const Subject = require('../models/subject.model');
const { uploadToCloud } = require('../helper/upload');

const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({});
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSubjectByName = async (req, res) => {
    const { name } = req.body
    const regex = new RegExp(name, 'i');
    try {
        const subjects = await Subject.find({
            subjectName: { $regex: regex }
        });
        res.status(200).json({
            message: "Subject found",
            data: subjects
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error finding subject',
            error: error.message
        });
    }
}

const getSubjectByNameOne = async (req, res) => {
    const { name } = req.body

    try {
        const subjects = await Subject.find({
            subjectName: name
        });
        res.status(200).json({
            message: "Subject found",
            data: subjects
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error finding subject',
            error: error.message
        });
    }
}

const addSubject = async (req, res) => {
    const { subjectName, articles } = req.body;
    try {
        const file = await uploadToCloud(req.files.pdf.data);
        const subject = await Subject.create({ subjectName, articles, pdf: file.secure_url });
        res.status(201).json({
            message: "Subject added successfully",
            data: subject
        })
    }
    catch (error) {
        console.log(error),
            res.status(500).json({
                message: 'Error adding subject',
                error: error.message
            });
    }
}


const addArticlesToGivenSubject = async (req, res) => {
    const { subjectName, title, description } = req.body;

    try {
        const filter = { subjectName: subjectName };
        const update = {
            $push: {
                articles: {
                    title: title,
                    description: description
                }
            }
        };
        const result = await Subject.updateOne(filter, update);
        res.status(201).json({
            message: "Article added successfully",
            data: result
        })
    } catch {
        res.status(500).json({
            message: 'Error adding article',
            error: error.message
        });
    }
}

module.exports = { getSubjects, getSubjectByName, addSubject, getSubjectByNameOne, addArticlesToGivenSubject };