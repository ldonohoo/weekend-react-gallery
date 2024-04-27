const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


// PUT /gallery/like/:id
router.put('/like/:id', (req, res) => {
  let galleryId = req.params.id;
  console.log(galleryId, 'that was galleryid');

  sqlText = `
    UPDATE gallery 
      SET likes = likes + 1
      WHERE id = $1;
  `;
  pool.query(sqlText, [galleryId])
  .then( dbResponse => {
    console.log('PUT in api/gallery/like/id successful!');
    res.sendStatus(200);
  })
  .catch(dbError => {
    console.log('PUT in /api/gallery/like/id failed...', dbError);
    res.sendStatus(500);
  })
});

// GET /gallery
router.get('/', (req, res) => {
  sqlText = `SELECT * FROM gallery
                ORDER BY id;`
  pool.query(sqlText)
  .then ( dbResponse => {
    let gallery = dbResponse.rows;
    console.log('Successful GET of data from server in /api/gallery: ', gallery)
    res.send(gallery);
  })
  .catch(dbError => {
    console.log('Error getting gallery data in /api/gallery', dbError);
    res.sendStatus(500);
  })
});

module.exports = router;
