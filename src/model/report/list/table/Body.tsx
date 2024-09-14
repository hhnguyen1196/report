import {useEffect} from "react";
import {Report} from "../../../../context/report/ReportProvider";
import useReport from "../../../../context/report/useReport";
import Table from "./Table";


const Body = () => {
    const {reportList, getAllReport} = useReport();
    useEffect(() => {
        getAllReport();
    }, [getAllReport]);
    return (
        <tbody className="text-stone-900 text-[15px]">
        {reportList.map((report: Report) => (
                <Table report={report} key={report.id}/>
            )
        )}
        </tbody>
    );
};

export default Body;