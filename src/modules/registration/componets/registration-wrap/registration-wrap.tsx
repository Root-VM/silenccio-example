import {FC, ReactNode} from "react";


import css from "./registration-wrap.module.scss";

const RegistrationWrap: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className={css.wrap}>
            {children}
        </div>
    )
}

export default RegistrationWrap;
