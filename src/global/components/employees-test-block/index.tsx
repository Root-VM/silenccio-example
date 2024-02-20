import {FC} from "react";
import cn from "classnames";

import css from "./employees-test-block.module.scss";

const EmployeesTestBlock: FC = () => {
    return (
        <div className={css.wrap}>
            <p className={css.title}>
                Phishing-Test Mitarbeiter
            </p>
            <p className={css.text}>Wie sicher sind Ihre Mitarbeiter im Umgang mit verdächtigen Mails? </p>

            <button className={cn('myBtn', 'small', 'white', css.btn)}>JETZT TESTEN</button>
        </div>
    )
}

export default EmployeesTestBlock;
