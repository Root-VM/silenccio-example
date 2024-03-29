import {FC} from "react";
import {Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import cn from "classnames";

import css from "./registration-form.module.scss";

const RegistrationForm: FC = () => {
    return (
        <form className={css.wrap}>
            <h2>Registrierung</h2>
            <p className={css.text}>Bitte geben Sie Ihre Daten vollständig an.</p>

            <p className="formLabel">Firma*</p>
            <Input className="myInput" placeholder='Option 1' isInvalid={true} />
            <p className="formErrorText">Error message</p>

            <p className="formLabel">E-Mail Adresse*</p>
            <Input className="myInput" placeholder='Please select' type='email'/>

            <p className="formLabel">Passwort*</p>
            <InputGroup>
                <Input className="myInput" placeholder='*****' type='password'/>
                <InputRightElement width='4.5rem'>
                    <img src="/img/icons/eye.svg" alt="eye"/>
                    {/*<img src="/img/icons/eye-closed.svg" alt="eye"/>*/}
                </InputRightElement>
            </InputGroup>

            <p className="formLabel">Passwort wiederholen*</p>
            <InputGroup>
                <Input className="myInput" placeholder='*****' type='password'/>
                <InputRightElement width='4.5rem'>
                    <img src="/img/icons/eye.svg" alt="eye"/>
                    {/*<img src="/img/icons/eye-closed.svg" alt="eye"/>*/}
                </InputRightElement>
            </InputGroup>

            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>REGISTRIEREN</button>

                <p className={css.importantText}>*Pflichtfelder</p>
            </div>
        </form>
    )
}

export default RegistrationForm;
