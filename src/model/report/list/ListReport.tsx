import Header from "./table/Header";
import Button from "../../../layout/Button";
import {useNavigate} from "react-router-dom";
import Body from "./table/Body";
import React, {useEffect, useState} from "react";
import FormModal from "../form/FormModal";
import FormReport from "../form/FormReport";
import ConfirmModal from "./table/ConfirmModal";
import useReport from "../../../context/report/useReport";
import {Report} from "../../../context/report/ReportProvider";
import {exportTableToExcel} from "../../../utils/exportTableToExcel";
import ImportExcelListReport from "./table/ImportExcelListReport";

const ListReport = () => {
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isModalTableOpen, setIsModalTableOpen] = useState(false);
    const {deleteReport} = useReport();
    const [selectedReport, setSelectedReport] = useState<number | null>();
    const [selectedReportUpdate, setSelectedReportUpdate] = useState<Report>();
    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

    useEffect(() => {
        setSelectedMonth(new Date().getMonth() + 1);
    }, []);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = Number(e.target.value);
        setSelectedMonth(month);
    };

    const resetState = () => {
        setSelectedReportUpdate(undefined);
    };

    const openModal = () => {
        resetState();
        setIsModalFormOpen(true)
    }
    const closeModal = () => {
        setIsModalFormOpen(false)
    }

    const onSuccess = () => {
        setIsModalFormOpen(false);
        navigate("/");
    }

    const confirmDelete = () => {
        if (selectedReport) {
            deleteReport(selectedReport)
        }
        setIsModalTableOpen(false);
        setSelectedReport(null);
    };

    const cancelDelete = () => {
        setIsModalTableOpen(false);
        setSelectedReport(null);
    };

    const handleDelete = (id: number) => {
        setSelectedReport(id);
        setIsModalTableOpen(true);
    };

    const handleUpdate = (report: Report) => {
        const data = {...report, condition: report.condition}
        setSelectedReportUpdate(data);
        setIsModalFormOpen(true);
    };

    return (
        <div className="px-[100px]">
            <h1 className="uppercase font-bold text-3xl text-stone-600 m-2 justify-center text-center">Danh sách tổng
                hợp bàn giao thiết bị</h1>
            <Button onClick={openModal} type="insertReport">Tạo mới</Button>
            <select
                className="border border-red-600 text-black px-2 py-2 mx-4 rounded-md cursor-pointer focus:border-red-600 focus:outline-none"
                value={selectedMonth ?? ''}
                onChange={handleMonthChange}>
                <option value="" disabled>Chọn tháng</option>
                {Array.from({length: 12}, (_, month) => (
                    <option key={month + 1} value={month + 1}>Tháng {month + 1}</option>
                ))}
            </select>
            <div className="mt-3">
                <div className="shadow overflow-hidden">
                    <table className="table table-fixed min-w-full border-collapse" id="table">
                        <Header/>
                        <Body handleUpdate={handleUpdate} handleDelete={handleDelete} selectedMonth={selectedMonth}
                              setSelectedMonth={setSelectedMonth}/>
                    </table>

                    {isModalTableOpen && (<ConfirmModal isOpen={isModalTableOpen} onConfirm={confirmDelete}
                                                        onClose={cancelDelete}/>)}
                </div>
            </div>
            <Button onClick={() => exportTableToExcel('table')} type={"exportExcel"}>
                Xuất file
            </Button>
            <ImportExcelListReport></ImportExcelListReport>

            <FormModal isOpen={isModalFormOpen} onClose={closeModal}>
                <FormReport onSuccess={onSuccess} onClose={closeModal} data={selectedReportUpdate}
                            setSelectedMonth={setSelectedMonth}/>
            </FormModal>
        </div>
    );
}

export default ListReport