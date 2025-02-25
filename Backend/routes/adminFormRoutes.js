const express = require('express');
const router = express.Router();
const { verifyToken,verifyUser,requireRole } = require('../middleware/verifyToken');
const adminFormController = require('../controllers/adminFormController');

router.get('/faip-form/all-lecturer/:id',verifyToken,verifyUser,requireRole("admin"), adminFormController.getAllDosenInfo); 
router.get('/faip-form/all-assesor/:id',verifyToken,verifyUser,requireRole("admin","mahasiswa","dosen"), adminFormController.getAllMhsData); 
router.patch('/faip-form/assesor/:id',verifyToken,verifyUser,requireRole("admin"), adminFormController.assignAssesor); 
router.get('/faip-form/form-rule',verifyToken,verifyUser,requireRole("admin","dosen"), adminFormController.getFormRule); 
router.patch('/faip-form/filtering',verifyToken,verifyUser,requireRole("admin"), adminFormController.assignFilterForm); 
router.get('/verif-grade/list',verifyToken,verifyUser,requireRole("admin"), adminFormController.getMhsVerifList); 
router.get('/verif-grade/student-info',verifyToken,verifyUser,requireRole("admin"), adminFormController.getStudentInfo); 
router.get('/verif-grade/grading-info',verifyToken,verifyUser,requireRole("admin"), adminFormController.getDsnGrading); 
router.patch('/verif-grade/grading-info',verifyToken,verifyUser,requireRole("admin"), adminFormController.updateVerifForm); 
router.patch('/verif-grade/submit-grading',verifyToken,verifyUser,requireRole("admin"), adminFormController.verifGradeSubmission); 



module.exports = router;
