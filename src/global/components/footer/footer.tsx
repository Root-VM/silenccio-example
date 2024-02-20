import {FC} from "react";


import css from "./footer.module.scss";

const Footer: FC = () => {
    return (
        <div className={css.wrap}>
            <ul className={css.items}>
                <li className={css.active}>DE <span /></li>
                <li>EN <span /></li>
                <li>IT <span /></li>
                <li>FR</li>
            </ul>

            <ul className={css.list}>
                <li>Nutzungshinweise</li>
                <li><span /></li>
                <li>Datenschutz</li>
                <li>© 2019 AXA Versicherungen AG</li>
            </ul>
        </div>
    )
}

export default Footer;
