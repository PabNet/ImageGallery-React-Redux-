import { createStore, applyMiddleware, combineReducers } from 'redux';
import termsOfUseReducer from '../reducers/TermsOfUseReducer'; 
import galleryReducer from '../reducers/GalleryReducer'; 
import appReducer from '../reducers/AppReducer'; 
import thunk from 'redux-thunk'; 

const rootReducer = combineReducers({
    termsOfUse: termsOfUseReducer,
    gallery: galleryReducer,
    app: appReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


