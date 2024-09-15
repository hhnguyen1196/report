import Header from "./table/Header";
import Button from "../../../layout/Button";
import {useNavigate} from "react-router-dom";
import Body from "./table/Body";
import {useState} from "react";
import FormModal from "../form/FormModal";
import FormReport from "../form/FormReport";
import ConfirmModal from "./table/ConfirmModal";
import useReport from "../../../context/report/useReport";
import {Report} from "../../../context/report/ReportProvider";

const ListReport = () => {
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isModalTableOpen, setIsModalTableOpen] = useState(false);
    const {deleteReport} = useReport();
    const [selectedReport, setSelectedReport] = useState<number | null>();
    const [selectedReportUpdate, setSelectedReportUpdate] = useState<Report>();
    const navigate = useNavigate();
    const openModal = () => {
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

    const handleUpdate = (record: Report) => {
        setSelectedReportUpdate(record);
        setIsModalFormOpen(true);
    };

    return (
        <div className="px-[100px]">
            <h1 className="uppercase font-bold text-3xl text-stone-600 m-2 justify-center text-center">Danh sách tổng
                hợp bàn giao thiết bị</h1>
            <Button onClick={openModal} type="insertReport">Tạo mới</Button>
            <div className="mt-2">
                <div className="shadow overflow-hidden rounded border-gray-200">
                    <table className="table table-fixed min-w-full bg-white">
                        <Header/>
                        <Body handleUpdate={handleUpdate} handleDelete={handleDelete}/>
                    </table>
                    {isModalTableOpen && (<ConfirmModal isOpen={isModalTableOpen} onConfirm={confirmDelete}
                                                        onClose={cancelDelete} />)}
                </div>
            </div>
            <FormModal isOpen={isModalFormOpen} onClose={closeModal}>
                <FormReport onSuccess={onSuccess} onClose={closeModal} data={selectedReportUpdate} />
            </FormModal>
        </div>
    );
}

export default ListReport