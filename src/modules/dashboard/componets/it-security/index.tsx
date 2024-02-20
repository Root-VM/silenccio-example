import {FC} from "react";
import cn from "classnames";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel} from "@chakra-ui/react";

import css from "./it-security.module.scss";

const ItSecurity: FC = () => {
    return (
        <div className={css.wrap}>
            <h2>Ihre IT-Sicherheit </h2>

            <div className={css.mainBlock}>
                <img src="/img/icons/attention-red.svg" alt="attention"/>

                <div className={css.texts}>
                    <p>Ihre IT-Sicherheit ist gefährdet - Wir haben erhebliche Sicherheitslücken gefunden.</p>
                    <span>Letzter Login: 24.11.2023, 08:51</span>
                    <span>Letzter Scan: 27.11.2023, 23:51</span>
                </div>
            </div>

            <div className={css.items}>
                <div className={css.item}>
                    <div className={css.circle}>
                        <img src="/img/icons/red-circle.svg" alt="circle"/>
                        <img src="/img/icons/network.svg" alt="network"/>
                    </div>
                    <p>Netzwerk</p>
                </div>
                <div className={css.item}>
                    <div className={css.circle}>
                        <img src="/img/icons/yellow-circle.svg" alt="circle"/>
                        <img src="/img/icons/planet.svg" alt="planet"/>
                    </div>
                    <p>Webpräsenz</p>
                </div>
                <div className={css.item}>
                    <div className={css.circle}>
                        <img src="/img/icons/yellow-circle.svg" alt="circle"/>
                        <img src="/img/icons/mail.svg" alt="mail"/>
                    </div>
                    <p>E-Mail</p>
                </div>
                <div className={css.item}>
                    <div className={css.circle}>
                        <img src="/img/icons/green-circle.svg" alt="circle"/>
                        <img src="/img/icons/folder.svg" alt="folder"/>
                    </div>
                    <p>Datenleaks</p>
                </div>
                <div className={css.item}>
                    <div className={css.circle}>
                        <img src="/img/icons/green-circle.svg" alt="circle"/>
                        <img src="/img/icons/triangle.svg" alt="triangle"/>
                    </div>
                    <p>Interne Risiken</p>
                </div>
            </div>

            <Accordion className={cn('myAccordion', css.accordion)}>
                <AccordionItem>
                    <div className={cn(css.icon, css.red)}>
                        <img src="/img/icons/network.svg" alt="network"/>
                    </div>
                    <AccordionButton>
                        Port Tel net offen
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <div className={css.text}>
                                    <p>Was ist betroffen?</p>
                                    <p>Was kann passieren?</p>
                                </div>
                                <div className={css.text}>
                                    <span>Server</span>
                                    <span>Server kann vom Internet aus erreicht werden.</span>
                                </div>
                            </div>

                            <button className={cn('myBtn', 'white', 'small')}>IGNORIEREN</button>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <div className={cn(css.icon, css.yellow)}>
                        <img src="/img/icons/planet.svg" alt="network"/>
                    </div>
                    <AccordionButton>
                        Expertenmodus und IT Massnahmen anzeigen
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <div className={css.text}>
                                    <p>Was ist betroffen?</p>
                                    <p>Was kann passieren?</p>
                                </div>
                                <div className={css.text}>
                                    <span>Server</span>
                                    <span>Server kann vom Internet aus erreicht werden.</span>
                                </div>
                            </div>

                            <button className={cn('myBtn', 'white', 'small')}>IGNORIEREN</button>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <div className={cn(css.icon, css.yellow)}>
                        <img src="/img/icons/mail.svg" alt="network"/>
                    </div>
                    <AccordionButton>
                        CONSENT-SECURITY -POLICY NICHT GESETZT
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <div className={css.text}>
                                    <p>Was ist betroffen?</p>
                                    <p>Was kann passieren?</p>
                                </div>
                                <div className={css.text}>
                                    <span>Server</span>
                                    <span>Server kann vom Internet aus erreicht werden.</span>
                                </div>
                            </div>

                            <button className={cn('myBtn', 'white', 'small')}>IGNORIEREN</button>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <div className={cn(css.icon, css.green)}>
                        <img src="/img/icons/folder.svg" alt="network"/>
                    </div>
                    <AccordionButton>
                        COOKIES KEIN "SECURE" STATUS
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <div className={css.text}>
                                    <p>Was ist betroffen?</p>
                                    <p>Was kann passieren?</p>
                                </div>
                                <div className={css.text}>
                                    <span>Server</span>
                                    <span>Server kann vom Internet aus erreicht werden.</span>
                                </div>
                            </div>

                            <button className={cn('myBtn', 'white', 'small')}>IGNORIEREN</button>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <div className={cn(css.icon, css.green)}>
                        <img src="/img/icons/folder.svg" alt="network"/>
                    </div>
                    <AccordionButton>
                        LOREM IPSUM DOLOR SI AMET
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <div className={css.text}>
                                    <p>Was ist betroffen?</p>
                                    <p>Was kann passieren?</p>
                                </div>
                                <div className={css.text}>
                                    <span>Server</span>
                                    <span>Server kann vom Internet aus erreicht werden.</span>
                                </div>
                            </div>

                            <button className={cn('myBtn', 'white', 'small')}>IGNORIEREN</button>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>


            <button className={cn('myBtn', 'small', css.btn)}>
                EXPORT ALLES RISIKEN
                <img src="/img/icons/file.svg" alt="file"/>
            </button>
        </div>
    )
}

export default ItSecurity;
