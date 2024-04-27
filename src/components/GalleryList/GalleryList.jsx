

import axios from 'axios';
import GalleryItem from '../GalleryItem/GalleryItem.jsx'
import './GalleryList.css';

/**
 * Component GalleryList, responsible for rendering the entire gallery
 *          -- GalleryList loops through all items in gallery,
 *              and mounts a GalleryItem component for each item
 */
function GalleryList({gallery, fetchGallery}) {

    /**
     * Component render return (what the component GalleryList renders)
     */
    return (
        <section className="gallery-section"
                 data-testid="app">
            {gallery.map(galleryItem => {
                console.log(galleryItem.url, galleryItem.title);
                return ( 
                    <figure className="gallery-item"
                            key={galleryItem.id} 
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