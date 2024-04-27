import {useState, useEffect} from 'react';
import axios from 'axios';
import GalleryList from '../GalleryList/GalleryList.jsx'

function App() {

useEffect(() => {
  fetchGallery();
}, []);

let [gallery, setGallery] = useState([]);

const fetchGallery = () => {
  axios({
    method: 'GET',
    url: '/api/gallery'
  })
  .then(response => {
    console.log('Successful GET of all gallery data:', response.body);
    setGallery(response.data);
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
        <section className="gallery-section"
                 data-testid="galleryList">
          <GalleryList
                       gallery={gallery}
                       fetchGallery={fetchGallery}/>
        </section>
      </div>
    );
}

export default App;
