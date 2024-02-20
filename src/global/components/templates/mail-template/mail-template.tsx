import {FC, ReactNode} from "react";
import Header from "@/global/components/header/header";
import Footer from "@/global/components/footer/footer";
import cn from "classnames";

import css from "./main-template.module.scss";

const MainTemplate: FC<{children: ReactNode, noPadding?: boolean}> = ({children, noPadding}) => {
    return (
        <div className={cn(css.template, noPadding && css.noPadding)}>
            <Header />
            <div className={css.content}>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default MainTemplate;
