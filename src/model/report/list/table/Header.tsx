import './Header.css';

const Header = () => {
  const styles = "px-3 py-2 text-center border border-slate-300";

  return (
    <thead className="bg-gray-700 text-white text-[15px]">
    <tr className="text-left font-bold">
      <th className={`${styles} serialNumber`}>STT</th>
      <th className={`${styles} deliveryPartner`}>Bên giao</th>
      <th className={`${styles} recipient`}>Bên nhận</th>
      <th className={`${styles} equipment`}>Thiết bị</th>
      <th className={`${styles} quantity`}>Số lượng</th>
      <th className={`${styles} deviceCode`}>Mã thiết bị</th>
      <th className={`${styles} condition`}>Hiện trạng</th>
      <th className={`${styles} deliveryDate`}>Ngày bàn giao</th>
      <th className={`${styles} updateOrDelete`}></th>
    </tr>
    </thead>
  );
};

export default Header;