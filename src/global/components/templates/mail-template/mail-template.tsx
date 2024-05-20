import {FC, ReactNode} from "react";
import Header from "@/global/components/header/header";
import Footer from "@/global/components/footer/footer";
import cn from "classnames";

import css from "./main-template.module.scss";
import ModalLoading from "@/global/components/modal-loading";

interface MainTemplateProps {
    children: ReactNode,
    noPadding?: boolean,
    hideNavigation?: boolean,
    hideAxa?:boolean
}
const MainTemplate: FC<MainTemplateProps> = ({children, noPadding, hideNavigation, hideAxa}) => {
    return (
        <div className={cn(css.template, noPadding && css.noPadding)}>
            <Header hideAxa={hideAxa} hideNavigation={hideNavigation} />
            <div className={css.content}>
                {children}
            </div>
            <Footer />

            <ModalLoading />
        </div>
    );
}

export default MainTemplate;
