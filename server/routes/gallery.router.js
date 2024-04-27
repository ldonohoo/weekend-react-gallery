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

// POST /gallery
router.post('/', (req, res) => {
  let galleryItem = req.body.galleryItem;
  console.log('adding this item: ', galleryItem);
  sqlText = `
      INSERT INTO gallery
        (title, description, url)
        VALUES ($1, $2, $3);
  `;
  pool.query(sqlText, [galleryItem.title,
                       galleryItem.description, 
                       galleryItem.url])
  .then(dbRes => {
    console.log('POST in api/gallery completed succussfully!');
    res.sendStatus(201);
  })
  .catch(dbErr=> {
    console.log('POST in api/gallery failed miserably:', dbErr);
    res.sendStatus(500);
  })
});

// DELETE /api/gallery/:id
router.delete('/:id', (req, res) => {
  let galleryId = req.params.id;
  sqlText = `
      DELETE FROM gallery
          WHERE id = $1
  `;
  pool.query(sqlText, [galleryId])
  .then(dbRes => {
    console.log('DELETE in api/gallery/id of a gallery item successful!');
    res.sendStatus(200);
  })
  .catch(dbErr => {
    console.log('DELETE in api/gallery/id of a gallery item failed: ', dbErr);
    res.sendStatus(500);
  })
})


module.exports = router;
