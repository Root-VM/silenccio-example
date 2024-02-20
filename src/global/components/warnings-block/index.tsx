import {FC} from "react";
import cn from "classnames";

import css from "./warnings-block.module.scss";

const WarningsBlock: FC = () => {
    return (
        <div className={css.wrap}>
            <p className={css.title}>
                Letzte Warnmeldungen <span>4</span>
            </p>
            <p className={css.text}>27.11.2023: Cisco Schwachstelle</p>
            <p className={css.text}>13.11.2023:  Confluence Data & Server</p>

            <button className={cn('myBtn', 'small', css.btn)}>ALLE ANSEHEN</button>
        </div>
    )
}

export default WarningsBlock;
