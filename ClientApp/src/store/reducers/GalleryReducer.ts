import { Reducer } from 'redux';
import { GalleryAction, GalleryState } from '../types';
import {getDataFromServer} from "../../helpers/httpUtils";
import {downloadFile} from "../../helpers/fileUtils";

const initialState: GalleryState = {
    imageUrls: [],
    currentImageIndex: 0,
};

const galleryReducer: Reducer<GalleryState, GalleryAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'SET_IMAGE_URLS':
            return {
                ...state,
                imageUrls: action.payload,
            };
        case 'SHOW_PREVIOUS_IMAGE':
            return {
                ...state,
                currentImageIndex:
                    state.currentImageIndex > 0
                        ? state.currentImageIndex - 1
                        : state.imageUrls.length - 1, 
            };
        case 'SHOW_NEXT_IMAGE':
            return {
                ...state,
                currentImageIndex:
                    state.currentImageIndex < state.imageUrls.length - 1
                        ? state.currentImageIndex + 1
                        : 0, 
            };
        case 'SAVE_IMAGE':
            if (state.imageUrls.length > 0) {
                const url = state.imageUrls[state.currentImageIndex];
                
                (async () => {
                    const response = await getDataFromServer(`/api/file?url=${url}`);
                    if(response != undefined) {
                        const name = url.substring(url.lastIndexOf('/') + 1);

                        downloadFile(response.data, name);
                    }
                })();
            }
            return state;
        default:
            return state;
    }
};

export default galleryReducer;
