import {FC} from "react";
import {
    Accordion,
    AccordionButton,
    AccordionItem, AccordionPanel,
    Drawer, DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Show,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, useDisclosure
} from "@chakra-ui/react";
import cn from 'classnames';
import Dropdown from 'react-dropdown';

import css from "./header.module.scss";

const Header: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className={css.head}>
            {/*mobile*/}
            <Show breakpoint='(max-width: 960px)'>
                <div className={css.mobileContent}>
                    <img className={css.logo} src="/img/logo.svg" alt="logo"/>

                    <img className={css.burger} onClick={onOpen}
                         src="/img/icons/burger.svg" alt="burger"/>
                </div>
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent className={css.drag}>
                        <DrawerBody>
                            <img className={css.menuClose} onClick={onClose}
                                 src="/img/icons/menu-close.svg" alt="menu"/>

                            <Accordion className={cn('myAccordion', 'menuAccordion', 'simple', css.accordion)}>
                                <AccordionItem>
                                    <AccordionButton className={css.accordionBtn}>
                                        STARTSEITE
                                    </AccordionButton>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.accordionBtn}>
                                        DOKUMENTE
                                    </AccordionButton>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton className={css.accordionBtn}>
                                        VORSORGE & VERMÖGEN
                                    </AccordionButton>
                                </AccordionItem>
                            </Accordion>

                            <button className={cn('myBtn', css.mBtn)}>MYAXA Login</button>

                            <ul className={css.menuList}>
                                <li className={css.disabled}>Privatkunden</li>
                                <li className={css.disabled}>Unternehmenskunden</li>
                                <li>MYAXA</li>
                            </ul>

                            <div className={css.langs}>
                                <span className={css.active}>DE</span>
                                <span>FR</span>
                                <span>EN</span>
                                <span>IT</span>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Show>

            {/*desktop*/}
            <Show breakpoint='(min-width: 961px)'>
                <Tabs className={cn('myTabs', css.tabs)}  variant='enclosed'>
                    <TabList>
                        <Tab>Privatkunden</Tab>
                        <Tab>Unternehmenskunden</Tab>
                        <Tab>Über AXA</Tab>

                        <div className={css.group}>
                            <Dropdown className={'myDropdownSimple'} options={[
                                'DE', 'EN', 'IT'
                            ]}  value={'DE'} />

                            <button className='myBtn'>MYAXA LOGIN</button>
                        </div>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <div className={css.content}>
                                <img className={css.logo} src="/img/logo.svg" alt="logo"/>

                                <ul className={css.menuList}>
                                    <li className={css.active}>Dashboard</li>
                                    <li>Warnmeldungen</li>
                                    <li>Monitorings</li>
                                    <li>Profil</li>
                                </ul>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Show>
        </div>
    )
}

export default Header;
