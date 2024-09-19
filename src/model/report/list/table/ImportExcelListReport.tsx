import React, {useState} from "react";
import {importExcelData} from "../../../../utils/importExcelToTable";
import useReport from "../../../../context/report/useReport";

const ImportExcelListReport = () => {
    const [fileKey, setFileKey] = useState(0);
    const {deleteReport} = useReport();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const data = await importExcelData(file);
                setFileKey(prevKey => prevKey + 1);
                event.target.value = '';
                console.log("Lần 1")
                console.log(data); // Xử lý dữ liệu đã nhập theo nhu cầu
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
