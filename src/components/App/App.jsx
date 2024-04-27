import {useState, useEffect} from 'react';
import axios from 'axios';
import GalleryList from '../GalleryList/GalleryList.jsx'


/* Component App, responsible for:
/*      --organizing the main App page
/*      --calling/mounting the GalleryList component
/*      --creating the gallery state variable to store the gallery data
/*         and fetching the gallery data initially
*/
function App() {

/**
 * Use useEffect hook to call fetchGallery once 
 *    upon mount of component <App />
 */
useEffect(() => {
  fetchGallery();
}, []);

// state variable to keep track of the entire gallery, which is 
//    an array of objects fetched from the database
let [gallery, setGallery] = useState([]);

/**
 * Fetches the gallery data, an array of objects, from the database
 *    using axios to make an HTTP request to the server
 */
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

    /**
     * Component render return (what the component App renders)
     */
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
