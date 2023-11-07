export interface AppState {
    accepted: boolean;
}

export type AppAction = { type: 'SET_ACCEPTED'; payload: boolean };

export interface TermsOfUseState {
    showModal: boolean
}

export type TermsOfUseAction =
    | { type: 'SHOW_MODAL' }
    | { type: 'HIDE_MODAL' }
    | { type: 'ACCEPT_TERMS' };

export interface GalleryState {
    imageUrls: string[]; 
    currentImageIndex: number; 
}

export type GalleryAction =
    | { type: 'SET_IMAGE_URLS'; payload: string[] } 
    | { type: 'SHOW_PREVIOUS_IMAGE' } 
    | { type: 'SHOW_NEXT_IMAGE' } 
    | { type: 'SAVE_IMAGE' }; 


export interface RootState {
    termsOfUse: TermsOfUseState;
    gallery: GalleryState;
    app: AppState;
}