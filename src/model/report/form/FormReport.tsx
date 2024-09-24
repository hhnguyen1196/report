import React, {FormEvent, useEffect, useState} from "react";
import Button from "../../../layout/Button";
import useReport from "../../../context/report/useReport";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {vi} from 'date-fns/locale';
import {Report} from "../../../context/report/ReportProvider";

type Props = {
    onSuccess: () => void;
    onClose: () => void;
    data: Report | null | undefined;
    setSelectedMonth: (month: number) => void;
}

const FormReport = ({onSuccess, onClose, data, setSelectedMonth}: Props) => {
    const {insertReport, updateReport} = useReport();
    const [formData, setFormData] = useState<Report>({
        id: null,
        deliveryPartner: '',
        recipient: '',
        equipment: '',
        quantity: 0,
        deviceCode: '',
        condition: 'NEW',
        deliveryDate: new Date(),
    });

    useEffect(() => {
        if (data) {
            setFormData(data)
        } else {
            resetState();
        }
    }, [data]);

    const resetState = () => {
        setFormData({
            id: null,
            deliveryPartner: '',
            recipient: '',
            equipment: '',
            quantity: 0,
            deviceCode: '',
            condition: 'NEW',
            deliveryDate: new Date(),
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData({...formData, deliveryDate: date});
        } else {
            setFormData({...formData, deliveryDate: new Date()});
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (formData.id === null) {
            await insertReport(formData);
            setSelectedMonth(formData.deliveryDate.getMonth())
        } else {
            await updateReport(formData);
            setSelectedMonth(formData.deliveryDate.getMonth())
        }
        onSuccess();
    };

    return <div>
        <h1 className="font-semibold leading-7 text-gray-900 text-2xl text-center my-4">{formData.id === null ? "Đăng ký mượn thiết bị" : "Cập nhật mượn thiết bị"}</h1>
        <form method="POST" onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <div className="md:w-3/4">
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-semibold" htmlFor="deliveryPartner">
                                Bên giao
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="deliveryPartner" type="text" name="deliveryPartner" value={formData.deliveryPartner}
                                onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-semibold" htmlFor="recipient">
                                Bên nhận
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="recipient" type="text" name="recipient" value={formData.recipient}
                                onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-semibold" htmlFor="equipment">
                                Thiết bị
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="equipment" type="text" name="equipment" value={formData.equipment}
                                onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-semibold" htmlFor="quantity">
                                Số lượng
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="quantity" type="number" name="quantity" value={formData.quantity}
                                onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-semibold" htmlFor="deviceCode">
                                Mã thiết bị
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="deviceCode" type="text" name="deviceCode" value={formData.deviceCode}
                                onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-semibold" htmlFor="condition">
                                Hiện trạng
                            </label>
                        </div>
                        <div>
                            <select
                                className="cursor-pointer w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="condition" name="condition" value={formData.condition} onChange={handleChange}>
                                <option value="NEW">Mới</option>
                                <option value="OLD">Cũ</option>
                            </select>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-semibold" htmlFor="deliveryDate">
                                Ngày bàn giao
                            </label>
                        </div>

                        <DatePicker
                            className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                            id="deliveryDate" name="deliveryDate" wrapperClassName="datePicker"
                            selected={formData.deliveryDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy"
                            locale={vi}
                        />
                    </div>
                    <div className="flex mt-3">
                        <div>
                            <Button onClick={handleSubmit} type="confirm">Xác nhận</Button>
                        </div>
                        <div className="px-6">
                            <Button onClick={onClose} type="cancel">Đóng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
}

export default FormReport;