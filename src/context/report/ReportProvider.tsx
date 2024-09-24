import React, {createContext, ReactNode, useCallback, useReducer, useState} from "react";
import {url} from "../../environments/host";
import {API} from "../../environments/api";

enum ReportAction {
    LOADING = 'loading',
    GET_ALL_REPORT = 'getAll',
    GET_BY_ID_REPORT = 'getById',
    INSERT_REPORT = 'insert',
    UPDATE_REPORT = 'update',
    DELETE_REPORT = 'delete',
    INSERT_LIST_REPORT = 'insertList',
}

export type Report = {
    id: number | null,
    deliveryPartner: string,
    recipient: string,
    equipment: string,
    quantity: number,
    deviceCode: string,
    condition: string,
    deliveryDate: Date
}

type State = {
    reportList: Report[],
    report: Report,
    isLoading: boolean,
    error: string
}

type ContextValue = State & {
    getAllReport: (month: number) => void;
    insertReport: (report: Report) => void;
    updateReport: (report: Report) => void;
    deleteReport: (id: number) => void;
    insertListReport: (reportList: Report[] | any) => void;
}

type Action = {
    type: ReportAction,
    payload?: State
}

type Props = {
    children?: ReactNode
}

const initialState: State = {
    reportList: [],
    report: {
        id: null,
        deliveryPartner: '',
        recipient: '',
        equipment: '',
        quantity: 0,
        deviceCode: '',
        condition: 'NEW',
        deliveryDate: new Date(),
    },
    isLoading: false,
    error: ''
}

export const ReportContext = createContext<ContextValue | null>(null);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ReportAction.LOADING:
            return {...state, isLoading: true};
        case ReportAction.GET_ALL_REPORT:
            return {...state, isLoading: false, reportList: action.payload || []} as State;
        case ReportAction.GET_BY_ID_REPORT:
            return {...state, isLoading: false};
        case ReportAction.INSERT_REPORT:
            return {...state, isLoading: false};
        case ReportAction.UPDATE_REPORT:
            return {...state, isLoading: false};
        case ReportAction.DELETE_REPORT:
            return {...state, isLoading: false};
        case ReportAction.INSERT_LIST_REPORT:
            return {...state, isLoading: false};
        default:
            throw new Error("Unknown action type");
    }
}

const ReportProvider = ({children}: Props) => {
    const [{reportList, report, isLoading, error}, dispatch] = useReducer(reducer, initialState);
    const [currentMonth, setCurrentMonth] = useState<number>(1);

    const getAllReport = useCallback(async (month: number) => {
        dispatch({type: ReportAction.LOADING})
        try {
            setCurrentMonth(month);
            const response = await fetch(url(`${API.REPORT}?month=${month}`), {
                headers: {Accept: 'application/json'}
            });
            const data = await response.json();
            dispatch({type: ReportAction.GET_ALL_REPORT, payload: data})
        } catch (error) {
            console.error("Network error");
        }
    }, [])

    const insertReport = useCallback(async (report: Report) => {
        try {
            await fetch(url(`${API.REPORT}`), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(report)
            });
            const month = new Date(report.deliveryDate).getMonth() + 1;
            await getAllReport(month);
            dispatch({type: ReportAction.INSERT_REPORT});
        } catch (error) {
            throw new Error("Network error");
        }
    }, [getAllReport])

    const updateReport = useCallback(async (report: Report) => {
        try {
            await fetch(url(`${API.REPORT}`), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(report)
            });
            const month = new Date(report.deliveryDate).getMonth() + 1;
            await getAllReport(month);
            dispatch({type: ReportAction.UPDATE_REPORT});
        } catch (error) {
            throw new Error("Network error");
        }
    }, [getAllReport])

    const deleteReport = useCallback(async (id: number) => {
        try {
            await fetch(url(`${API.REPORT}/${id}`), {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });
            await getAllReport(currentMonth);
            dispatch({type: ReportAction.DELETE_REPORT});
        } catch (error) {
            throw new Error("Network error");
        }
    }, [getAllReport, currentMonth])

    const insertListReport = useCallback(async (reportList: Report[]) => {
        try {
            await fetch(url(`${API.REPORT}/list`), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(reportList)
            });
            await getAllReport(currentMonth);
            dispatch({type: ReportAction.INSERT_LIST_REPORT});
        } catch (error) {
            throw new Error("Network error");
        }
    }, [getAllReport, currentMonth])
    return (
        <ReportContext.Provider
            value={{
                reportList,
                report,
                isLoading,
                error,
                getAllReport,
                insertReport,
                updateReport,
                deleteReport,
                insertListReport
            }}>
            {children}
        </ReportContext.Provider>
    );
};

export default ReportProvider;
