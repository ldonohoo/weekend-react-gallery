

import axios from 'axios';
import GalleryItem from '../GalleryItem/GalleryItem.jsx'

function GalleryList({gallery, fetchGallery}) {

    return (
        <section  data-testid="app">
            {gallery.map(galleryItem => {
                console.log(galleryItem.url, galleryItem.title);
                return ( 
                    <figure key={galleryItem.id} 
                            data-testid="galleryItem">  
                        <GalleryItem 
                                     galleryItem={galleryItem}
                                     fetchGallery={fetchGallery} />
                    </figure>
                )
            })}
        </section>
    )
}

export default GalleryList;