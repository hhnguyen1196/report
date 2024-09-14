import {createContext, ReactNode, useCallback, useReducer} from "react";
import {url} from "../../environments/host";
import {API} from "../../environments/api";

enum ReportAction {
    LOADING = 'loading',
    GET_ALL_REPORT = 'getAll',
    GET_BY_ID_REPORT = 'getById',
    INSERT_REPORT = 'insert',
    UPDATE_REPORT = 'update',
    DELETE_REPORT = 'delete',
}

export type Report = {
    id: number,
    deliveryPartner: string,
    recipient: string,
    equipment: string,
    quantity: string,
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
    getAllReport: () => void;
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
        id: 0,
        deliveryPartner: '',
        recipient: '',
        equipment: '',
        quantity: '',
        deviceCode: '',
        condition: '',
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
            return {...state, reportList: action.payload || []} as State;
        case ReportAction.GET_BY_ID_REPORT:
            return {...state};
        case ReportAction.INSERT_REPORT:
            return {...state};
        case ReportAction.UPDATE_REPORT:
            return {...state};
        case ReportAction.DELETE_REPORT:
            return {...state};
        default:
            throw new Error("Unknown action type");
    }
}

const ReportProvider = ({children}: Props) => {
    const [{reportList, report, isLoading, error}, dispatch] = useReducer(reducer, initialState);

    const getAllReport = useCallback(async function () {
        try {
            const response = await fetch(url(`${API.REPORT}`), {
                headers: {
                    Accept: 'application/json'
                }
            });

            const data = await response.json();

            dispatch({type: ReportAction.GET_ALL_REPORT, payload: data})
        } catch (error) {
            throw new Error("Network error");
        }
    }, [])
    return (
        <ReportContext.Provider
            value={{
                reportList,
                report,
                isLoading,
                error,
                getAllReport
            }}>
            {children}
        </ReportContext.Provider>
    );
};

export default ReportProvider;
