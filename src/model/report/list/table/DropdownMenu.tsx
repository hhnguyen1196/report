import React, {useState, useEffect, useRef} from 'react';
import Button from "../../../../layout/Button";

type Props = {
    onUpdate: () => void;
    onDelete: () => void;
};

const DropdownMenu = ({onUpdate, onDelete}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleUpdate = () => {
        onUpdate();
        setIsOpen(false);
    };

    const handleDelete = () => {
        onDelete();
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <Button onClick={toggleMenu} type="updateOrDateTable">
                ...
            </Button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <Button onClick={handleUpdate} type="selectUpdateOrDeleteReport">
                        Cập nhật
                    </Button>
                    <Button onClick={handleDelete} type="selectUpdateOrDeleteReport">
                        Xóa
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
