import React, {useEffect} from "react";
import ReactDOM from "react-dom";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode;
}

const FormModal = ({isOpen, onClose, children}: Props) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);


    if (!isOpen) {
        return null;
    }

    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        console.log("FormModal root element not found");
        return null;
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white p-3 rounded shadow-lg w-2/5 max-h-screen overflow-auto">
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default FormModal;