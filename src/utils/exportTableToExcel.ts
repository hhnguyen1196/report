import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

const getCurrentDateTimeString = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${month}`;
};

const fileName = `Dữ liệu tháng ${getCurrentDateTimeString()}.xlsx`;

const filterTableData = (tableId: string) => {
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) {
        console.error(`Table with id ${tableId} not found.`);
        return [];
    }

    const rows = Array.from(table.querySelectorAll('tr'));

    const headers = Array.from(rows[0].querySelectorAll('th')).map(th => th.textContent || '');
    const data = rows.slice(1).map(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.textContent || '');
        return cells.slice(0, -2);
    });

    return [headers, ...data];
};

export const exportTableToExcel = (tableId: string) => {
    const data = filterTableData(tableId);

    if (data.length === 0) {
        console.error('No data to export.');
        return;
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wBout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([wBout], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    saveAs(blob, fileName);
};
