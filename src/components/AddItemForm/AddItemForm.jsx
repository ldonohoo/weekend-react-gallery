import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function AddItemForm({handleAddItem}) {

    let [inputTitle, setInputTitle] = useState('');
    let [inputDescription, setInputDescription] = useState('');
    let [inputUrl, setInputUrl] = useState('');

    const handleSubmitForm = (event) => {
        event.preventDefault();
        let galleryItem = { title: inputTitle,
                            description: inputDescription,
                            url: inputUrl };
        console.log('Handle submit form, gallery item is:', galleryItem);
        handleAddItem({galleryItem});
    }

    return (
        <>
            <h2>Add an image to your gallery:</h2>
            <form onSubmit={handleSubmitForm}>
                <TextField id="item-title" 
                       label="Title"
                       type="text"
                       value={inputTitle}
                       onChange={(e) => {setInputTitle(e.target.value)}}
                       required/>
                <TextField id="item-description" 
                       label="Description" 
                       type="text"
                       value={inputDescription}
                       onChange={(e) => {setInputDescription(e.target.value)}}
                       required/>
                <TextField id="item-url"
                       label="Url" 
                       type="text"
                       value={inputUrl}
                       onChange={(e) => {setInputUrl(e.target.value)}}
                       required/>
                <Button type="submit"
                        variant='contained'>Add Item</Button>
            </form>
        </>
    )
}

export default AddItemForm;

