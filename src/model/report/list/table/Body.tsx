import React, {useEffect, useState} from 'react';
import {Report} from "../../../../context/report/ReportProvider";
import useReport from "../../../../context/report/useReport";
import Table from "./Table";
import ConfirmModal from './ConfirmModal';

const Body = () => {
    const {reportList, getAllReport} = useReport();
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllReport();
    }, [getAllReport]);

    const handleDelete = (report: Report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedReport) {
            console.log('Xóa', selectedReport);
            // Logic to handle delete
        }
        setIsModalOpen(false);
        setSelectedReport(null);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };

    return (
        <>
            <tbody className="text-stone-900 text-[15px]">
            {reportList.map((report: Report, index: number) => (
                <Table key={report.id} report={report} index={index} onDelete={() => handleDelete(report)}
                />
            ))}
            </tbody>
            {isModalOpen && (<ConfirmModal isOpen={isModalOpen} onClose={cancelDelete} onConfirm={confirmDelete}/>
            )}
        </>
    );
};

export default Body;
