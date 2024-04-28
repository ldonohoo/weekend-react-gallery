// load express to handle HTTP requests/responses
const express = require('express');
const router = express.Router();
const app = express();
// load pool to handle postgres database requests/responses
const pool = require('../modules/pool.js');
// load multer to handle file uploads
const multer  = require('multer');
// don't know if I need these three here or not but here they are, duplicated
//    I already have them in my server.js
const cors = require('cors');
app.use(express.json());
app.use(cors());


// This sets up the type of storage used, there are two other options I think?
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // the destination for the file upload is declared below.
      //    the null is some sore of error msg or handling??
      return cb(null, './public/images')
    },
    filename: (req, file, cb) => {
      // the filename is compiled below, it's:
      //   <current date time stamp> + <underscore> + <filename uploaded>
      return cb(null, `${Date.now()}_${file.originalname}`)
   }
});

// declares the upload to go use the defined storage above
const upload = multer({storage: storage});

//---------ROUTES!----------------------------------------------------------

// POST /gallery --NOW with Multer!!! Yay!!!
router.post('/', upload.single('file'), (req, res) => {
  // The data comes up in two parts:
  //    req.body contains the two text fields saved
  //       in 'title' & 'description'
  //    req.file contains the FormData object which is the actual file
  //       it was stored in 'file'
  //  below is view of whole body and file objects
  console.log('req.body the text fields:', req.body);  
  console.log('req.file the file object:', req.file);  
  // This is how you pull the filename, it comes through as req.file.filename
  console.log('filename:', req.file.filename);
  // set all three fields to send to the database
  const filename = req.file.filename;
  const newFileTitle = req.body.title;
  const newFileDescription = req.body.description;
  // add the path to the filename before sending to database
  const filenameUrl = `images/${filename}`;
    console.log('Adding gallery item: ',
        newFileTitle, newFileDescription, filename);
    sqlText = `
        INSERT INTO gallery
          (title, description, url)
          VALUES ($1, $2, $3);
    `;
    pool.query(sqlText, [newFileTitle,
                         newFileDescription, 
                         filenameUrl])
    .then(dbRes => {
      console.log('POST in api/gallery completed succussfully!');
      // on a successful POST send back the new filename you just created 
      //     why?  I don't know for fun.  at first I thought I needed this info
      res.send({filenameUrl: filenameUrl});
    })
    .catch(dbErr=> {
      console.log('POST in api/gallery failed miserably:', dbErr);
      res.sendStatus(500);
    })
  });


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

//--------------------END ROUTES-----------------------------------------------



module.exports = router;
