const { connectMongoDB } = require('../connections/mongodb');
const { nanoid } = require('nanoid');// test 2 form dulu i5 n i6 / 13 n i5
const mqtt = require('mqtt')
require('dotenv').config();

const newGradeFormStudent =  async (req, res) => {
    const studentId = req.query.uid;//dr jwt token
    const PID = req.query.pid;// generated
    const namaMhs = req.query.nama;
    const db = await connectMongoDB();
    const currentDate = new Date();

    try {
      console.log( "student id: " + studentId)
      const formCollection = db.collection('form_penilaian');
      const formData = {
        pid: PID,
        student_id: studentId,
        student_name: namaMhs,
        form_i_satu: {
          alamat: [],
          lembaga: [],
          komunikasi: []
        },    //perlu tamabahin isinya
        form_i_dua: [],
        form_i_tiga: [],
        last_updated: currentDate,
        last_change: 'BARU',
        status: '111-0',
        status_assesor: '113-0',
        dosen_penilai_faip: []

      }
      const insertedForm = await formCollection.insertOne( formData );
  
      res.status(201).json({ message: 'Form has been created' });
    } catch (error) {
      console.error('error while retrieving form: ' + error.message);
      res.status(500).json({ error: 'error while making form' });
    }
}

// GET 
const findGradeFormStudent = async (req, res) => {
  const studentId = req.query.uid;//dr jwt token
  // const PID = req.query.pid;
  const formType = req.query.ft;   
  const db = await connectMongoDB();

  let existingStudentForm;

    try {
      console.log( "student id: " + studentId)
      const formCollection = db.collection('form_penilaian');
      if (formType === "i1"){
        existingStudentForm = await formCollection.findOne({  "student_id": studentId },{projection:{_id:0,form_i_satu:1}});
      }else if (formType === "i2"){
        existingStudentForm = await formCollection.findOne({  "student_id": studentId },{projection:{_id:0,form_i_dua:1}});
      }else if (formType === "i3"){
        existingStudentForm = await formCollection.findOne({  "student_id": studentId },{projection:{_id:0,form_i_tiga:1}});
      }else if (formType === "info"){
        existingStudentForm = await formCollection.findOne({  "student_id": studentId },{projection:{_id:0,student_id:1,pid:1,last_updated:1,last_change:1,status:1}});
      }else {
        // Handle unknown formType
        throw new Error("Invalid formType");
      }
  
      if (!existingStudentForm) {
        return res.status(404).json({ message: 'Student grade form not exist' });
      }
      res.status(201).json({data:  existingStudentForm
        ,message: 'Grade form found' });
    } catch (error) {
      console.error('error while retrieving form: ' + error.message);
      res.status(500).json({ error: 'error while retrieving form' });
    }
  };

// PATCH
// EDIT I3 dan hapus baris
const updateGradeFormStudent = async (req, res) => {
    const studentId = req.query.uid;//dr jwt token
    const PID = req.query.pid;
    const formType = req.query.ft;
    const updatedFormData = req.body;
    const currentDate = new Date(); 
    const db = await connectMongoDB();

    let result; // Declare result variable outside the if blocks

    try {
        console.log("student id: " + studentId)
        const formCollection = db.collection('form_penilaian');

        // Update the document based on formType
        if (formType === "i1") {
            result = await formCollection.updateOne(
                { "pid": PID, "student_id": studentId }, // Filter
                { $set: { "form_i_satu": updatedFormData, "last_updated": currentDate,"last_change":"I 1" } } // Update form_i_three
            );
        } else if (formType === "i2") {
            result = await formCollection.updateOne(
                { "pid": PID, "student_id": studentId }, // Filter
                { $set: { "form_i_dua": updatedFormData, "last_updated": currentDate,"last_change":"I 2" } } // Update form_i_four
            );
        } else if (formType === "i3") {
          result = await formCollection.updateOne(
              { "pid": PID, "student_id": studentId }, // Filter
              { $set: { "form_i_tiga": updatedFormData, "last_updated": currentDate,"last_change":"I 3" } } // Update form_i_four
          );
        } else {
            // Handle unknown formType
            throw new Error("Invalid formType");
        }

        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({ message: "Form updated successfully" });
    } catch (error) {
      console.error('error while retrieving form: ' + error.message);
      res.status(500).json({ error: 'error while updating form' });
    }
};

// DELETE
// delete user grade form completely
const deleteGradeFormStudent = async (req, res) => {
    const studentId = req.query.uid;//dr jwt token
    const PID = req.query.pid;  

    const db = await connectMongoDB();
    
    try {
        const formCollection = db.collection('form_penilaian');
        const query = { student_id: studentId,pid: PID};
        const result = await formCollection.deleteOne(query);

        if (result.deletedCount === 1) {
            console.log("Successfully deleted Grade form: " + studentId);
            res.status(200).json({ message: 'Grade form has been deleted' });
          } 
      
    } catch (err) {
      res.status(500).json({ error: 'Could not delete form' });
    }
  };

  const resetDemoFormStudent = async (req, res) => {
    const studentId = req.query.uid;//dr jwt token
    const PID = req.query.pid;  
    const currentDate = new Date(); 

    const db = await connectMongoDB();
    
    try {
        const formCollection = db.collection('form_penilaian');
        const query = { student_id: studentId,pid: PID};
        const result = await formCollection.updateOne(query,{ $set: 
          {"form_i_satu": {
            "alamat": [],
            "lembaga": [],
            "komunikasi": []
          },    //perlu tamabahin isinya
          "form_i_dua": [],
          "form_i_tiga": [],
          "last_updated": currentDate,
          "last_change": 'BARU',
          "status": '111-0' } });

        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({ message: "Form updated successfully" });
      
    } catch (err) {
      res.status(500).json({ error: 'Could not delete data form' });
    }
  };

const resetGradeFormStudent = async (req, res) => {
    const studentId = req.query.uid;//dr jwt token
    const PID = req.query.pid;  
    const currentDate = new Date(); 

    const db = await connectMongoDB();
    
    try {
        const formCollection = db.collection('form_penilaian');
        const query = { student_id: studentId,pid: PID};
        const result = await formCollection.updateOne(query,{ $set: 
          {"form_i_satu": {
            "alamat": [],
            "lembaga": [],
            "komunikasi": []
          },    //perlu tamabahin isinya
          "form_i_dua": [],
          "form_i_tiga": [],
          "last_updated": currentDate,
          "last_change": 'ULANG',
          "status": '111-1' } });

        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({ message: "Form updated successfully" });
      
    } catch (err) {
      res.status(500).json({ error: 'Could not delete data form' });
    }
  };

const restartGradeFormStudent = async (req, res) => {
    const studentId = req.query.uid;//dr jwt token
    const PID = req.query.pid;  
    const currentDate = new Date(); 

    const db = await connectMongoDB();
    
    try {
        const formCollection = db.collection('form_penilaian');
        const query = { student_id: studentId,pid: PID};
        const result = await formCollection.updateOne(query,{ $set: 
          {"last_updated": currentDate,
          "last_change": 'BARU',
          "status": '111-0' } });

        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({ message: "Form updated successfully" });
      
    } catch (err) {
      res.status(500).json({ error: 'Could not delete data form' });
    }
  };

const startAutomation = async (req, res) => {
    const studentId = req.query.uid;//dr jwt token
    const PID = req.query.pid;  
    const currentDate = new Date(); 

    const db = await connectMongoDB();
    
    try {
        const formCollection = db.collection('form_penilaian');
        const query = { student_id: studentId,pid: PID};
        const result = await formCollection.updateOne(query,{ $set: 
          {"last_updated": currentDate,
          "last_change": 'AUTOMATION PROCESING',
          "status": '111-3' } });

        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({ message: "Form updated successfully" });
      
    } catch (err) {
      res.status(500).json({ error: 'Could not delete data form' });
    }
  };

  
  const publishToMQTT = (PID, studentId, dosenPenilaiFaip) => {
    return new Promise((resolve, reject) => {
      const options = {
        host: process.env.CON_MQTT,
        port: process.env.PORT_MQTT
      };
      const client = mqtt.connect(options);
      const topic = process.env.TOPIC_MQTT;
      const dataMqtt = { pid: PID, id_mhs: studentId, id_penilai_faip: dosenPenilaiFaip };
      const jsonData = JSON.stringify(dataMqtt);
  
      client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.publish(topic, jsonData, { qos: 1 }, (err) => {
          if (err) {
            console.error('Publish error:', err);
            reject('Failed to publish message');
          } else {
            console.log('Message published');
            resolve('Message published successfully');
          }
          client.end();
        });
      });
  
      client.on('error', (err) => {
        console.error('MQTT connection error:', err);
        client.end();
        reject('MQTT connection error');
      });
    });
  };
  
  const studentSubmission = async (req, res) => {
    const studentId = req.query.uid; // from JWT token
    const PID = req.query.pid;
    const currentDate = new Date();
  
    try {
      const db = await connectMongoDB();
      const daftarDosen = db.collection('daftar_dosen');
  
      const formCollection = db.collection('form_penilaian');
      const query = { student_id: studentId, pid: PID };
      const update = {
        $set: {
          "last_updated": currentDate,
          "last_change": 'TERKIRIM',
          "status": '111-2',
          // "status_assesor": '113-0',
          // "dosen_penilai_faip": []
        }
      };
  
      const result = await formCollection.updateOne(query, update);
      console.log(`${result.modifiedCount} MHS - document(s) was/were updated.`);   
  
      
      res.status(200).json({ message: "Form submitted successfully" });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Could not submit data form' });
    }
  };
  
const lecturerSubmission = async (req, res) => {
    const lecturerId = req.query.uid; // from jwt token
    const PID = req.query.pid;  
    const currentDate = new Date(); 

    const db = await connectMongoDB();
    
    try {
        const formCollection = db.collection('form_penilaian_dosen');
        const query = { id_dosen: lecturerId,pid: PID};
        const result = await formCollection.updateOne(query,{ $set: 
          {"last_updated": currentDate,
          "last_change": 'NILAI MASUK',
          "status": '112-3' } });

        console.log(`${result.modifiedCount} document(s) was/were updated.`);
        res.status(200).json({ message: "Form updated successfully" });
      
    } catch (err) {
      res.status(500).json({ error: 'Could not submit data form' });
    }
  };
// GET 
// ambil data mhs ke dosen find bukan findone
const studentFaipGradingList = async (req, res) => {
  const lecturerId = req.query.uid;//dr jwt token
  // const PID = req.query.pid;
  const db = await connectMongoDB();

    try {
      console.log( "lect. id: " + lecturerId)
      const formCollection = db.collection('form_penilaian_dosen');


      const studentList = await formCollection.find({ "id_dosen": lecturerId },{projection:{_id:0,pid:1,info_mhs:1,status:1}}).toArray();
      
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
// ambil data mhs ke dosen find bukan findone
const getStudentInfo = async (req, res) => {
  const lecturerId = req.query.uid;//dr jwt token
  const PID = req.query.pid;
  const db = await connectMongoDB();

    try {
      // console.log( "lect. id: " + lecturerId)
      const formCollection = db.collection('form_penilaian_dosen');


      const studentList = await formCollection.findOne({ "pid": PID,"id_dosen":lecturerId },{projection:{_id:0,pid:1,id_dosen:1,status:1,info_mhs:1,last_updated:1}});
      
      if (!studentList) {
        return res.status(404).json({ message: 'Student info not exist' });
      }
      res.status(201).json({data:  studentList
        ,message: 'Student info found' });
    } catch (error) {
      console.error('error while retrieving form: ' + error.message);
      res.status(500).json({ error: 'error while retrieving form' });
    }
  };

// PATCH
const updateGradeFormLecturer = async (req, res) => {
    const lecturerId = req.query.uid;//dr jwt token
    const PID = req.query.pid;
    const formType = req.query.ft;
    const updatedFormData = req.body;
    const currentDate = new Date(); 
    const db = await connectMongoDB();
    
    let result; // Declare result variable outside the if blocks
    
    try {
      console.log("student id: " + lecturerId)
      const formCollection = db.collection('form_penilaian_dosen');
              if (formType === "profesionalisme") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_dosen": lecturerId }, // Filter
                { $set: { "mk_profesionalisme.nilai_rek_cpmk": updatedFormData.nilaiRekomendasiCpmk,
                    "mk_profesionalisme.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "mk_profesionalisme.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "mk_profesionalisme.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"112-2",
                    "last_change":"Profesionalisme" } } // Update form_i_three
          );
        } else if (formType === "kode-etik") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_dosen": lecturerId }, // Filter
                { $set: { "mk_kode_etik.nilai_rek_cpmk": updatedFormData.nilaiRekomendasiCpmk,
                    "mk_kode_etik.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "mk_kode_etik.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "mk_kode_etik.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"112-2",
                    "last_change":"Kode Etik" } } // Update form_i_three
          );
        }else if (formType === "k3lh") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_dosen": lecturerId }, // Filter
                { $set: { "mk_k3lh.nilai_rek_cpmk": updatedFormData.nilaiRekomendasiCpmk,
                    "mk_k3lh.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "mk_k3lh.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "mk_k3lh.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"112-2",
                    "last_change":"K3" } } // Update form_i_three
          );
        }else if (formType === "seminar") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_dosen": lecturerId }, // Filter
                { $set: { "mk_seminar.nilai_rek_cpmk": updatedFormData.nilaiRekomendasiCpmk,
                    "mk_seminar.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "mk_seminar.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "mk_seminar.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"112-2",
                    "last_change":"Seminar" } } // Update form_i_three
          );
        }else if (formType === "penulisan-proposal-sk") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_dosen": lecturerId }, // Filter
                { $set: { "mk_penulisan_proposal_studi_kasus.nilai_rek_cpmk": updatedFormData.nilaiRekomendasiCpmk,
                    "mk_penulisan_proposal_studi_kasus.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "mk_penulisan_proposal_studi_kasus.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "mk_penulisan_proposal_studi_kasus.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"112-2",
                    "last_change":"Penulisan Proposal SK" } } // Update form_i_three
          );
        }else if (formType === "manajemen-praktik") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_dosen": lecturerId }, // Filter
                { $set: { "mk_manajemen_praktik.nilai_rek_cpmk": updatedFormData.nilaiRekomendasiCpmk,
                    "mk_manajemen_praktik.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "mk_manajemen_praktik.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "mk_manajemen_praktik.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"112-2",
                    "last_change":"Manajemen Praktik" } } // Update form_i_three
          );
        }else if (formType === "praktik-keinsinyuran") {
          result = await formCollection.updateOne(
            { "pid": PID, "id_dosen": lecturerId }, // Filter
                { $set: { "mk_praktik_keinsinyuran.nilai_rek_cpmk": updatedFormData.nilaiRekomendasiCpmk,
                    "mk_praktik_keinsinyuran.nilai_cpmk": updatedFormData.nilaiCpmk,
                    "mk_praktik_keinsinyuran.nilai_akhir_angka": updatedFormData.nilaiAngka, 
                    "mk_praktik_keinsinyuran.nilai_akhir_huruf": updatedFormData.nilaiHuruf,
                    "last_updated": currentDate,
                    "status":"112-2",
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

const getFormFilter = async (req, res) => {//SAATNYA MERUBUHKAN DB V
  const lecturerId = req.query.uid;//dr jwt token
  const formType = req.query.ft;

  const db = await connectMongoDB();
  
  let existingFormFilter;
  try {
    const formCollection = db.collection('filter_penilaian');
    
    if (formType === "profesionalisme"){
      existingFormFilter = await formCollection.findOne({ "id_filter" : "001" },{projection:{_id:0,mk_profesionalisme:1}});
    }else if (formType === "kode-etik"){
      existingFormFilter = await formCollection.findOne({ "id_filter" : "001" },{projection:{_id:0,mk_kode_etik:1}});
    }else if (formType === "k3lh"){
      existingFormFilter = await formCollection.findOne({ "id_filter" : "001" },{projection:{_id:0,mk_k3lh:1}});
    }else if (formType === "seminar"){
      existingFormFilter = await formCollection.findOne({ "id_filter" : "001" },{projection:{_id:0,mk_seminar:1}});
    }else if (formType === "penulisan-proposal-sk"){
      existingFormFilter = await formCollection.findOne({ "id_filter" : "001" },{projection:{_id:0,mk_penulisan_proposal_studi_kasus:1}});
    }else if (formType === "manajemen-praktik"){
      existingFormFilter = await formCollection.findOne({ "id_filter" : "001" },{projection:{_id:0,mk_manajemen_praktik:1}});
    }else if (formType === "praktik-keinsinyuran"){
      existingFormFilter = await formCollection.findOne({ "id_filter" : "001" },{projection:{_id:0,mk_praktik_keinsinyuran:1}});
    }else {
      // Handle unknown formType
      throw new Error("Invalid formType");
    }

    if (!existingFormFilter) {
      return res.status(404).json({ message: 'Student grade form not exist' });
    }

    res.status(201).json({data:  existingFormFilter
      ,message: 'Grade form found' });

  } catch (error) {
    console.error("Error fetching student grade form:", error.message);
    return res.status(500).json({ message: 'Error fetching student grade form' });
  }
  
};

const getStudentGradeInfo = async (req, res) => {//SAATNYA MERUBUHKAN DB V
  const lecturerId = req.query.uid;//dr jwt token
  const PID = req.query.pid;
  const formType = req.query.ft;

  const db = await connectMongoDB();
  
  let existingStudentGrade;
  try {
    const formCollection = db.collection('form_penilaian_dosen');

    
    if (formType === "profesionalisme"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID },{projection:{_id:0,mk_profesionalisme:1}});
    }else if (formType === "kode-etik"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID },{projection:{_id:0,mk_kode_etik:1}});
    }else if (formType === "k3lh"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID },{projection:{_id:0,mk_k3lh:1}});
    }else if (formType === "seminar"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID },{projection:{_id:0,mk_seminar:1}});
    }else if (formType === "penulisan-proposal-sk"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID },{projection:{_id:0,mk_penulisan_proposal_studi_kasus:1}});
    }else if (formType === "manajemen-praktik"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID },{projection:{_id:0,mk_manajemen_praktik:1}});
    }else if (formType === "praktik-keinsinyuran"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID },{projection:{_id:0,mk_praktik_keinsinyuran:1}});
    }else if (formType === "all"){
      existingStudentGrade = await formCollection.findOne({  "id_dosen": lecturerId,"pid": PID });
    }else {
      // Handle unknown formType
      throw new Error("Invalid formType");
    }
    
    if (!existingStudentGrade) {
      return res.status(404).json({ message: 'Student grade form not exist' });
    }

    res.status(201).json({data:  existingStudentGrade
      ,message: 'Grade form found' });

  } catch (error) {
    console.error("Error fetching student grade form:", error.message);
    return res.status(500).json({ message: 'Error fetching student grade form' });
  }
  
};


const getStudentFormClaim = async (req, res) => {
    const studentId = req.query.sid;//dr jwt token
    const db = await connectMongoDB();
  
      try {
        console.log( "student id: " + studentId)
        const formCollection = db.collection('form_penilaian');

        const allStudentClaim = await formCollection.findOne({ "student_id": studentId },{projection:{_id:0,
          form_i_tiga:1,
          form_i_empat:1,
          form_i_lima:1,
          form_i_enam:1,
          form_iii:1,
          form_iv:1,
          form_v_satu:1,
          form_v_dua:1,
          form_v_tiga:1,
          form_v_empat:1,
          form_vi:1
        }});
    
        if (!allStudentClaim) {
          return res.status(404).json({ message: 'Student grade form not exist' });
        }
        //W1
        const klaimMhs = [...allStudentClaim.form_i_tiga, ...allStudentClaim.form_i_empat, ...allStudentClaim.form_i_enam,...allStudentClaim.form_i_lima, ...allStudentClaim.form_iii, ...allStudentClaim.form_v_tiga, ...allStudentClaim.form_v_satu, ...allStudentClaim.form_v_dua, ...allStudentClaim.form_vi, ...allStudentClaim.form_iv, ...allStudentClaim.form_v_empat]
          .flatMap( item => {return [item.klaimKompetensiWsatu, item.klaimKompetensiWdua, item.klaimKompetensiWtiga, item.klaimKompetensiWempat, item.klaimKompetensiPlima, item.klaimKompetensiPenam, item.klaimKompetensiPtujuh, item.klaimKompetensiPdelapan, item.klaimKompetensiPsembilan, item.klaimKompetensiPsepuluh].flat()})
          .filter(item => item); // Filter out any falsy values like undefined or null

        res.status(201).json({data:  klaimMhs,
          message: 'Grade form found' });
      } catch (error) {
        console.error('error while retrieving form: ' + error.message);
        res.status(500).json({ error: 'error while retrieving form' });
      }
    };
            
module.exports = { 
    newGradeFormStudent,
    findGradeFormStudent,
    updateGradeFormStudent,
    deleteGradeFormStudent,
    startAutomation,
    studentFaipGradingList,
    getStudentInfo,
    updateGradeFormLecturer,
    getStudentGradeInfo,
    resetGradeFormStudent,
    resetDemoFormStudent,
    restartGradeFormStudent,
    studentSubmission,
    lecturerSubmission,
    getStudentFormClaim,
    getFormFilter
};
