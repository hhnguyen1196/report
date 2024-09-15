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

    const styles = "px-3 py-2 border border-slate-300";
    const center = " text-center";

    return (
        <>
            <tr className="border-b-2 relative">
                <td className={`${styles} ${center} serialNumber`}>{index + 1}</td>
                <td className={`${styles} deliveryPartner`}>{report.deliveryPartner}</td>
                <td className={`${styles} recipient`}>{report.recipient}</td>
                <td className={`${styles} equipment`}>{report.equipment}</td>
                <td className={`${styles} quantity ${center}`}>{report.quantity}</td>
                <td className={`${styles} deviceCode`}>{report.deviceCode}</td>
                <td className={`${styles} condition ${center}`}>{report.condition}</td>
                <td className={`${styles} deliveryDate ${center}`}>{format(report.deliveryDate, 'dd/MM/yyyy').toString()}</td>
                <td className={`${styles} updateOrDelete text-center`}>
                    <DropdownMenu onUpdate={handleUpdate} onDelete={handleDelete} index={index} length={length}/>
                </td>
                <td className="hidden">{report.id}</td>
            </tr>
        </>
    );
};

export default Table;
