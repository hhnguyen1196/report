import {useContext} from "react";
import {ReportContext} from "./ReportProvider";

const useReport = () => {
  const context = useContext(ReportContext);
  if (context === null) {
    throw new Error("ReportProvider was used out of scope access");
  }
  return context;
};

export default useReport;
