import Header from "./table/Header";
import Button from "../../../layout/Button";
import {useNavigate} from "react-router-dom";
import Body from "./table/Body";


const Report = () => {
    const navigate = useNavigate();
    return (
        <div className="px-[100px]">
            <h1 className="uppercase font-bold text-3xl text-stone-600 m-2 justify-center text-center">Danh sách tổng
                hợp bàn giao thiết bị</h1>
            <Button onClick={() => navigate("/report-insert")} type="insertReport">Tạo mới</Button>
            <Button onClick={() => navigate("/report-update")} type="updateReport">Chỉnh sửa</Button>
            <Button onClick={() => navigate("/report-delete")} type="deleteReport">Xóa</Button>
            <div className="w-full mt-2">
                <div className="shadow overflow-hidden rounded border-gray-200">
                    <table className="table table-fixed min-w-full bg-white">
                        <Header/>
                        <Body/>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Report