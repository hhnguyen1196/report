import React, {useState} from "react";
import {importExcelData} from "../excel/importExcelToTable";
import useReport from "../../../../context/report/useReport";
import {Report} from "../../../../context/report/ReportProvider";
import {toast} from "react-toastify";

type Props = {
    id: number | null;
    deliveryPartner: string;
    recipient: string;
    equipment: string;
    quantity: number;
    deviceCode: string;
    condition: string;
    deliveryDate: Date;
}

const ImportExcelListReport = () => {
    const [fileKey, setFileKey] = useState(0);
    const {insertListReport} = useReport();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const data: Props[] | null = await importExcelData(file);
                const convertData: Report[] | undefined = data?.map(item => ({
                    id: null,
                    deliveryPartner: item.deliveryPartner,
                    recipient: item.recipient,
                    equipment: item.equipment,
                    quantity: item.quantity,
                    deviceCode: item.deviceCode,
                    condition: item.condition === "Mới" ? "NEW" : item.condition === "" ? "NEW" : "OLD",
                    deliveryDate: item.deliveryDate,
                }));
                setFileKey(prevKey => prevKey + 1);
                event.target.value = '';
                await insertListReport(convertData);
                await toast.success('Nhập file dữ liệu thành công!', {
                    icon: false,
                    className: 'bg-red-600 text-white text-center rounded-lg'
                });
            } catch (error) {
                console.error("Lỗi khi đọc file:", error);
            }
        }
    };

    return <label
        className="rounded-md mx-3 mt-4 px-4 py-2 border-solid border border-red-600 bg-white text-red-500 cursor-pointer">
        Nhập file
        <input key={fileKey} className="hidden" type="file" accept=".xlsx, .xls" onChange={handleFileUpload}/>
    </label>
};

export default ImportExcelListReport;
