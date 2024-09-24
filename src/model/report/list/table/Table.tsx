import {Report} from "../../../../context/report/ReportProvider";
import {format} from 'date-fns';
import DropdownMenu from './DropdownMenu';

type Props = {
    report: Report;
    index: number;
    onUpdate: () => void;
    onDelete: () => void;
    length: number;
}

const Table = ({report, index, onUpdate, onDelete, length}: Props) => {

    const handleUpdate = () => {
        onUpdate();
    };

    const handleDelete = () => {
        onDelete();
    };

    const styles = "px-3 py-1.5 border";
    const center = " text-center";

    return (
        <>
            <tr className="border-b-2 relative hover:bg-gray-100">
                <td className={`${styles}${center}`}>{index + 1}</td>
                <td className={`${styles}`}>{report.deliveryPartner}</td>
                <td className={`${styles}`}>{report.recipient}</td>
                <td className={`${styles}`}>{report.equipment}</td>
                <td className={`${styles}${center}`}>{report.quantity}</td>
                <td className={`${styles}`}>{report.deviceCode}</td>
                <td className={`${styles}${center}`}>{report.condition === "NEW" ? "Mới" : "Cũ"}</td>
                <td className={`${styles}${center}`}>{report.deliveryDate !== null
                    ? format(report.deliveryDate, 'dd/MM/yyyy').toString() : ''}</td>
                <td className={`${styles} updateOrDelete text-center`}>
                    <DropdownMenu onUpdate={handleUpdate} onDelete={handleDelete} index={index} length={length}/>
                </td>
                <td className="hidden">{report.id}</td>
            </tr>
        </>
    );
};

export default Table;
