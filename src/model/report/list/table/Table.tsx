import React, {useState} from 'react';
import {Report} from "../../../../context/report/ReportProvider";
import {format} from 'date-fns';
import DropdownMenu from './DropdownMenu';
import ConfirmModal from './ConfirmModal';

type Props = {
    report: Report;
    index: number;
    onDelete: () => void;
}

const Table = ({report, index, onDelete}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = () => {
        console.log('Cập nhật', report);
        // Logic to handle update
    };

    const handleDelete = () => {
        onDelete(); //
    };

    const confirmDelete = () => {
        console.log('Xóa', report);
        // Logic to handle delete
        setIsModalOpen(false);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    const styles = "px-3 py-2 border border-slate-300";
    const center = " text-center";

    return (
        <>
            <tr className="border-b-2">
                <td className={`${styles} ${center} serialNumber`}>{index + 1}</td>
                <td className={`${styles} deliveryPartner`}>{report.deliveryPartner}</td>
                <td className={`${styles} recipient`}>{report.recipient}</td>
                <td className={`${styles} equipment`}>{report.equipment}</td>
                <td className={`${styles} quantity ${center}`}>{report.quantity}</td>
                <td className={`${styles} deviceCode`}>{report.deviceCode}</td>
                <td className={`${styles} condition ${center}`}>{report.condition}</td>
                <td className={`${styles} deliveryDate ${center}`}>{format(report.deliveryDate, 'dd/MM/yyyy').toString()}</td>
                <td className={`${styles} updateOrDelete text-center`}>
                    <DropdownMenu
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                </td>
                <td className="hidden">{report.id}</td>
            </tr>
            {isModalOpen && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    onClose={cancelDelete}
                    onConfirm={confirmDelete}
                />
            )}
        </>
    );
};

export default Table;
