import {FC} from "react";
import cn from "classnames";

import css from "./cyber-insurance-block.module.scss";

const CyberInsuranceBlock: FC = () => {
    return (
        <div className={css.wrap}>
            <p className={css.title}>
                Advanced Scan für IT
            </p>
            <p className={css.text}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>

            <button className={cn('myBtn', 'small', 'white-natural', css.btn)}>BERATUNG ANFORDERN</button>
        </div>
    )
}

export default CyberInsuranceBlock;
