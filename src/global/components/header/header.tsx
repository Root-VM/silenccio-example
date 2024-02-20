import {FC} from "react";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import cn from 'classnames';
import Dropdown from 'react-dropdown';

import css from "./header.module.scss";

const Header: FC = () => {
    return (
        <div className={css.head}>
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
        </div>
    )
}

export default Header;
