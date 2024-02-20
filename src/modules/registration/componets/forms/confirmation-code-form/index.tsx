import {FC} from "react";
import { Input } from '@chakra-ui/react'
import cn from "classnames";

import css from "./confirmation-code-form.module.scss";

const ConfirmationCodeForm: FC = () => {
    return (
        <form className={css.wrap}>
            <h2>Eingabe Bestätigungscode E-Mail</h2>
            <p className={css.text}>Bitte geben Sie den Code ein, den Sie an die von die Ihnen angegebene Mailadresse erhalten haben haben.</p>

            <p className="formLabel">Code*</p>
            <Input className="myInput" placeholder='Please select' />

            <p className={css.lastText}>
                Code nicht erhalten? <br/>Bitte überprüfen Sie Ihren Spam Ordner oder klicken Sie auf
                "Code erneut zustellen".<br/> <a href="#">Code erneut zustellen</a>
            </p>

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>REGISTRIEREN</button>

                <p className={css.importantText}>*Pflichtfelder</p>
            </div>
        </form>
    )
}

export default ConfirmationCodeForm;
