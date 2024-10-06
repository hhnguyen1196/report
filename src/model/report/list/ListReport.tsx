import Header from "./table/Header";
import Button from "../../../layout/Button";
import Body from "./table/Body";
import React, {useEffect, useState} from "react";
import FormModal from "../form/FormModal";
import FormReport from "../form/FormReport";
import ConfirmModal from "./table/ConfirmModal";
import useReport from "../../../context/report/useReport";
import {initialState, Report} from "../../../context/report/ReportProvider";

import ImportExcelListReport from "./table/ImportExcelListReport";
import {exportTableToExcel} from "./excel/exportTableToExcel";
import {toast, ToastContainer, Bounce} from "react-toastify";
import Loading from "../../../layout/Loading";

const ListReport = () => {
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isModalTableOpen, setIsModalTableOpen] = useState(false);
    const {isLoading, deleteReport} = useReport();
    const [selectedReport, setSelectedReport] = useState<number | null>();
    const [selectedReportUpdate, setSelectedReportUpdate] = useState<Report>();
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [tempYear, setTempYear] = useState<string>(new Date().getFullYear().toString());

    useEffect(() => {
        setSelectedMonth(new Date().getMonth() + 1);
        setSelectedYear(new Date().getFullYear());
    }, []);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = Number(e.target.value);
        setSelectedMonth(month);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const year = e.target.value;
        if (year.length <= 4 && /^\d*$/.test(year)) {
            setTempYear(year)
        }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const year = Number(tempYear);
            if (!isNaN(year) && year > 2000 && year < 2100) {
                setSelectedYear(year);
            }
            setTempYear(tempYear);
        }
    };

    const resetState = () => {
        setSelectedReportUpdate(initialState.report);
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
    }

    const confirmDelete = async () => {
        setIsModalTableOpen(false);
        if (selectedReport) {
            await deleteReport(selectedReport)
            await toast.success('Xóa dữ liệu thành công!', {
                icon: false,
                className: 'bg-red-600 text-white text-center rounded-lg'
            });
        }
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

    const handleExport = () => {
        exportTableToExcel('table', selectedMonth, selectedYear);
    };

    return (
        <div className="px-[100px]">
            <h1 className="uppercase font-bold text-3xl text-stone-600 m-2 justify-center text-center">Danh sách tổng
                hợp bàn giao thiết bị</h1>
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <Loading />
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnFocusLoss
                theme="light"
                transition={Bounce}
                hideProgressBar={true}
            />
            <Button onClick={openModal} type="insertReport">Tạo mới</Button>
            <select
                className="border border-red-600 text-black px-2 py-2 mx-4 rounded-md cursor-pointer focus:border-gray-600 focus:outline-none"
                value={selectedMonth}
                onChange={handleMonthChange}>
                <option value="" disabled>Chọn tháng</option>
                {Array.from({length: 12}, (_, month) => (
                    <option key={month + 1} value={month + 1}>Tháng {month + 1}</option>
                ))}
            </select>
            <input
                className="border border-red-600 w-1/12 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                value={tempYear} type="text" onChange={handleYearChange} onKeyUp={handleKeyUp}
                maxLength={4}>
            </input>
            <div className="mt-3">
                <div className="shadow overflow-hidden">
                    <table className="table table-fixed min-w-full border-collapse" id="table">
                        <Header/>
                        <Body handleUpdate={handleUpdate} handleDelete={handleDelete}
                              selectedMonth={selectedMonth}
                              selectedYear={selectedYear}/>
                    </table>

                    {isModalTableOpen && (<ConfirmModal isOpen={isModalTableOpen} onConfirm={confirmDelete}
                                                        onClose={cancelDelete}/>)}
                </div>
            </div>
            <Button onClick={handleExport} type={"exportExcel"}>
                Xuất file
            </Button>
            <ImportExcelListReport></ImportExcelListReport>

            <FormModal isOpen={isModalFormOpen} onClose={closeModal}>
                <FormReport onSuccess={onSuccess} onClose={closeModal} data={selectedReportUpdate}
                            onMonthUpdate={setSelectedMonth}/>
            </FormModal>
        </div>
    );
}

export default ListReport