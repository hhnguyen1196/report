import React, {useEffect, useRef, useState} from 'react';
import Button from "../../../../layout/Button";

type Props = {
    onUpdate: () => void;
    onDelete: () => void;
    length: number;
    index: number
};

const DropdownMenu = ({onUpdate, onDelete, length, index}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleMenu = () => setIsOpen(!isOpen);
    const style = length - index > 2 ?
        "absolute right-0 mt-2.5 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50" :
        "absolute right-0 bottom-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50"

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
        <div className="inline-block text-left" ref={menuRef}>
            <Button onClick={toggleMenu} type="updateOrDateTable">
                ...
            </Button>
            {isOpen && (
                <div className={style}>
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
