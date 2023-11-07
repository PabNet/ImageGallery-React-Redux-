import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setImageUrls,
    showPreviousImage,
    showNextImage,
    saveImage,
} from '../store/actions/GalleryActions';
import { GalleryState, RootState } from '../store/types';
import {getDataFromServer} from "../helpers/httpUtils";

function Gallery() {
    const galleryState = useSelector((state: RootState) => state.gallery);
    const dispatch = useDispatch();
    const imageUrls = galleryState.imageUrls;
    const currentImageIndex = galleryState.currentImageIndex;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const configData = await getDataFromServer('/api/config');
            if(configData != undefined) {
                let apiUrl = configData.apiUrl;
                const dataFileName = configData.dataFileName;

                if (apiUrl && dataFileName) {
                    const data = await getDataFromServer(apiUrl + dataFileName);
                    if(data != undefined) {
                        const images = data.images;
                        apiUrl = apiUrl.replace("/static/", "");
                        console.log(apiUrl);
                        const imageUrls = images.map((image: any) => apiUrl + image.image_url);
                        console.log(imageUrls);
                        dispatch(setImageUrls(imageUrls));
                    }
                } else {
                    console.error('apiUrl or dataFileName is empty.');
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (canvasRef && canvasRef.current && imageUrls && imageUrls.length > 0) {
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d');

                if (context) {
                    const img = new Image();
                    img.onload = () => {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                    };
                    img.src = imageUrls[currentImageIndex];
                }
            }
        }
    }, [canvasRef, imageUrls, currentImageIndex]);

    const handleNext = () => {
        dispatch(showNextImage());
    };

    const handlePrevious = () => {
        dispatch(showPreviousImage());
    };

    const handleSave = () => {
        dispatch(saveImage());
    };

    return (
        <div id="imageGalleryContainer" className="container">
            <canvas id="imageCanvas" width="400" height="300" ref={canvasRef}/>
            <div className="buttons-container">
                <button
                    id="prevButton"
                    className="gallery-button"
                    onClick={handlePrevious}
                >
                    &#8249;
                </button>
                <button
                    id="nextButton"
                    className="gallery-button"
                    onClick={handleNext}
                >
                    &#8250;
                </button>
            </div>
            <button
                id="saveButton"
                className="gallery-button"
                onClick={handleSave}
            >
                Save Image
            </button>
        </div>
    );
}

export default Gallery;
