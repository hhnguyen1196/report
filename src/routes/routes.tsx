import {RouteObject} from "react-router-dom";
import ListReport from "../model/report/list/ListReport";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <ListReport/>
        ),
    }
]