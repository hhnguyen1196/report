import {MouseEventHandler, ReactNode} from "react";

type Props = {
  children?: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: string
}

type Styles = {
  [key: string]: string;
};

const Button = ({children, onClick, type}: Props) => {
  const insertReport = "rounded-md px-4 py-2 text-white bg-green-600 hover:bg-green-500";
  const updateReport = "rounded-md px-4 py-2 bg-yellow-400 hover:bg-yellow-300";
  const deleteReport = "rounded-md px-4 py-2 text-white bg-red-600 hover:bg-red-500";
  const styles: Styles = {
    insertReport: insertReport,
    updateReport: updateReport,
    deleteReport: deleteReport,
  };
  return (
    <button onClick={onClick} className={styles[type]}>{children}</button>
  );
};

export default Button;
