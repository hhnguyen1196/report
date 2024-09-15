import Header from "./Header";
import {Outlet} from "react-router-dom";
import React from "react";
import ReportProvider from "../context/report/ReportProvider";

const AppLayout = () => {

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Header/>
            <main>
                <ReportProvider>
                    <Outlet/>
                </ReportProvider>
            </main>
        </div>
    );
}

export default AppLayout;
