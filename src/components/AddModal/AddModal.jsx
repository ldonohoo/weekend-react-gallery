import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Box } from '@mui/material';
import AddItemForm from '../AddItemForm/AddItemForm.jsx'; 


function AddModal({fetchGallery}) {

    /**
     * State to keep track if model is open or closed
     *      - defaults to false as add modal is only
     *         shown when you hit the add item button
     */
    const [modalOpen, setModalOpen] = useState(false);

    /**
     * Toggles the modal open and shut
     */
    const toggleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    /**
     * Add a gallery item to the database usion a HTTP call
     *  to the server with axios
     *      - when successful, re-fetch the gallery items */    
    const addGalleryItem = (galleryItem) => {
        console.log('galleryItem being added:', galleryItem);
        axios({
            method: 'POST',
            url: 'api/gallery',
            data: {galleryItem}
        })
        .then(response => {
            console.log('Item successfully added to your gallery!');
            fetchGallery();
        })
        .catch(error => {
            console.log('Item failed to be added to your gallery: ', error);
        })
    }

    /**
     * After the form is submitted:
     *      - submit the form data by updating the database
     *      - when submit is done:  
     *                   -re-fetch the gallery
     *                   -close the modal
     */
    const handleAddItem = ({galleryItem}) => {
        console.log('adding gallery item:', galleryItem);
        addGalleryItem(galleryItem);
        toggleModalOpen();
        fetchGallery();
    }

    return (
        <>
            <Button variant="contained"
                    onClick={toggleModalOpen}>Add to gallery</Button>
            <Modal open={modalOpen} 
                   onClose={toggleModalOpen}>
                <Box sx={{ position: 'absolute', 
                           top: '50%', 
                           left: '50%', 
                           transform: 'translate(-50%, -50%)',
                           width: 400, bgcolor: 'background.paper', 
                           boxShadow: 24, 
                           p: 4 }}>    
                    <AddItemForm handleAddItem={handleAddItem} />
                </Box>
            </Modal>
        </>
    );
}

export default AddModal;