import {FC} from "react";
import cn from "classnames";

import css from "./onepager-content.module.scss";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel} from "@chakra-ui/react";

const OnePagerContent: FC = () => {

    return (
        <div className={css.wrap}>
            <section className={css.main}>
                <p className={css.text}>Ist Ihre IT-Security wirklich sicher?</p>
                <h1>Schwachstellen-Scan <br/>  24/7, günstig, schnell gestartet</h1>
                <button className={cn('myBtn', 'orange')}>SCNHELLTEST STARTEN</button>
            </section>

            <section className={css.info}>
                <h2>Cyberangriffe passieren täglich - auch kleineren Unternehmen</h2>
                <p className={css.text}>Wir scannen Ihre IT auf Schwachstellenund informieren Sie zeitnah, verständlich und mit klaren Anweisungen über dienächsten Schritte:</p>
                <ul>
                    <li>
                        <img src="/img/icons/check.svg" alt="check"/>
                        <p>Risiken überwachen undreduzieren</p>
                    </li>
                    <li>
                        <img src="/img/icons/check.svg" alt="check"/>
                        <p>Zeitnah Gegenmassnahmenergreifen</p>
                    </li>
                    <li>
                        <img src="/img/icons/check.svg" alt="check"/>
                        <p>Einfalltore für Angreiferschliessen</p>
                    </li>
                </ul>
                <button className={cn('myBtn', css.btn)}>Schnelltest starten</button>
            </section>

            <section className={css.cards}>
                <div className={css.card}>
                    <p className={css.title}>Jedes 3. CH-KMU bereits angegriffen</p>
                    <p className={css.text}>Doch nur jedes siebte KMU siehtCyberangriffe als Gefahr für sich. 40% aller Cyberattacken in der Schweizzielen auf KMU ab. …</p>
                    <a href="#">Mehr Informationen</a>
                </div>
                <div className={css.card}>
                    <p className={css.title}>Auf KMU angepasste Lösung</p>
                    <p className={css.text}>Wir scannen Ihre IT-Infrastrukturauf die in KMUs gängigsten Schwachstellen und zeigen ihnen Optimierungspotential auf…</p>
                    <a href="#">Mehr Informationen</a>
                </div>
                <div className={css.card}>
                    <p className={css.title}>Schwachstellen schliessen bevor die Angreifer die Lücke nutzen</p>

                    <ul>
                        <li>24/7 Scan - Software für Grossunternehmen für Sie als KMU</li>
                        <li>automatische Benachrichtigung</li>
                        <li>verständliche Informationen -auch für nicht IT-Nerds</li>
                        <li>klare Handlungsanweisungen fürdie für die IT Sicherheit zuständige Person</li>
                        <li>Pushnachrichten zuSicherheitslücken und Betrugsmaschen</li>
                    </ul>
                    <a href="#">Mehr Informationen</a>
                </div>
            </section>

            <section className={css.content}>
                <h2>Schwachstellen-Scan im Überblick</h2>
                <p className={css.text}>Lorem ipsum dolor sit amet,consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut laboreet dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores etea rebum. Stet clitakasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Loremipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmodtempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duodolores et ea rebum. Stetclita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmodtempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duodolores et ea rebum. Stetclita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sitamet.
                    Duis autem vel eum iriure dolor in hendrerit invulputate velit esse molestie consequat, vel illum dolore eu feugiat nullafacilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesentluptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsumdolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismodtincidunt ut laoreet dolore magna aliquam erat volutpat.
                    Ut wisi enim ad minim veniam, quis nostrudexerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodoconsequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit essemolestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros etaccumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenitaugue duis dolore te feugait nulla facilisi.  </p>

                <div className={css.box}>
                    <button className={cn('myBtn', css.btn)}>Jetzt starten</button>

                    <h2 className={css.lastTitle}>FAQ</h2>


                    <Accordion className={cn('myAccordion', 'simple', css.accordion)}>
                        <AccordionItem>
                            <AccordionButton className={css.aBtn}>
                                Welche Angaben muss ich machen, um den Scan zu starten?
                            </AccordionButton>
                            <AccordionPanel>
                                <p className={css.aText}>
                                    Die Kosten für den Scan belaufensich jährlich auf CHF XY.- Sie können die Rechnung einfachund bequem per Kreditkarte zahlen.
                                </p>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton className={css.aBtn}>
                                Wie hoch sind die Kosten fürden Schwachstellen Scan?
                            </AccordionButton>
                            <AccordionPanel>
                                <p className={css.aText}>
                                    Die Kosten für den Scan belaufensich jährlich auf CHF XY.- Sie können die Rechnung einfachund bequem per Kreditkarte zahlen.
                                </p>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton className={css.aBtn}>
                                Mein Unternehmen hat nur 3Mitarbeiter - kann ich den Scan dennoch nutzen?
                            </AccordionButton>
                            <AccordionPanel>
                                <p className={css.aText}>
                                    Die Kosten für den Scan belaufensich jährlich auf CHF XY.- Sie können die Rechnung einfachund bequem per Kreditkarte zahlen.
                                </p>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <button className={cn('myBtn', 'white')}>mehr anzeigen</button>
                </div>

            </section>
        </div>
    )
}

export default OnePagerContent;
