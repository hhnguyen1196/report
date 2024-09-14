import Header from "./Header";
import {Outlet, useNavigation} from "react-router-dom";
import React from "react";
import Loading from "./Loading";

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loading/>}
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default AppLayout;
