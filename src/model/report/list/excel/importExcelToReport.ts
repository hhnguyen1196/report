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

type Table = {
    equipment: string;
    quantity: number;
    deviceCode: string;
    condition: string;
}

export const importExcelToReport = (file: File): Promise<Props[] | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const bstr = event.target?.result;
            const workbook = XLSX.read(bstr, {type: 'binary'});
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const deliveryDate: string = worksheet['A4'].v;
            const deliveryPartner = worksheet['C6'].v + " - " + worksheet['C8'].v;
            const recipient = worksheet['C11'].v + " - " + worksheet['C13'].v;
            const columns = [1, 4, 5, 6];
            const rows = [19, 20, 21];

            let allRowData: Table[] = [];

            rows.forEach((row) => {
                let rowData = {
                    equipment: '',
                    quantity: 0,
                    deviceCode: '',
                    condition: '',
                };

                columns.forEach((col, index) => {
                    const cell = worksheet[XLSX.utils.encode_cell({r: row - 1, c: col})];
                    if (cell) {
                        const cellValue = cell.v;
                        switch (index) {
                            case 0:
                                rowData.equipment = cellValue;
                                break;
                            case 1:
                                rowData.quantity = cellValue;
                                break;
                            case 2:
                                rowData.deviceCode = cellValue;
                                break;
                            case 3:
                                rowData.condition = cellValue;
                                break;
                            default:
                                break;
                        }
                    }
                });
                allRowData.push(rowData);
            });
            const formattedData = formatData(allRowData, deliveryDate, deliveryPartner, recipient);
            resolve(formattedData);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsBinaryString(file);
    });
};

const formatData = (rawData: Table[],
                    deliveryDate: string, deliveryPartner:
                    string,
                    recipient: string): Props[] | null => {

    const dateArray = deliveryDate.split(" ").filter(e => e.trim() !== "" && !isNaN(Number(e)));
    const date: Date = new Date(Number(dateArray[2]), Number(dateArray[1]) - 1, Number(dateArray[0]));
    return rawData.map(data => ({
        id: 0 || null,
        deliveryPartner: deliveryPartner,
        recipient: recipient,
        equipment: data.equipment,
        quantity: data.quantity,
        deviceCode: data.deviceCode,
        condition: data.condition,
        deliveryDate: date
    }))
}

