import {FC} from "react";
import cn from "classnames";
import {Input} from "@chakra-ui/react";

import css from "./step-five.module.scss";
const StepFive: FC = () => {
    return (
        <div className={css.wrap}>
            <img className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>
            <h2>Monitoring KK & Tel. Nr. einrichten</h2>
            <p className={css.title}>Monitoring - Step 5/5</p>
            <p className={css.text}>Sie können noch (X) weitere Kreditkarten hinterlegen. Klicken Sie hierzu auf "Weitere Kreditkarte hinzufügen".</p>

            <button className={cn('myBtn', 'small', css.btn)}>Weitere Kreditkarte hinzufügen</button>


            <p className="formLabel">Name Kreditkarte*</p>
            <Input className={cn('myInput', css.input)} placeholder='Please select'/>

            <p className={css.text}>
                Die bereits hinterlegten Telefonnummern und Kreditkarten finden Sie unter <a href="#">Profilseite - Ihr Unternehmen</a> und können die Daten jederzeit ergänzen, anpassen oder löschen.
            </p>

            <button className={cn('myBtn', 'small', css.btn)}>fertig</button>
        </div>
    )
}

export default StepFive;
