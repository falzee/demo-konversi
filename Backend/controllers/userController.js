const { connectMongoDB } = require('../connections/mongodb');

const getProfile = async (req, res) => {
    const userId = req.params.id;
    const db = await connectMongoDB();

    try {
      console.log( "user id: " + userId)
      const userProfile = db.collection('users');
      const query = { nomer_induk:userId };
      const options = {
        projection: { 
          _id: 0, username: 0, password: 0, posisi_kuliah: 0, role: 0, nomer_induk: 0 },
      };

      const existingProfile = await userProfile.findOne(query,options);

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

  module.exports ={
    getProfile,
  }