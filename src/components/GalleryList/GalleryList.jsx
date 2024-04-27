

import axios from 'axios';
import GalleryItem from '../GalleryItem/GalleryItem.jsx'

function GalleryList({gallery, fetchGallery}) {

    return (
        <section>
            {gallery.map(galleryItem => {
                console.log(galleryItem.url, galleryItem.title);
                return ( 
                    <figure key={galleryItem.id}>  
                        <GalleryItem galleryItem={galleryItem}
                                     fetchGallery={fetchGallery} />
                    </figure>
                )
            })}
        </section>
    )
}

export default GalleryList;