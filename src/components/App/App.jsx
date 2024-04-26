import {useState, useEffect} from 'react';
import axios from 'axios';
import GalleryList from '../GalleryList/GalleryList.jsx'

function App() {

let [gallery, setGallery] = useState([]);

const fetchGallery = () => {
  axios({
    method: 'GET',
    url: '/api/gallery'
  })
  .then(response => {
    setGallery(req.body);
    console.log('Successful GET of all gallery data:', req.body);
  })
  .catch(error => {
    console.log('Error in GET of all gallery data: ', error);
  })
}

    return (
      <div>
        <header>
          <h1>React Gallery</h1>
        </header>
        <section>
          <GalleryList gallery={gallery}
                       fetchGallery={fetchGallery}/>
        </section>
      </div>
    );
}

export default App;
