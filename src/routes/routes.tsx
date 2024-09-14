import {RouteObject} from "react-router-dom";
import Report from "../model/report/list/Report";
import ReportProvider from "../context/report/ReportProvider";
import Form from "../model/report/form/Form";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <ReportProvider>
                <Report/>
            </ReportProvider>
        ),
    },
    {
        path: "/report-insert",
        element: (
            <Form/>
        ),
    }
]