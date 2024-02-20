import {FC} from "react";
import cn from "classnames";
import {Input} from "@chakra-ui/react";

import css from "./step-three.module.scss";
const StepThree: FC = () => {
    return (
        <div className={css.wrap}>
            <img className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>
            <h2>Monitoring KK & Tel. Nr. einrichten</h2>
            <p className={css.title}>Monitoring - Step 3/5</p>
            <p className={css.text}>Geben Sie einen Namen für die Kreditkarte ein (z.B. Visa).</p>

            <p className="formLabel">Name*</p>
            <Input className={cn('myInput', css.input)} placeholder='Eingeben'/>

            <p className={css.text}>Bitte klicken Sie auf "Monitoring starten". Geben Sie im sich öffnenden Tab die Nummer der Kreditkarte ein und schliessen Sie den Tab nach erfolgter Eingabe wieder. Sollte Ihre Kreditkarte von einem Datenleak betroffen sein, werden wir Sie benachrichtigen. </p>


            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>SPEICHERN & WEITER</button>

                <p className={css.importantText}>*Pflichtfelder</p>
            </div>
        </div>
    )
}

export default StepThree;
