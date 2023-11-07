import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { RootState } from './store/types';
import Gallery from './components/Gallery';
import TermsOfUse from './components/TermsOfUse';

function App() {

    const appState = useSelector((state: RootState) => state.app);
    const isAccepted = appState.accepted;
    

    return (
        <div>
            {isAccepted ? <Gallery /> : <TermsOfUse />}
        </div>
    );
}

export default App;
