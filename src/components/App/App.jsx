import {useState, useEffect} from 'react';
import axios from 'axios';
import GalleryList from '../GalleryList/GalleryList.jsx';
import AddGalleryItemModal from '../AddGalleryItemModal/AddGalleryItemModal.jsx';

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
  console.log('initial fetch!');
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
    console.log('Successful GET of all gallery data:', response.data);
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
          <h1>Photo Gallery<br/><span>with React</span></h1>
        </header>
        {/* This is the modal to add a gallery item */}
        <AddGalleryItemModal fetchGallery={fetchGallery}/>
        {/* Section for the gallery to be displayed */}
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
