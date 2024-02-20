import {FC, useState} from "react";


import css from "./profile-form.module.scss";
import cn from "classnames";
import {Input} from "@chakra-ui/react";
import Dropdown from "react-dropdown";
const ProfileForm: FC = () => {
    const [activeItem, setActiveItem] = useState(1);

    return (
        <div className={css.wrap}>
            <img className={css.cancel} src="/img/icons/cancel.svg" alt="cancel"/>

            <ul className={css.menuList}>
                <li className={cn(activeItem === 1 && css.active)} onClick={() => setActiveItem(1)}>Ihr Unternehmen</li>
                <li className={cn(activeItem === 2 && css.active)} onClick={() => setActiveItem(2)}>Ihre Services</li>
            </ul>

            <div className={cn(css.content, activeItem === 1 && css.showFirst)}>
                <form>
                    <h2>Angaben zu Ihrem Unternehmen</h2>
                    <p className={css.text}>Basierend auf den unten stehenden Angaben Scannen wir Ihre IT-Sicherheit. Sie können diese Angaben jederzeit anpassen.</p>

                    <p className="formLabel">Domain Ihrer Website*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='Please select'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                    </div>

                    <p className="formLabel">Zahlungsfunktion auf Website*</p>
                    <div className={css.inputGroup}>
                        <Dropdown className={cn('myDropdown', css.drop)} options={['Option 1', 'Option 2']} placeholder='Please select'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                    </div>

                    <p className="formLabel">Kontaktformular auf Website*</p>
                    <div className={css.inputGroup}>
                        <Dropdown className={cn('myDropdown', css.drop)} options={['Option 1', 'Option 2']} placeholder='Please select'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                    </div>

                    <p className="formLabel">Login / Registrierung auf Website*</p>
                    <div className={css.inputGroup}>
                        <Dropdown className={cn('myDropdown', css.drop)} options={['Option 1', 'Option 2']} placeholder='Please select'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                    </div>

                    <p className="formLabel">E-Mail-Domain*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='Please select'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                    </div>


                    <h2>Angaben zu Ihren Monitorings</h2>
                    <p className={css.text}>
                        Basierend auf den unten stehenden Angaben Scannen wir Ihre Kreditkarten und Telefonnummern. Sie können diese Angaben jederzeit anpassen.
                    </p>

                    <p className="formLabel">Kreditkarte 1*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='Visa |  C. Mueller | ...003'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                        <img src="/img/icons/card.svg" alt="card"/>
                    </div>

                    <p className="formLabel">Kreditkarte 2*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='Visa |  U. Keller | ...937'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                        <img src="/img/icons/card.svg" alt="card"/>
                    </div>

                    <p className="formLabel">Kreditkarte 3*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='Please select'/>
                        <img src="/img/icons/plus.svg" alt="plus"/>
                    </div>

                    <p className="formLabel">Telefonnummer 1*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='+41 78 000 00 00'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                        <img src="/img/icons/card.svg" alt="card"/>
                    </div>

                    <p className="formLabel">Telefonnummer 2*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='+41 78 000 00 00'/>
                        <img src="/img/icons/pen.svg" alt="pen"/>
                        <img src="/img/icons/card.svg" alt="card"/>
                    </div>

                    <p className="formLabel">Telefonnummer 3*</p>
                    <div className={css.inputGroup}>
                        <Input className={'myInput'} placeholder='+41 78 000 00 00'/>
                        <img src="/img/icons/plus.svg" alt="plus"/>
                    </div>

                </form>
                <form>
                    <h2>Ihre Services</h2>
                    <p className={css.text}>
                        Basierend auf den unten stehenden Angaben Scannen wir Ihre IT-Sicherheit. Sie können diese Angaben jederzeit anpassen.
                    </p>

                    <div className={css.cards}>
                        <div className={css.card}>
                            <p className={css.cTitle}>Service 1</p>

                            <p className={css.line}>Vertragsbeginn: <span>29.11.2023</span></p>
                            <p className={css.line}>Laufzeit: <span>12 Monate</span></p>
                            <p className={css.line}>Laufzeit Ende: <span>28.11.2024</span></p>
                            <p className={css.line}>Preis: <span>CHF xyz.-</span></p>

                            <p className={css.cText}>Der Vertrag verlängert sich Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At</p>

                            <button className={cn('myBtn', 'small', 'white', css.btn)}>kündigen</button>
                        </div>

                        <div className={css.card}>
                            <p className={css.cTitle}>Service 2</p>

                            <p className={css.line}>Vertragsbeginn: <span>29.11.2023</span></p>
                            <p className={css.line}>Laufzeit: <span>12 Monate</span></p>
                            <p className={css.line}>Laufzeit Ende: <span>28.11.2024</span></p>
                            <p className={css.line}>Preis: <span>CHF xyz.-</span></p>

                            <p className={css.cText}>Der Vertrag verlängert sich Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At</p>

                            <button className={cn('myBtn', 'small', 'white', css.btn)}>kündigen</button>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default ProfileForm;
