

import axios from 'axios';
import GalleryItem from '../GalleryItem/GalleryItem.jsx'

function GalleryList({gallery, fetchGallery}) {

    return (
        <section>
            {gallery.map(galleryItem => {
                console.log(galleryItem.url, galleryItem.title);
                return ( 
                    <article key={galleryItem.key}>  
                        <GalleryItem galleryItem={galleryItem} />
                    </article>
                )
            })}
        </section>
    )
}

export default GalleryList;