import {FC} from "react";
import cn from "classnames";
import {Input} from "@chakra-ui/react";

import css from "./step-four.module.scss";
const StepFour: FC = () => {
    return (
        <div className={css.wrap}>
            <img className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>
            <h2>Monitoring KK & Tel. Nr. einrichten</h2>
            <p className={css.title}>Monitoring - Step 4/5</p>
            <p className={css.text}>Fügen Sie Ihre Kreditkarte hinzu.</p>

            <p className="formLabel">Kreditkartennummer*</p>
            <Input className={cn('myInput', css.input)} placeholder='0000 0000 0000 0000'/>

            <p className={css.text}>
                Bitte klicken Sie auf "Monitoring starten". Geben Sie im sich öffnenden Tab die Nummer der Kreditkarte ein und schliessen Sie den Tab nach erfolgter Eingabe wieder. Sollte Ihre Kreditkarte von einem Datenleak betroffen sein, werden wir Sie benachrichtigen.
            </p>

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>Neue Karte hinzufügen</button>
                <button className={cn('myBtn', 'small', 'white', css.btn)}>abbrechen</button>

                <p className={css.importantText}>*Pflichtfelder</p>
            </div>
        </div>
    )
}

export default StepFour;
