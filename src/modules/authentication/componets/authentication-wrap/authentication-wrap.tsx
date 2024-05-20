import {FC, ReactNode} from "react";


import css from "./authentication-wrap.module.scss";

const AuthenticationWrap: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className={css.wrap}>
            {children}
        </div>
    )
}

export default AuthenticationWrap;
