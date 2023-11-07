import React from 'react';

interface ModalProps {
    onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
    return (
        <div id="modal" className="modal">
            <div className="modal-content">
        <span id="closeModalButton" className="close" onClick={onClose}>
          &times;
        </span>
                <p>To continue using the application, please accept the Terms of Use.</p>
            </div>
        </div>
    );
}

export default Modal;
