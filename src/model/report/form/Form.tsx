import Button from "../../../layout/Button";

const Form = () => {
    return <div>
        <form>
            <div className="flex justify-center">
                <div className="md:w-1/4">
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-bold" htmlFor="deliveryPartner">
                                Bên giao
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="deliveryPartner" type="text"/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-bold" htmlFor="recipient">
                                Bên nhận
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="recipient" type="text"/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-bold" htmlFor="equipment">
                                Thiết bị
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="equipment" type="text"/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-bold" htmlFor="quantity">
                                Số lượng
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="quantity" type="text"/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-bold" htmlFor="deviceCode">
                                Mã thiết bị
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="deviceCode" type="text"/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-bold" htmlFor="condition">
                                Hiện trạng
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="condition" type="text"/>
                        </div>
                    </div>
                    <div className="py-1">
                        <div className="py-1">
                            <label className="font-bold" htmlFor="deliveryDate">
                                Ngày bàn giao
                            </label>
                        </div>
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded py-2 px-2 focus:outline-none focus:border-gray-600"
                                id="deliveryDate" type="text"/>
                        </div>
                    </div>
                    {/*<Button onClick={() => } type={}/>*/}
                </div>
            </div>
        </form>
    </div>
}

export default Form;