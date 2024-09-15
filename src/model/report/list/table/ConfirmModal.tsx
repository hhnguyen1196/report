import Button from "../../../../layout/Button";
import {useEffect} from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const ConfirmModal = ({isOpen, onClose, onConfirm}: Props) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
                <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <Button onClick={onConfirm} type="confirmDelete">
                        Đồng ý
                    </Button>
                    <Button onClick={onClose} type="cancelDelete">
                        Hủy bỏ
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;