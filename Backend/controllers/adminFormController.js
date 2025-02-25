const { connectMongoDB } = require('../connections/mongodb');
require('dotenv').config();
const { nanoid } = require('nanoid');


const getAllDosenInfo = async (req, res) => {//get id and name not username
    const adminId = req.params.id;
    const db = await connectMongoDB();
    try {
        console.log( "[getAllDosenInfo]user id: " + adminId)
        const userProfile = db.collection('users');
        const query = { role:"dosen" };
        const options = {
        projection: { 
            _id: 0, nomer_induk: 1,nama:1 },
        };

        const existingProfile = await userProfile.find(query,options).toArray();

        if (!existingProfile) {
            return res.status(404).json({ message: 'User data not exist!' });
        }
        res.status(201).json({data:  existingProfile
        ,message: 'User data found' });
    } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
    }
};

// GET
const getAllMhsData = async (req, res) => {//get id and name from object or array
    const adminId = req.params.id;
    const db = await connectMongoDB();
    try {
        console.log( "[getAllMhsData]user id: " + adminId)
        const mhsFormAssesor = db.collection('form_penilaian');
        const query = { 
            status: {
                $regex: /^111-[2-9]/ // matches any number from 2 and above
            }
        };
        const options = {
        projection: { 
            _id: 0, student_id:1, student_name:1, status_assesor:1, dosen_penilai_faip:1 },
        };

        const existingData = await mhsFormAssesor.find(query,options).toArray();

        if (!existingData) {
        return res.status(404).json({ message: 'User data not exist!' });
        }
        res.status(201).json({data:  existingData
        ,message: 'User data found' });
    } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
    }
};

//PATCH
const assignAssesor = async (req, res) => {
    const adminId = req.params.id;
    const updatedFormData = req.body;
    const db = await connectMongoDB();
    const currentDate = new Date(); 

    try {
        const assesorProfile = db.collection('form_penilaian');
        const query = { "student_id": updatedFormData.studentId};

        const updatedProfile = await assesorProfile.updateOne(query,{ $set: 
            { 
                "status_assesor": "113-1",
                "dosen_penilai_faip": updatedFormData.assignedAssesor
            } 
        });
        console.log(`${updatedProfile.modifiedCount} document(s) was/were updated.`);

        const formNilaiDosen = db.collection('form_penilaian_dosen');
        const daftarMhs = db.collection('users');
        const infoMhs = await daftarMhs.findOne({ "nomer_induk": updatedFormData.studentId },{projection:{_id:0,nomer_induk:1,nama:1,angkatan:1}});
        const infoDsn = await daftarMhs.find({ "nomer_induk":  { $in: updatedFormData.assignedAssesor} },{projection:{_id:0,nomer_induk:1,nama:1}}).toArray();
        console.log("[infoDsn] = "+ infoDsn )
        const prefix = 'formD-'; 

        const prefixVerif = 'formA-';         
        const formNilaiVerif = db.collection('form_penilaian_verif');
        // const pidDosen = `${prefix}${nanoid()}`; //need 3

        const formData = {
            pid: `${prefixVerif}${nanoid()}`,
            id_verif: adminId,
            info_mhs: infoMhs,    //perlu tamabahin isinya
            nilai_Verif_kode_etik: {},
            nilai_Verif_profesionalisme: {},
            nilai_Verif_k3lh: {},
            nilai_Verif_seminar: {},
            nilai_Verif_penulisan_proposal_studi_kasus: {},
            nilai_Verif_manajemen_praktik: {},
            nilai_Verif_praktik_keinsinyuran: {},
            nilai_Verif_studi_kasus: {},
            last_updated: currentDate,
            last_change: 'BARU',
            status: '114-0'     
    
          }
          const insertedForm = await formNilaiVerif.insertOne( formData );
          console.log(`${insertedForm.modifiedCount} document(s) was/were submitted.`);

  
        if (infoDsn) {
          const separateList = infoDsn.map((item) => {
            return {
              pid: `${prefix}${nanoid()}`,//random nano id
              id_dosen: item.nomer_induk,
              dosen_name: item.nama,
              info_mhs: infoMhs,    //perlu tamabahin isinya
              mk_profesionalisme: {},
              mk_kode_etik: {},
              mk_k3lh: {},
              mk_seminar: {},
              mk_penulisan_proposal_studi_kasus: {},
              mk_manajemen_praktik: {},
              mk_praktik_keinsinyuran: {},
              mk_studi_kasus: {},
              last_updated: currentDate,
              last_change: 'BARU',
              status: '112-1'     
            };
          });
        
          // Insert each separated list back into the database
          const insertMultipleList = await formNilaiDosen.insertMany(separateList);
          console.log(`${insertMultipleList.modifiedCount} document(s) was/were submitted.`);
        } else {
          console.log("No list found or list_one is empty.");
        }
        res.status(200).json({message: 'Data updated succesfully' });
    } catch (error) {
        res.status(500).json({ error: 'error while updating data' });
    }
};

// GET
const getFormRule = async (req, res) => {
    const userId = req.query.uid;//dr jwt token
    const formType = req.query.ft;    
    const db = await connectMongoDB();
    let existingFilter;

    try {
        console.log( "[getFormRule]user id: " + userId)
        const filterPenilaian = db.collection('filter_penilaian');
        const query = {
            "id_filter" : "001"
        };
        if (formType === "profesionalisme"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_profesionalisme:1}});
        }else if (formType === "kode-etik"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_kode_etik:1}});
        }else if (formType === "k3lh"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_k3lh:1}});
        }else if (formType === "seminar"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_seminar:1}});
        }else if (formType === "penulisan-proposal-sk"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_penulisan_proposal_studi_kasus:1}});
        }else if (formType === "manajemen-praktik"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_manajemen_praktik:1}});
        }else if (formType === "praktik-keinsinyuran"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_praktik_keinsinyuran:1}});
        }else if (formType === "studi-kasus"){
            existingFilter = await filterPenilaian.findOne(query,{projection:{_id:0,mk_studi_kasus:1}});
        }else if (formType === "all"){
            existingFilter = await filterPenilaian.findOne(query);
        }else {
            // Handle unknown formType
            throw new Error("Invalid formType");
        }

        if (!existingFilter) {
        return res.status(404).json({ message: 'Filter data not exist!' });
        }
        res.status(201).json({data:  existingFilter
        ,message: 'User data found' });
    } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
    }

};

// PATCH
const assignFilterForm = async (req, res) => {
    const adminId = req.query.uid;
    const formType = req.query.ft;
    const updatedFilterData = req.body;
    const db = await connectMongoDB();
    let updatedFilter;
    try {
        const assesorProfile = db.collection('filter_penilaian');
        const query = {
            "id_filter" : "001"
        };
        if (formType === "profesionalisme"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_profesionalisme": updatedFilterData } });
        }else if (formType === "kode-etik"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_kode_etik": updatedFilterData } });
        }else if (formType === "k3lh"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_k3lh": updatedFilterData } });
        }else if (formType === "seminar"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_seminar": updatedFilterData } });
        }else if (formType === "penulisan-proposal-sk"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_penulisan_proposal_studi_kasus": updatedFilterData } });
        }else if (formType === "manajemen-praktik"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_manajemen_praktik": updatedFilterData } });
        }else if (formType === "praktik-keinsinyuran"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_praktik_keinsinyuran": updatedFilterData } });
        }else if (formType === "studi-kasus"){
            updatedFilter = await assesorProfile.updateOne(query,{ $set: { "mk_studi_kasus": updatedFilterData } });
        }else {
            // Handle unknown formType
            throw new Error("Invalid formType");
        }
        
        console.log(`${updatedFilter.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({message: 'Data updated succesfully' });
    } catch (error) {
        res.status(500).json({ error: 'error while updating data' });
    }

};

// GET
const getVerifMhs = async (req, res) => {
    const adminId = req.query.uid;
    const db = await connectMongoDB();

    try {
        console.log( "lect. id: " + lecturerId)
        const formCollection = db.collection('form_penilaian_dosen');

        const studentList = await formCollection.find({ },{projection:{_id:0,info_mhs:1,status:1}}).toArray();
        
        
        if (!studentList) {
        return res.status(404).json({ message: 'Student list not exist' });
        }

        const mergedData = studentList.reduce((acc, item) => {
            const infoId = item.info_mhs.nomer_induk;
            const name = item.info_mhs.nama;
                
                // If the key for `infoId` doesn't exist, initialize with `name` and empty `lecturer_info` array
            if (!acc[infoId]) {
                acc[infoId] = {
                name: name,
                lecturer_info: []
                };
            }
            
            // Push the current { id_user, status } to the `lecturer_info` array for this `infoId`
            acc[infoId].lecturer_info.push({
                id_dosen: item.id_dosen,
                // lecturer_name: item.lecturer_name,
                status: item.status
            });
                
            return acc;
        }, {});
        
        res.status(201).json({data:  mergedData
        ,message: 'Grade form found' });
    } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
    }

};
// GET
const getVerifDsn = async (req, res) => {
    const adminId = req.query.uid;//dr jwt token
    const studentId = req.query.sid;//dr jwt token
    const formType = req.query.ft;    
    const db = await connectMongoDB();
    let existingMhsDsn;

    try {
        console.log( "[getFormRule]user id: " + userId)
        const mhsDsnData = db.collection('form_penilaian_dosen');
        const query = {
            "info_mhs" : {"nomer_induk": studentId}
        };

        if (formType === "profesionalisme"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_profesionalisme:1}}).toArray();
        }else if (formType === "kode-etik"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_kode_etik:1}}).toArray();
        }else if (formType === "k3lh"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_k3lh:1}}).toArray();
        }else if (formType === "seminar"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_seminar:1}}).toArray();
        }else if (formType === "penulisan-proposal-sk"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_penulisan_proposal_studi_kasus:1}}).toArray();
        }else if (formType === "manajemen-praktik"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_manajemen_praktik:1}}).toArray();
        }else if (formType === "praktik-keinsinyuran"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_praktik_keinsinyuran:1}}).toArray();
        }else if (formType === "studi-kasus"){
            existingMhsDsn = await mhsDsnData.find(query,{projection:{_id:0,id_dosen:1,info_mhs:1,status:1,mk_studi_kasus:1}}).toArray();
        }else if (formType === "all"){
            existingMhsDsn = await mhsDsnData.find(query);
        }else {
            // Handle unknown formType
            throw new Error("Invalid formType");
        }

        if (!existingMhsDsn) {
        return res.status(404).json({ message: 'Filter data not exist!' });
        }
        const mergedExistingMhsDsn = existingMhsDsn.reduce((acc, item) => {
            const infoId = item.info_mhs.nomer_induk;
            const name = item.info_mhs.nama;
                
            if (!acc[infoId]) {
                acc[infoId] = {
                name: name,
                lecturer_info: []
                };
            }
                        if (formType === "profesionalisme"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                    data_mk: item.mk_profesionalisme
                });
            }else if (formType === "kode-etik"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                    data_mk: item.mk_kode_etik
                });
            }else if (formType === "k3lh"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                    data_mk: item.mk_k3lh
                });            
            }else if (formType === "seminar"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                    data_mk: item.mk_seminar
                });            
            }else if (formType === "penulisan-proposal-sk"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                });            
            }else if (formType === "manajemen-praktik"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                    data_mk: item.mk_manajemen_praktik
                });            
            }else if (formType === "praktik-keinsinyuran"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                    data_mk: item.mk_praktik_keinsinyuran
                });            
            }else if (formType === "studi-kasus"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                    data_mk: item.mk_studi_kasus
                });            
            }else if (formType === "all"){
                acc[infoId].lecturer_info.push({
                    id_dosen: item.id_dosen,
                });            
            }else {
                // Handle unknown formType
                throw new Error("Invalid formType");
            }
            
                
            return acc;
        }, {});
        
        res.status(201).json({data:  mergedExistingMhsDsn
        ,message: 'User data found' });
    } catch (error) {
        res.status(500).json({ error: 'error while updating data' });
    }

};

const getMhsVerifList = async (req, res) => {
const adminId = req.query.uid;//dr jwt token
const db = await connectMongoDB();

    try {
        console.log( "[Aid]: " + adminId)
        const formCollection = db.collection('form_penilaian_verif');


        const studentList = await formCollection.find({ "id_verif": adminId },{projection:{_id:0,pid:1,info_mhs:1,status:1}}).toArray();
        
        if (!studentList) {
            return res.status(404).json({ message: 'Student list not exist' });
        }
        res.status(201).json({data:  studentList
            ,message: 'Grade form found' });
    } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
    }
};

// GET 
const getStudentInfo = async (req, res) => {
    const adminId = req.query.uid;//dr jwt token
    const PID = req.query.pid;
    const db = await connectMongoDB();

    try {
    // console.log( "lect. id: " + lecturerId)
        const formCollection = db.collection('form_penilaian_verif');
        const formLecturerList = db.collection('form_penilaian_dosen');


        const studentList = await formCollection.findOne({ "pid": PID,"id_verif": adminId },{projection:{_id:0,pid:1,id_verif:1,status:1,info_mhs:1}});
        
        if (!studentList) {
            return res.status(404).json({ message: 'Student info not exist' });
        }

        const lecturerList = await formLecturerList.find({"info_mhs.nomer_induk": studentList.info_mhs.nomer_induk},{projection:{_id:0,id_dosen:1,dosen_name:1,status:1}}).toArray();

        if (!lecturerList) {
            return res.status(404).json({ message: 'Student info not exist' });
        }

        res.status(201).json({data: {
            studentList: studentList,
            lecturerList: lecturerList
        } 
        ,message: 'Student info found' });
    } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
    }
};

// GET 
const getDsnGrading = async (req, res) => {
    const adminId = req.query.uid;//dr jwt token
    const studentId = req.query.sid;//dr jwt token
    const PID = req.query.pid;
    const formType = req.query.ft;
    const db = await connectMongoDB();
  
    
    let existingLectureGrading;
    let existingVerifGrading;
    try {
        const formCollection = db.collection('form_penilaian_dosen');
        const formVerifCollection = db.collection('form_penilaian_verif')
        
        if (formType === "profesionalisme"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId},{projection:{_id:0,id_dosen:1,dosen_name:1,mk_profesionalisme:1}}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID },{projection:{_id:0,nilai_Verif_profesionalisme:1}});
        }else if (formType === "kode-etik"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId},{projection:{_id:0,id_dosen:1,dosen_name:1,mk_kode_etik:1}}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID },{projection:{_id:0,nilai_Verif_kode_etik:1}});
        }else if (formType === "k3lh"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId},{projection:{_id:0,id_dosen:1,dosen_name:1,mk_k3lh:1}}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID },{projection:{_id:0,nilai_Verif_k3lh:1}});
        }else if (formType === "seminar"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId},{projection:{_id:0,id_dosen:1,dosen_name:1,mk_seminar:1}}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID },{projection:{_id:0,nilai_Verif_seminar:1}});
        }else if (formType === "penulisan-proposal-sk"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId},{projection:{_id:0,id_dosen:1,dosen_name:1,mk_penulisan_proposal_studi_kasus:1}}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID },{projection:{_id:0,nilai_Verif_penulisan_proposal_studi_kasus:1}});
        }else if (formType === "manajemen-praktik"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId},{projection:{_id:0,id_dosen:1,dosen_name:1,mk_manajemen_praktik:1}}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID },{projection:{_id:0,nilai_Verif_manajemen_praktik:1}});
        }else if (formType === "praktik-keinsinyuran"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId},{projection:{_id:0,id_dosen:1,dosen_name:1,mk_praktik_keinsinyuran:1}}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID },{projection:{_id:0,nilai_Verif_praktik_keinsinyuran:1}});
        }else if (formType === "all"){
            existingLectureGrading = await formCollection.find({  "info_mhs.nomer_induk": studentId}).toArray();
            existingVerifGrading = await formVerifCollection.findOne({ "id_verif": adminId, "pid": PID });
        }else {
            // Handle unknown formType
            throw new Error("Invalid formType");
        }
      
    if (!existingLectureGrading && !existingVerifGrading) {
        return res.status(404).json({ message: 'Student grade form not exist' });
    }
  
    res.status(201).json({data:  {
        existingLectureGrading: existingLectureGrading,
        existingVerifGrading: existingVerifGrading
    }
        ,message: 'Grade form found' });
    
    } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
    }
};

// PATCH
const updateVerifForm = async (req, res) => {
    const adminId = req.query.uid;//dr jwt token
    const PID = req.query.pid;
    const formType = req.query.ft;
    const updatedFormData = req.body;
    const currentDate = new Date(); 
    const db = await connectMongoDB();
    
    let result; // Declare result variable outside the if blocks
    
    try {
      const formCollection = db.collection('form_penilaian_verif');
      
        if (formType === "profesionalisme") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_verif": adminId }, // Filter
                { $set: { 
                    "nilai_Verif_profesionalisme.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "nilai_Verif_profesionalisme.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "nilai_Verif_profesionalisme.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"114-1",
                    "last_change":"Profesionalisme" } } // Update form_i_three
          );
        } else if (formType === "kode-etik") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_verif": adminId }, // Filter
                { $set: { 
                    "nilai_Verif_kode_etik.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "nilai_Verif_kode_etik.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "nilai_Verif_kode_etik.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"114-1",
                    "last_change":"Kode Etik" } } // Update form_i_three
          );
        }else if (formType === "k3lh") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_verif": adminId }, // Filter
                { $set: { 
                    "nilai_Verif_k3lh.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "nilai_Verif_k3lh.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "nilai_Verif_k3lh.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"114-1",
                    "last_change":"K3" } } // Update form_i_three
          );
        }else if (formType === "seminar") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_verif": adminId }, // Filter
                { $set: { 
                    "nilai_Verif_seminar.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "nilai_Verif_seminar.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "nilai_Verif_seminar.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"114-1",
                    "last_change":"Seminar" } } // Update form_i_three
          );
        }else if (formType === "penulisan-proposal-sk") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_verif": adminId }, // Filter
                { $set: { 
                    "nilai_Verif_penulisan_proposal_studi_kasus.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "nilai_Verif_penulisan_proposal_studi_kasus.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "nilai_Verif_penulisan_proposal_studi_kasus.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"114-1",
                    "last_change":"Penulisan Proposal SK" } } // Update form_i_three
          );
        }else if (formType === "manajemen-praktik") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_verif": adminId }, // Filter
                { $set: { 
                    "nilai_Verif_manajemen_praktik.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "nilai_Verif_manajemen_praktik.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "nilai_Verif_manajemen_praktik.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"114-1",
                    "last_change":"Manajemen Praktik" } } // Update form_i_three
          );
        }else if (formType === "praktik-keinsinyuran") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_verif": adminId }, // Filter
                { $set: { 
                    "nilai_Verif_praktik_keinsinyuran.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "nilai_Verif_praktik_keinsinyuran.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "nilai_Verif_praktik_keinsinyuran.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"114-1",
                    "last_change":"Praktik Keinsinyuran" } } // Update form_i_three
          );
        }else {
          throw new Error("Invalid formType");
        }
        
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({ message: "Form updated successfully" });
      } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while updating form' });
      }
    };

    const verifGradeSubmission = async (req, res) => {
        const adminId = req.query.uid; // from jwt token
        const PID = req.query.pid;  
        const currentDate = new Date(); 
    
        const db = await connectMongoDB();
        
        try {
            const formCollection = db.collection('form_penilaian_verif');
            const query = { id_verif: adminId,pid: PID};
            const result = await formCollection.updateOne(query,{ $set: 
              {"last_updated": currentDate,
              "last_change": 'NILAI FINAL',
              "status": '114-2' } });
    
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
            res.status(200).json({ message: "Form updated successfully" });
          
        } catch (err) {
          res.status(500).json({ error: 'Could not submit data form' });
        }
      };

module.exports = { 
    getFormRule,
    assignAssesor,
    assignFilterForm,
    getAllDosenInfo,
    getAllMhsData,
    getVerifDsn,
    getMhsVerifList,
    getStudentInfo,
    getDsnGrading,
    updateVerifForm,
    verifGradeSubmission
};