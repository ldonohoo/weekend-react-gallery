import axios from 'axios';
import { useState } from 'react';

function GalleryItem({galleryItem, fetchGallery}) {

    let [showPicture, setShowPicture] = useState(true);

    const getLikeMessage = (likes) => {
        if (!likes) {
            return "No people love this :(";
        } else if (likes === 1) {
            return "1 person loves this!";
        } else {
            return likes + "people love this!";
        }
    }

    const togglePictureDescription = (event) => {
        let pictureContainerElement = event.target;
        pictureContainerElement.classList.toggle('show-picture');
        setShowPicture(!showPicture);
    }

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

    const renderPictureOrDescription = (event) => {
        if (event.target.closest('div').classList.contains('show-picture')) {
            return (
                <img src={galleryItem.url}/>
            )
        } else {
            return (
                <p>{galleryItem.description}</p>
            )
        }
    }

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