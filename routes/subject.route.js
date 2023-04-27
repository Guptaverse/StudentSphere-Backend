const express = require('express');
const router = express.Router();

const { getSubjects, getSubjectByName, addSubject, getSubjectByNameOne, addArticlesToGivenSubject } = require('../controllers/subject.controller');

router.get('/', getSubjects);

router.post('/search', getSubjectByName);

router.post('/searchbyname/', getSubjectByNameOne);

router.post('/', addSubject);

router.post('/article/add', addArticlesToGivenSubject)

module.exports = router;
