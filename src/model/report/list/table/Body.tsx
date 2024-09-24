import {useEffect} from 'react';
import {Report} from "../../../../context/report/ReportProvider";
import useReport from "../../../../context/report/useReport";
import Table from "./Table";

type Props = {
    handleUpdate: (record: Report) => void;
    handleDelete: (id: number) => void;
    selectedMonth: number;
    setSelectedMonth: (month: number) => void;
}

const Body = ({handleUpdate, handleDelete, selectedMonth}: Props) => {
    const {reportList, getAllReport} = useReport();

    const length = reportList.length;

    useEffect(() => {
        if (selectedMonth) {
            getAllReport(selectedMonth);
        }
    }, [getAllReport, selectedMonth]);

    return (
        <>
            <tbody className="text-stone-900 text-[15px]">
            {reportList.length > 0 && (reportList.map((report: Report, index: number) => (
                <Table key={report.id} report={report} index={index} length={length}
                       onUpdate={() => handleUpdate(report)}
                       onDelete={() => handleDelete(report.id as number)}/>
            )))}
            </tbody>
        </>
    );
};

export default Body;
