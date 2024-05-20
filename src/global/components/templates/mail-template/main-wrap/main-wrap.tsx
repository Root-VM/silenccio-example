import {FC, ReactNode} from "react";


import css from "./main-wrap.module.scss";

const MainWrap: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className={css.wrap}>
            {children}
        </div>
    )
}

export default MainWrap;
