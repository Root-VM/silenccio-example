import {FC} from "react";
import cn from "classnames";

import css from "./step-two.module.scss";
const StepTwo: FC = () => {
    return (
        <div className={css.wrap}>
            <img className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>
            <h2>Monitoring KK & Tel. Nr. einrichten</h2>
            <p className={css.title}>Monitoring - Step 2/5</p>
            <p className={css.text}>Sie können noch (X) weitere Telefonnummern hinterlegen. Klicken Sie hierzu auf "weitere Telefonnummer hinzufügen" oder wechseln Sie direkt zu "Kreditkarte hinterlegen".</p>

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>Weitere Telefonnummer hinzufügen</button>
                <button className={cn('myBtn', 'small', css.btn)}>Kreditkarte hinterlegen</button>
            </div>

            <p className={css.text}>
                Die bereits hinterlegten Telefonnummern und Kreditkarten finden Sie unter
                <a href='#'>Profilseite - Ihr Unternehmen</a>
                und können die Daten jederzeit ergänzen, anpassen oder löschen.</p>        </div>
    )
}

export default StepTwo;
