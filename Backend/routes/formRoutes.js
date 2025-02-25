const express = require('express');
const router = express.Router();
const { verifyToken,verifyUser,requireRole } = require('../middleware/verifyToken');
const formController = require('../controllers/formController');

router.get('/mhs',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.findGradeFormStudent); 
router.post('/mhs',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.newGradeFormStudent); //not final
router.patch('/mhs',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.updateGradeFormStudent); 
router.patch('/mhs/reset-form',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.resetGradeFormStudent); 
router.patch('/mhs/restart-form',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.restartGradeFormStudent); 
router.patch('/mhs/restart-form/demo',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.resetDemoFormStudent); 
router.patch('/mhs/export-form',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.startAutomation); 
router.patch('/mhs/submit-form',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.studentSubmission); 
router.delete('/mhs',verifyToken,verifyUser,requireRole("admin","mahasiswa"), formController.deleteGradeFormStudent); 
router.get('/dsn',verifyToken,verifyUser,requireRole("admin","dosen"), formController.studentFaipGradingList); //not final
router.get('/dsn/student-info',verifyToken,verifyUser,requireRole("admin","dosen"), formController.getStudentInfo); //not final
router.get('/dsn/form-filter',verifyToken,verifyUser,requireRole("admin","dosen"), formController.getFormFilter); //not final
router.patch('/dsn/update-nilai',verifyToken,verifyUser,requireRole("admin","dosen"), formController.updateGradeFormLecturer); //not final
router.get('/dsn/update-nilai',verifyToken,verifyUser,requireRole("admin","dosen"), formController.getStudentGradeInfo); //not final
router.get('/dsn/claim-mhs',verifyToken,verifyUser,requireRole("admin","dosen"), formController.getStudentFormClaim); //not final
router.patch('/dsn/submit-nilai',verifyToken,verifyUser,requireRole("admin","dosen"), formController.lecturerSubmission); //not final


module.exports = router;
