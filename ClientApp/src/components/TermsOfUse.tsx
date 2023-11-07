import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, hideModal, acceptTerms } from '../store/actions/TermsOfUseActions';
import Modal from './Modal';
import {RootState} from "../store/types";
import {setAccepted} from "../store/actions/AppActions";
import {getDataFromServer} from "../helpers/httpUtils";

function replacePlaceholdersInText(text: string, config: any) {
    const regex = /\[Name of Province\]|\[Name of City\]|\[Merchant Name\]|\[Email Address\]/g;

    return text.replace(regex, match => {
        switch (match) {
            case '[Name of Province]':
                return config.nameOfProvince;
            case '[Name of City]':
                return config.nameOfCity;
            case '[Merchant Name]':
                return config.merchantName;
            case '[Email Address]':
                return config.emailAddress;
            default:
                return match;
        }
    });
}

function TermsOfUse() {
    const termsOfUseState = useSelector((state: RootState) => state.termsOfUse);
    const dispatch = useDispatch();
    const [termsData, setTermsData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const configData = await getDataFromServer('/api/config');
            if(configData != undefined) {
                const apiUrl = configData.apiUrl;
                const dataFileName = configData.dataFileName;

                if (apiUrl && dataFileName) {
                    const data = await getDataFromServer(apiUrl + dataFileName);
                    const termsOfUse = data.terms_of_use;
                    const sortedParagraphs = termsOfUse.paragraphs.sort((a: any, b: any) => a.index - b.index);

                    const replacedParagraphs = sortedParagraphs.map((paragraph: { content: string; text: string }) => ({
                        ...paragraph,
                        content: replacePlaceholdersInText(paragraph.content || paragraph.text, configData),
                    }));

                    setTermsData(replacedParagraphs);
                } else {
                    console.error('apiUrl or dataFileName is empty.');
                }
            }
        };

        fetchData();
    }, []);
    
    const handleAccept = () => {
        dispatch(acceptTerms());
        dispatch(setAccepted(true));
    };

    const handleReject = () => {
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <div id="termsOfUse" className="container">
            <h1>Terms of Use</h1>
            <div id="termsContent">
                {termsData && (
                    termsData.map((paragraph, index) => (
                        <div key={index}>
                            <h2>{paragraph.title}</h2>
                            <p>{paragraph.content || paragraph.text}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="button-container">
                <button id="acceptButton" onClick={handleAccept}>Accept</button>
                <button id="rejectButton" onClick={handleReject}>Reject</button>
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal}/>
            )}
        </div>
    );
}

export default TermsOfUse;