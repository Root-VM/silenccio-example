import {FC} from "react";
import {Progress} from '@chakra-ui/react'
import cn from "classnames";

import css from "./intro-info-block.module.scss";

const IntroInfoBlock: FC = () => {
    return (
        <div className={css.wrap}>
            <h2>Intro-Infos </h2>
            <p className={css.text}>Basierend auf Ihren Angaben führen wir den ersten Scan durch.</p>

            <Progress className={'myProgress'} value={29} />
            <p className={css.progressNumber}>29%</p>

            <p className={css.secondaryText}>Die Ergebnisse werden priorisiert dargestellt. </p>

            <div className={css.textBlock}>
                <img src="/img/icons/attention-red.svg" alt="attention"/>
                <p>Rot markierte Risiken =  hohe Gefährdung - sie sollten dringend aktiv werden</p>
            </div>

            <div className={css.textBlock}>
                <img src="/img/icons/attention-yellow.svg" alt="attention"/>
                <p>Gelb markierte Risiken =  mittlere Gefährdung - sie sollten aktiv werden</p>
            </div>

            <p className={css.secondaryText}>Disclaimer: <br/> Risiken können identifiziert und damit minimiert jedoch nicht gänzlich eliminiert werden. </p>


            <button className={cn('myBtn', 'small', css.btn)}>Weiter</button>
        </div>
    )
}

export default IntroInfoBlock;
