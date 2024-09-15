import Header from "./table/Header";
import Button from "../../../layout/Button";
import {useNavigate} from "react-router-dom";
import Body from "./table/Body";
import {useState} from "react";
import FormModal from "../form/FormModal";
import FormReport from "../form/FormReport";

const ListReport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const onSuccess = () => {
        setIsModalOpen(false);
        navigate("/");
    }

    return (
        <div className="px-[100px]">
            <h1 className="uppercase font-bold text-3xl text-stone-600 m-2 justify-center text-center">Danh sách tổng
                hợp bàn giao thiết bị</h1>
            <Button onClick={openModal} type="insertReport">Tạo mới</Button>
            <div className="w-full mt-2">
                <div className="shadow overflow-hidden rounded border-gray-200">
                    <table className="table table-fixed min-w-full bg-white">
                        <Header/>
                        <Body/>
                    </table>
                </div>
            </div>
            <FormModal isOpen={isModalOpen} onClose={closeModal}>
                <FormReport onSuccess={onSuccess} onClose={closeModal}/>
            </FormModal>
        </div>
    );
}

export default ListReport