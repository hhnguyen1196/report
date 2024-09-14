import {Report} from "../../../../context/report/ReportProvider";

type Props = {
  report: Report
}

const Table = ({report}: Props) => {
  const styles = "px-3 py-2 border border-slate-300";
  const center = " text-center";
  return (
    <tr className="border-b-2">
      <td className={styles + center}>{report.id}</td>
      <td className={styles}>{report.deliveryPartner}</td>
      <td className={styles}>{report.recipient}</td>
      <td className={styles}>{report.equipment}</td>
      <td className={styles + center}>{report.quantity}</td>
      <td className={styles}>{report.deviceCode}</td>
      <td className={styles + center}>{report.condition}</td>
      <td className={styles + center}>{report.deliveryDate.toString()}</td>
      <td className={styles}>Sửa/Xóa</td>
    </tr>
  );
};

export default Table;