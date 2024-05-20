import {FC, useEffect, useState} from "react";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    Drawer, DrawerBody,
    DrawerContent,
    DrawerOverlay, Modal, ModalBody, ModalContent,
    Show,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs, useDisclosure
} from "@chakra-ui/react";
import cn from 'classnames';
import Dropdown from 'react-dropdown';
import {useRouter} from "next/router";

import css from "./header.module.scss";
import {
    getAlertsUrl,
    getDashboardUrl,
    getDefaultUrl,
    getMonitoringUrl, getPhishingUrl,
    getProfileUrl
} from "@/global/helpers/url-generator";
import {getLoginToken} from "@/global/api/tokens";
import LogOut from "@/global/components/header/log-out";
import {useTranslations} from "use-intl";
import {useSelector} from "react-redux";
import {isPaidSelector} from "@/global/store/payment/selector";
import {changeAccountDataApi} from "@/global/api/account";

const MenuList: FC = () => {
    const router = useRouter();
    const [currentRoute, setCurrentRoute] = useState('');
    const t = useTranslations('MENU');
    const isPaid = useSelector(isPaidSelector);

    useEffect(() => {
        router.pathname.split('/').length && setCurrentRoute(router.pathname.split('/')[1]);
    }, [router]);

    const goTo = (route: string) => {
        router.push(route).then();
    }
    return (
        <ul className={css.menuList}>
            <li className={cn(currentRoute === 'dashboard' && css.active)}
                onClick={() => goTo(getDashboardUrl())}>{t('item_1')}
            </li>
            <li className={cn(currentRoute === 'alerts' && css.active)}
                onClick={() => goTo(getAlertsUrl())}>{t('item_2')}
            </li>

            <li className={cn(currentRoute === 'phishing' && css.active, !isPaid && css.disabled)}
                onClick={() => isPaid && goTo(getPhishingUrl())}>{t('item_3')}
            </li>
            <li className={cn(currentRoute === 'monitoring' && css.active)}
                onClick={() => goTo(getMonitoringUrl())}>{t('item_4')}
            </li>
            <li className={cn(currentRoute === 'profile' && css.active)}
                onClick={() => goTo(getProfileUrl())}>{t('item_5')}
            </li>
        </ul>
    )
}

const Header: FC<{ hideNavigation?: boolean, hideAxa?: boolean }> = ({hideNavigation, hideAxa}) => {
    const {isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const {locale} = useRouter();
    const leaveModal = useDisclosure();
    const t = useTranslations('HEADER');
    const tM = useTranslations('MENU');
    const tCommon = useTranslations('COMMON');
    const [type, setType] = useState<'ueber-axa.html' | 'private-customers.html'>('ueber-axa.html');
    const tLost = useTranslations('LOST_DATA');

    const changeLang = async (e: {value: string}) => {
        getLoginToken() && await changeAccountDataApi({language: String(e.value).toUpperCase()})

        router.push(router.pathname, router.asPath, {locale: e.value}).then();
    }

    return (
        <div className={cn(css.head, hideNavigation && css.hideNav)}>
            {/*mobile*/}
            <Show breakpoint='(max-width: 960px)'>
                <div className={css.mobileContent}>
                    <img className={css.logo} onClick={() => router.push(getDefaultUrl())}
                         src="/img/logo.svg" alt="logo"/>

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


                            {!hideNavigation &&
                                <Accordion className={cn('myAccordion', 'menuAccordion', 'simple', css.accordion)}
                                           allowToggle>
                                    <AccordionItem>
                                        <AccordionButton className={css.accordionBtn}
                                                         onClick={() => router.push(getDashboardUrl())}>
                                            {tM('item_1')}
                                        </AccordionButton>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionButton className={css.accordionBtn}
                                                         onClick={() => router.push(getAlertsUrl())}>
                                            {tM('item_2')}
                                        </AccordionButton>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionButton className={css.accordionBtn}
                                                         onClick={() => router.push(getPhishingUrl())}>
                                            {tM('item_3')}
                                        </AccordionButton>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionButton className={css.accordionBtn}
                                                         onClick={() => router.push(getMonitoringUrl())}>
                                            {tM('item_4')}
                                        </AccordionButton>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionButton className={css.accordionBtn}
                                                         onClick={() => router.push(getProfileUrl())}>
                                            {tM('item_5')}
                                        </AccordionButton>
                                    </AccordionItem>
                                </Accordion>
                            }
                            {!getLoginToken() && !hideAxa && <button className={cn('myBtn', css.mBtn)} onClick={() => {
                                window?.open('https://login.axa.ch/idp/startSSO.ping?PartnerSpId=Silenccio', '_blank')?.focus();
                            }}>{t('axa')}</button>}

                            {!hideAxa  && !!getLoginToken() && <LogOut />}

                            <ul className={css.menuList}>
                                <li className={css.disabled} onClick={() => leaveModal.onOpen()}>{t('list_1')}</li>
                                <li className={css.disabled} onClick={() => leaveModal.onOpen()}>{t('list_2')}</li>
                            </ul>

                            <div className={css.langs}>
                                <span className={css.active}>{tCommon('l_de')}</span>
                                <span>{tCommon('l_fr')}</span>
                                <span>{tCommon('l_en')}</span>
                                <span>{tCommon('l_it')}</span>
                            </div>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Show>

            {/*desktop*/}
            <Show breakpoint='(min-width: 961px)'>
                <Tabs className={cn('myTabs', css.tabs)}  variant='enclosed' defaultIndex={1} index={1}>
                    <TabList>
                        <Tab onClick={() => { setType('private-customers.html');setTimeout(() => leaveModal.onOpen(), 100)}}>
                            {t('list_1')}
                        </Tab>
                        <Tab>{t('list_2')}</Tab>
                        <Tab onClick={() => { setType('ueber-axa.html');setTimeout(() => leaveModal.onOpen(), 100)}}>{t('uber')}</Tab>

                        <div className={css.group}>
                            <Dropdown placeholder={tLost('dropdown_placeholder')} className={'myDropdownSimple'} options={[
                                {label: tCommon('l_de'), value: 'de'},
                                {label: tCommon('l_en'), value: 'en'},
                                {label: tCommon('l_it'), value: 'it'},
                                {label: tCommon('l_fr'), value: 'fr'},
                            ]} value={locale} onChange={changeLang}/>

                            {!hideAxa && !getLoginToken() && <button className='myBtn' onClick={() => window.open('https://login.axa.ch/idp/startSSO.ping?PartnerSpId=Silenccio', '_blank')?.focus()}>{t('axa')}</button>}

                            {!hideAxa  && !!getLoginToken() && <LogOut />}
                        </div>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <div className={css.content}>
                            <img className={css.logo} onClick={() => router.push(getDefaultUrl())}
                                     src="/img/logo.svg" alt="logo"/>

                                {!hideNavigation &&
                                    <MenuList />
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={css.content}>
                                <img className={css.logo} onClick={() => router.push(getDefaultUrl())}
                                     src="/img/logo.svg" alt="logo"/>

                                {!hideNavigation &&
                                    <MenuList />
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={css.content}>
                                <img className={css.logo} onClick={() => router.push(getDefaultUrl())}
                                     src="/img/logo.svg" alt="logo"/>

                                {!hideNavigation &&
                                    <MenuList />
                                }
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Show>

            <Modal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose}>
                <ModalContent className={'myModal'}>
                    <ModalBody>
                        <img src="/img/icons/close.svg" alt="close" className='close' onClick={() => leaveModal.onClose()}/>
                        <p className='title'>{t('leave')}</p>

                        <div className='btnGroup'>
                            <button className={cn('myBtn', 'small', css.btn)}
                                onClick={() => {
                                    let val: string =type;
                                    if(locale === 'de' && type === 'private-customers.html') {
                                        val = 'privatkunden.html';
                                    }
                                    leaveModal.onClose();
                                    window?.open(`https://www.axa.ch/${locale}/${val}`, '_blank')?.focus();
                                }}
                            >{tCommon('yes')}</button>
                            <button className={cn('myBtn', 'small', 'white', css.btn)} onClick={() => leaveModal.onClose()}
                            >{tCommon('no')}
                            </button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Header;
