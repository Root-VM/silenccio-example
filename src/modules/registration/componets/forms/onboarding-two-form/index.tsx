import {FC} from "react";
import {
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger, Radio, RadioGroup
} from '@chakra-ui/react'
import cn from "classnames";

import css from "./onboarding-two-form.module.scss";

const OnboardingTwoForm: FC = () => {
    return (
        <form className={css.wrap}>
            <h2>Angaben zu Ihrer IT</h2>
            <p className={css.title}>Onboarding - Step 2/5</p>
            <div className={css.text}>
                Können Besucher auf Ihrer Website Waren oder Dienstleistungen mit digitalen Zahlungsmitteln bezahlen?*
                <Popover trigger='hover'>
                    <PopoverTrigger>
                        <img src="/img/icons/question.svg" alt="question"/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='myPopover'>
                            <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit </strong>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>

            <div className={cn('formLabel', css.textLine)}>
                Domain Ihrer Website*
            </div>
            <Input className="myInput" placeholder='www.axa.ch' />


            <RadioGroup className="myRadio" defaultValue='1'>
                <Radio value='1'>Ja</Radio>
                <Radio value='2'>Nein</Radio>
                <Radio value='3'>Ich weiss es nicht</Radio>
            </RadioGroup>


            <div className={css.group}>
                <button className={cn('myBtn', 'small', css.btn)}>WEITER</button>

                <p className={css.importantText}>*Pflichtfelder</p>
            </div>
        </form>
    )
}

export default OnboardingTwoForm;
