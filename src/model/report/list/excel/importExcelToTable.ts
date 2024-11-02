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
            const workbook = XLSX.read(bstr, {type: 'binary'});
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1, raw: false});
            console.log(jsonData.length)
            console.log(jsonData)
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

        return rawData.slice(1).filter(row => row.length !== 0).map((row: any) => {
                const deliveryDateValue = row[headers.indexOf('Ngày bàn giao')];
                if (!deliveryDateValue.includes('/')) {
                    throw new Error('Lỗi định dạng ngày')
                }
                const parts = deliveryDateValue.split('/');
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1;
                const year = parts[2].length === 4 ? parseInt(parts[2], 10) : parseInt('20' + parts[2], 10);
                const deliveryDate: Date = new Date(year, month, day);

                return {
                    id: row[headers.indexOf('STT')] || null,
                    deliveryPartner: row[headers.indexOf('Bên giao')],
                    recipient: row[headers.indexOf('Bên nhận')],
                    equipment: row[headers.indexOf('Thiết bị')],
                    quantity: row[headers.indexOf('SL')],
                    deviceCode: row[headers.indexOf('Mã thiết bị')],
                    condition: row[headers.indexOf('Hiện trạng')],
                    deliveryDate: deliveryDate
                };
            }
        ).filter(item => item.deliveryDate.toString() !== "Invalid Date");
    }
;
