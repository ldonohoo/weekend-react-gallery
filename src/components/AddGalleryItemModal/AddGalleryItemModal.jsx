import { useEffect, useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import AddItemForm from '../AddItemForm/AddItemForm.jsx'; 
import '../../index.css'

function AddGalleryItemModal({fetchGallery}) {

    // woo hoo pull in colors variables from my css root variables for modal 
    //              -super cool BUT NOTE:  (SAVE THIS)
    //                   not currently used as I couldn't figure
    //                   out how to get variables 
    //                   into Box modal below
    // const rootElement = document.querySelector(':root');
    // console.log('rootElement', rootElement);
    // const computedStylesRoot= getComputedStyle(rootElement);
    // console.log('computed style for root:', computedStylesRoot);
    // let backgroundColor2 = computedStylesRoot.getPropertyValue('--background-color2');
    // console.log(backgroundColor2);
    // const lineColor = computedStylesRoot.getPropertyValue('--line-color');
    // const fontColor = computedStylesRoot.getPropertyValue('--font-color');
    // const contrastColor = computedStylesRoot.getPropertyValue('--contrast-color');
    
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
     * After the form is submitted:
     *      - submit the form data by updating the database
     *      - when submit is done:  
     *                   -re-fetch the gallery
     *                   -close the modal
     */
    const closeModalAndFetch = () => {
        console.log('closing modal and re-fetching');
        toggleModalOpen();
        fetchGallery();
    }

    /**
     * Component render return (what the component AddGalleryItemModal renders)
     */
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
                           width: 200,
                           bgcolor: '#878684', 
                           borderRadius: 2,
                           boxShadow: 24, 
                           p: 4 }}>    
                    <AddItemForm closeModalAndFetch={closeModalAndFetch} />
                </Box>
            </Modal>
        </>
    );
}

export default AddGalleryItemModal;