import {FC} from "react";
import cn from "classnames";

import css from "./it-scan-block.module.scss";

const ItScanBlock: FC = () => {
    return (
        <div className={css.wrap}>
            <p className={css.title}>
                Advanced Scan für IT
            </p>
            <p className={css.text}>Lorem ipsum dolor sit amet, consetetursadipscing elitr, sed diam nonumy ei</p>

            <button className={cn('myBtn', 'small', 'white', css.btn)}>JETZT INFORMIEREN</button>
        </div>
    )
}

export default ItScanBlock;
