import {FC} from "react";
import Dropdown from "react-dropdown";
import cn from "classnames";
import {Input} from "@chakra-ui/react";

import css from "./step-one.module.scss";

const StepOne: FC = () => {
    return (
        <div className={css.wrap}>
            <img className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>
            <h2>Monitoring KK & Tel. Nr. einrichten</h2>
            <p className={css.title}>Monitoring - Step 1/5</p>
            <p className={css.text}>Geben Sie eine Telefonnummer ein und wir benachrichtigen Sie, wenn diese von einem Datenleak betroffen ist.</p>

            <p className="formLabel">Telefonnummer 1*</p>
            <div className={css.phoneLine}>
                <Dropdown className={cn('myDropdown', 'phone', css.drop)} options={['🇺🇦 +38', '🇩🇪 +49']} placeholder='+00'/>
                <Input className="myInput" placeholder='e.g. 79 933 23 23'/>
            </div>

            <p className={css.text}>Geben Sie einen Namen für die Telefonnummer ein (z.B. Privat) - so haben Sie den Überblick, sollten Sie mehrere Telefonnummern hinterlegen.</p>

            <p className="formLabel">Name*</p>
            <Input className={cn('myInput', css.input)} placeholder='Eingeben'/>

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>SPEICHERN & WEITER</button>

                <p className={css.importantText}>*Pflichtfelder</p>
            </div>
        </div>
    )
}

export default StepOne;
