
function PictureCard({galleryItem, className}) {
    return (
        <>
            {className === 'show-picture' && (<img src={galleryItem.url}/>)}
            {className !== 'show-picture' && (<p>{galleryItem.description}</p>)}
        </>    
    )
}

export default PictureCard;