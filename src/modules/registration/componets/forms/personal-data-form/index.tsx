import {FC} from "react";
import { Input } from '@chakra-ui/react'
import cn from "classnames";
import Dropdown from "react-dropdown";

import css from "./personal-data-form.module.scss";

const PersonalDataFrom: FC = () => {
    return (
        <form className={css.wrap}>
            <h2>Registrierung - Persönliche Angaben</h2>
            <p className={css.text}>Bitte geben Sie Ihre Daten vollständig an.</p>

            <p className="formLabel">Anrede*</p>
            <Dropdown className={cn('myDropdown', 'error')} options={['Option 1', 'Option 2']} placeholder='Please select'/>
            <p className="formErrorText">Error message</p>

            <p className="formLabel">Funktion*</p>
            <Dropdown className={cn('myDropdown')} options={['Option 1', 'Option 2']} placeholder='Please select'/>

            <p className="formLabel">Vorname*</p>
            <Input className="myInput" placeholder='Please select'/>

            <p className="formLabel">Nachname*</p>
            <Input className="myInput" placeholder='Please select'/>

            <p className="formLabel">Strasse*</p>
            <Input className="myInput" placeholder='Please select'/>

            <p className="formLabel">Hausnummer*</p>
            <Input className="myInput" placeholder='Please select'/>

            <p className="formLabel">PLZ*</p>
            <Input className="myInput" placeholder='Please select'/>

            <p className="formLabel">Ort*</p>
            <Input className="myInput" placeholder='Please select'/>

            <p className="formLabel">Mobiltelefonnummer*</p>
            <div className={css.phoneLine}>
                    <Dropdown className={cn('myDropdown', 'phone', css.drop)} options={['🇺🇦 +38', '🇩🇪 +49']} placeholder='+00'/>
                    <Input className="myInput" placeholder='e.g. 79 933 23 23'/>
            </div>

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>Registrierung abschliessen</button>

                <p className={css.importantText}>*Pflichtfelder</p>
            </div>
        </form>
    )
}

export default PersonalDataFrom;
