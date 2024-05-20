import {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "@/global/store";

const HelperProvider: FC = () => {
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch.common.toggleModalLoading(false);
    }, []);
    return <></>
}

export default HelperProvider;
