import {FC} from "react";
import cn from "classnames";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel} from "@chakra-ui/react";

import css from "./curent-alerts.module.scss";

const CurentAlerts: FC = () => {
    return (
        <div className={css.wrap}>
            <h2>
                Aktuelle Warnmeldungen
                <span>4</span>
            </h2>

            <div className={css.accordionTitles}>
                <p>Datum</p>
                <p>Titel</p>
            </div>
            <Accordion className={cn('myAccordion', 'simple', css.accordion)}>
                <AccordionItem>
                    <AccordionButton className={css.accordionBtn}>
                        <p>27.11.23</p>
                        <p>NEU</p>
                        <p>Cisco Schwachstelle</p>
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.texts}>
                            <p>Was ist betroffen?</p>
                            <span>Am 16. Oktober veröffentlichte Cisco ein die Information zu einer Schwachstelle in der Web UI von IOS XE. Die Schwachstelle hat die höchste CVSS-Bewertung von 10.0 ("kritisch") erhalten.  Wer Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz hat, ist grundsätzlich gefährdet. Das Web UI dient u.A. der Benutzerverwaltung auf de Geräten. Diese ist als Folge der Schwachstelle von aussen, also dem Internet, erreichbar.</span>
                        </div>
                        <div className={css.texts}>
                            <p>Mögliche Gefahren:</p>
                            <span>Die Schwachstelle mit der Kennung CVE-2023-20198 ermöglicht es, Angreifer, neue Accounts auf dem betroffenen System anzulegen. Angreifende sind somit in der Lage, Kontrolle über betroffene IOS XE Systeme zu erlangen und die Geräte zu kompromittieren, auf denen die Software eingesetzt wird (Swiches, Router, WLAN Controller).</span>
                        </div>
                        <div className={css.texts}>
                            <p>Empfohlene Massnahmen:</p>
                            <span>Wenn Sie möglicherweise Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz haben, sind Sie potentiell betroffen. Wenden Sie sich umgehend an Ihren IT-Dienstleistenden oder IT-Verantwortlichen, damit diese das genannte Web UI gegen aussen blockieren oder komplett  deaktivieren. Nur dadurch kann sichergestellt werden, dass sich niemand Zugriff auf Ihr Netzwerk verschaffen kann. Es empfiehlt sich, das System, auf bereits  erfolgte Attacken zu überprüfen</span>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton className={css.accordionBtn}>
                        <p>27.11.23</p>
                        <p>NEU</p>
                        <p>Cisco Schwachstelle</p>
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <p>Was ist betroffen?</p>
                                <span>Am 16. Oktober veröffentlichte Cisco ein die Information zu einer Schwachstelle in der Web UI von IOS XE. Die Schwachstelle hat die höchste CVSS-Bewertung von 10.0 ("kritisch") erhalten.  Wer Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz hat, ist grundsätzlich gefährdet. Das Web UI dient u.A. der Benutzerverwaltung auf de Geräten. Diese ist als Folge der Schwachstelle von aussen, also dem Internet, erreichbar.</span>
                            </div>
                            <div className={css.texts}>
                                <p>Mögliche Gefahren:</p>
                                <span>Die Schwachstelle mit der Kennung CVE-2023-20198 ermöglicht es, Angreifer, neue Accounts auf dem betroffenen System anzulegen. Angreifende sind somit in der Lage, Kontrolle über betroffene IOS XE Systeme zu erlangen und die Geräte zu kompromittieren, auf denen die Software eingesetzt wird (Swiches, Router, WLAN Controller).</span>
                            </div>
                            <div className={css.texts}>
                                <p>Empfohlene Massnahmen:</p>
                                <span>Wenn Sie möglicherweise Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz haben, sind Sie potentiell betroffen. Wenden Sie sich umgehend an Ihren IT-Dienstleistenden oder IT-Verantwortlichen, damit diese das genannte Web UI gegen aussen blockieren oder komplett  deaktivieren. Nur dadurch kann sichergestellt werden, dass sich niemand Zugriff auf Ihr Netzwerk verschaffen kann. Es empfiehlt sich, das System, auf bereits  erfolgte Attacken zu überprüfen</span>
                            </div>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton className={css.accordionBtn}>
                        <p>27.11.23</p>
                        <p>NEU</p>
                        <p>Cisco Schwachstelle</p>
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <p>Was ist betroffen?</p>
                                <span>Am 16. Oktober veröffentlichte Cisco ein die Information zu einer Schwachstelle in der Web UI von IOS XE. Die Schwachstelle hat die höchste CVSS-Bewertung von 10.0 ("kritisch") erhalten.  Wer Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz hat, ist grundsätzlich gefährdet. Das Web UI dient u.A. der Benutzerverwaltung auf de Geräten. Diese ist als Folge der Schwachstelle von aussen, also dem Internet, erreichbar.</span>
                            </div>
                            <div className={css.texts}>
                                <p>Mögliche Gefahren:</p>
                                <span>Die Schwachstelle mit der Kennung CVE-2023-20198 ermöglicht es, Angreifer, neue Accounts auf dem betroffenen System anzulegen. Angreifende sind somit in der Lage, Kontrolle über betroffene IOS XE Systeme zu erlangen und die Geräte zu kompromittieren, auf denen die Software eingesetzt wird (Swiches, Router, WLAN Controller).</span>
                            </div>
                            <div className={css.texts}>
                                <p>Empfohlene Massnahmen:</p>
                                <span>Wenn Sie möglicherweise Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz haben, sind Sie potentiell betroffen. Wenden Sie sich umgehend an Ihren IT-Dienstleistenden oder IT-Verantwortlichen, damit diese das genannte Web UI gegen aussen blockieren oder komplett  deaktivieren. Nur dadurch kann sichergestellt werden, dass sich niemand Zugriff auf Ihr Netzwerk verschaffen kann. Es empfiehlt sich, das System, auf bereits  erfolgte Attacken zu überprüfen</span>
                            </div>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton className={css.accordionBtn}>
                        <p>27.11.23</p>
                        <p>NEU</p>
                        <p>Cisco Schwachstelle</p>
                    </AccordionButton>
                    <AccordionPanel>
                        <div className={css.acBlock}>
                            <div className={css.texts}>
                                <p>Was ist betroffen?</p>
                                <span>Am 16. Oktober veröffentlichte Cisco ein die Information zu einer Schwachstelle in der Web UI von IOS XE. Die Schwachstelle hat die höchste CVSS-Bewertung von 10.0 ("kritisch") erhalten.  Wer Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz hat, ist grundsätzlich gefährdet. Das Web UI dient u.A. der Benutzerverwaltung auf de Geräten. Diese ist als Folge der Schwachstelle von aussen, also dem Internet, erreichbar.</span>
                            </div>
                            <div className={css.texts}>
                                <p>Mögliche Gefahren:</p>
                                <span>Die Schwachstelle mit der Kennung CVE-2023-20198 ermöglicht es, Angreifer, neue Accounts auf dem betroffenen System anzulegen. Angreifende sind somit in der Lage, Kontrolle über betroffene IOS XE Systeme zu erlangen und die Geräte zu kompromittieren, auf denen die Software eingesetzt wird (Swiches, Router, WLAN Controller).</span>
                            </div>
                            <div className={css.texts}>
                                <p>Empfohlene Massnahmen:</p>
                                <span>Wenn Sie möglicherweise Geräte der Firma Cisco (wie Router, Switches und WLAN Controller) im Einsatz haben, sind Sie potentiell betroffen. Wenden Sie sich umgehend an Ihren IT-Dienstleistenden oder IT-Verantwortlichen, damit diese das genannte Web UI gegen aussen blockieren oder komplett  deaktivieren. Nur dadurch kann sichergestellt werden, dass sich niemand Zugriff auf Ihr Netzwerk verschaffen kann. Es empfiehlt sich, das System, auf bereits  erfolgte Attacken zu überprüfen</span>
                            </div>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default CurentAlerts;
