import {FC} from "react";


import css from "./texts-block.module.scss";
import {useTranslations} from "use-intl";

const TextsBlock: FC<{title?: string}> = ({title = 'Wählen Sie Silenccio für mehr Sicherheit im Internet.'}) => {
    const t = useTranslations('AUTHENTICATE_BLOCK_TEXTS');

    return (
        <div className={css.wrap}>
            <p className={css.title}>{t('pre_title')}</p>
            <h1>{t('title')}</h1>
            <p className={css.text}>{t('text')}
            </p>
            <ul>
                <li>{t('list_item_1')}</li>
                <li>{t('list_item_2')}</li>
                <li>{t('list_item_3')}</li>
                <li>{t('list_item_4')}</li>
                {/*<li>{t('list_item_5')}</li>*/}
            </ul>
        </div>
    )
}

export default TextsBlock;
