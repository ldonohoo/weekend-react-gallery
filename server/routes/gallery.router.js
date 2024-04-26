const express = require('express');
const router = express.Router();

// PUT /gallery/like/:id
router.put('/like/:id', (req, res) => {
  // code here
});

// GET /gallery
router.get('/', (req, res) => {
  sqlText = `
    SELECT * FROM gallery;`
  Pool.query(sqlText)
  .then ( dbResponse => {
    let gallery = dbResponse.data;
    console.log('Successful GET of data from server in /api/gallery')
    res.send(gallery);
  })
  .catch(dbError => {
    console.log('Error getting gallery data in /api/gallery', dbError);
  })
});

module.exports = router;
