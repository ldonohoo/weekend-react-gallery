import axios from 'axios';
import { useState } from 'react';
import './GalleryItem.css';

/**
 * Component GalleryItem, responsible for rendering a single item
 *      from the gallery
 *          Item includes:  Title
 *                          Picture or Description
 *                          Like button 
 *                          Like display message
 */
function GalleryItem({galleryItem, fetchGallery}) {

    // state variable to keep track of the picture container render mode:
    //          -- show picture or show description 
    let [showPicture, setShowPicture] = useState(true);

    /**
     * Format the like message according to the number of likes:
     *      -different for 0, 1, and >1 likes
     */
    const getLikeMessage = (likes) => {
        if (!likes) {
            return "No people love this :(";
        } else if (likes === 1) {
            return "1 person loves this!";
        } else {
            return likes + " people love this!";
        }
    }

    /**
     * Toggles the state variable to show the picture vs. description
     *      AND addess a css class to the picture-container 
     *          for conditional styling
     */
    const togglePictureDescription = (event) => {
        let pictureContainerElement = event.target;
        pictureContainerElement.classList.toggle('show-picture');
        setShowPicture(!showPicture);
    }

    /**
     * Handles the Love-it button click
     *      - updates the database for the item, adding one to the
     *         like count every time button is clicked
     */
    const handleLoveItClick = (id) => {
        axios({
            method: 'PUT',
            url: `/api/gallery/like/${id}`
        })
        .then(response => {
            console.log('PUT to update loveit counter successful!');
            fetchGallery();
        })
        .catch(error => {
            console.log('PUT to upvote gallery item unsuccessful', error);
        })
    }

    /**
     * Component render return (what the component GalleryItem renders)
     */
    return (
            <>
                <h2>{galleryItem.title}</h2>
                    <div id="picture-container" 
                         data-testid="toggle"
                         onClick={(e) => togglePictureDescription(e)} 
                         className="{ showPicture ? 'show-picture' : ''}">
                         {showPicture ? <img src={galleryItem.url}/> : <p>{galleryItem.description}</p>}
                    </div>
                <button id="love-it"
                        data-testid="like"
                        onClick={() => {handleLoveItClick(galleryItem.id)}}>love it!</button>
                <figcaption>{getLikeMessage(galleryItem.likes)}</figcaption>
            </>
    )
}

export default GalleryItem;