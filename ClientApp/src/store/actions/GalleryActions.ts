export const setImageUrls = (imageUrls: string[]) => ({
    type: 'SET_IMAGE_URLS',
    payload: imageUrls,
});

export const showPreviousImage = () => ({
    type: 'SHOW_PREVIOUS_IMAGE',
});

export const showNextImage = () => ({
    type: 'SHOW_NEXT_IMAGE',
});

export const saveImage = () => ({
    type: 'SAVE_IMAGE',
});
