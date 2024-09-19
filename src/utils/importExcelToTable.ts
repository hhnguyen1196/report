import * as XLSX from 'xlsx';

type Props = {
    id: number | null;
    deliveryPartner: string;
    recipient: string;
    equipment: string;
    quantity: string;
    deviceCode: string;
    condition: string;
    deliveryDate: Date | null;
}

export const importExcelData = (file: File): Promise<Props[] | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const bstr = event.target?.result;
            const workbook = XLSX.read(bstr, {type: 'binary'});
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            const formattedData = formatData(jsonData);
            resolve(formattedData);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsBinaryString(file);
    });
};

const formatData = (rawData: any[]): Props[] | null => {
    if (rawData.length === 0) return null;

    const headers = rawData[0];
    const requiredHeaders = [
        'STT', 'Bên giao', 'Bên nhận', 'Thiết bị',
        'Số lượng', 'Mã thiết bị', 'Hiện trạng', 'Ngày bàn giao'
    ];

    if (!requiredHeaders.every(header => headers.includes(header))) {
        return null
    }

    return rawData.slice(1).map((row: any) => ({
        id: row[headers.indexOf('id') || ''],
        deliveryPartner: row[headers.indexOf('Bên giao')] || '',
        recipient: row[headers.indexOf('Bên nhận')] || '',
        equipment: row[headers.indexOf('Thiết bị')] || '',
        quantity: row[headers.indexOf('Số lượng')] || '',
        deviceCode: row[headers.indexOf('Mã thiết bị')] || '',
        condition: row[headers.indexOf('Hiện trạng')] || '',
        deliveryDate: row[headers.indexOf('Ngày bàn giao')] ? new Date(row[headers.indexOf('Ngày bàn giao')]) : null,
    }));
};
