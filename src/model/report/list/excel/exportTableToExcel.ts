import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver';

const filterTableData = (tableId: string) => {
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) {
        console.error(`Table with id ${tableId} not found.`);
        return [];
    }

    const rows = Array.from(table.querySelectorAll('tr'));

    const headers = Array.from(rows[0].querySelectorAll('th')).map(th => {
        if (th.textContent === "Số lượng") {
            return "SL";
        }
        return th.textContent || ''
    });
    const data = rows.slice(1).map(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.textContent || '');
        return cells.slice(0, -2);
    });

    return [headers, ...data];
};

export const exportTableToExcel = (tableId: string, month: number, year: number) => {

    const data = filterTableData(tableId);

    if (data.length === 0) {
        console.error('No data to export.');
        return;
    }

    const titleRow = [[`BIÊN BẢN TỔNG HỢP BÀN GIAO THIẾT BỊ THÁNG ${month}/${year}`]];

    const newData = [[], [], ...titleRow, [], [], ...data];

    const ws = XLSX.utils.aoa_to_sheet(newData);

    ws['!merges'] = [
        {s: {r: 2, c: 0}, e: {r: 2, c: 7}} // Merge từ cột 0 đến cột 7 ở dòng 0
    ];

    ws['!cols'] = [
        {wch: 4}, // STT
        {wch: 16.62}, // Bên giao
        {wch: 20.25}, // Bên nhận
        {wch: 17.13}, // Thiết bị
        {wch: 4.25}, // SL
        {wch: 22.13},  // Mã thiết bị
        {wch: 10.25}, // Hiện trạng
        {wch: 12.75}     // Ngày bàn giao
    ];


    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wBout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([wBout], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const fileName = `Dữ-liệu-tháng-${month}-${year}.xlsx`;
    saveAs(blob, fileName);
};
