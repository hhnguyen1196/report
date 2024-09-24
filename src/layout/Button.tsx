import {MouseEventHandler, ReactNode} from "react";

type Props = {
  children?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: string;
  buttonType?: 'button' | 'submit' | 'reset';
}

type Styles = {
  [key: string]: string;
};

const Button = ({children, onClick, type, buttonType = "button"}: Props) => {
  const insertReport = "rounded-md px-4 py-2 text-white bg-red-600 hover:bg-red-500 focus:border-red-600 focus:outline-none";
  const updateReport = "rounded-md px-4 py-2 bg-yellow-400 hover:bg-yellow-300";
  const deleteReport = "rounded-md px-4 py-2 text-white bg-red-600 hover:bg-red-500";
  const confirm = "rounded-md px-4 py-2 text-white bg-red-600 hover:bg-red-500 my-3";
  const cancel = "rounded-md px-4 py-2 text-red-600 bg-white-600 my-3 border-solid border border-red-600";
  const updateOrDateTable = "px-2 py-1 font-bold rounded hover:bg-gray-200";
  const selectUpdateOrDeleteReport = "block w-full px-4 py-2.5 text-left hover:bg-gray-200";
  const confirmDelete = "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600";
  const cancelDelete = "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400";
  const exportExcel = "rounded-md mt-4 px-4 py-2 border-solid border border-red-600 bg-white-400 text-red-500 focus:border-red-600 focus:outline-none";
  const importExcel = "rounded-md mx-3 mt-4 px-4 py-2 border-solid border border-red-600 bg-white-400 text-red-500 focus:border-red-600 focus:outline-none";
  const styles: Styles = {
    insertReport: insertReport,
    updateReport: updateReport,
    deleteReport: deleteReport,
    confirm: confirm,
    cancel: cancel,
    updateOrDateTable: updateOrDateTable,
    selectUpdateOrDeleteReport: selectUpdateOrDeleteReport,
    confirmDelete: confirmDelete,
    cancelDelete: cancelDelete,
    exportExcel: exportExcel,
    importExcel: importExcel
  };
  return (
    <button type={buttonType} onClick={onClick} className={styles[type]}>{children}</button>
  );
};

export default Button;
