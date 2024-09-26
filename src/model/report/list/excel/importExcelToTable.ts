import * as XLSX from 'xlsx';

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

export const importExcelData = (file: File): Promise<Props[] | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const bstr = event.target?.result;
            const workbook = XLSX.read(bstr, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
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
        'SL', 'Mã thiết bị', 'Hiện trạng', 'Ngày bàn giao'
    ];

    if (!requiredHeaders.every(header => headers.includes(header))) {
        return null;
    }

    return rawData.slice(1).map((row: any) => {
        const dateString: string = row[headers.indexOf('Ngày bàn giao')] || '';
        const parts: string[] = dateString.split("/");

        const day: number = parseInt(parts[0]);
        const month: number = parseInt(parts[1]) - 1;
        const year: number = parseInt(parts[2]);
        const deliveryDate: Date = new Date(Date.UTC(year, month, day));

        return {
            id: row[headers.indexOf('STT')] || null,
            deliveryPartner: row[headers.indexOf('Bên giao')],
            recipient: row[headers.indexOf('Bên nhận')],
            equipment: row[headers.indexOf('Thiết bị')],
            quantity: row[headers.indexOf('SL')],
            deviceCode: row[headers.indexOf('Mã thiết bị')],
            condition: row[headers.indexOf('Hiện trạng')],
            deliveryDate: deliveryDate,
        };
    });
};
