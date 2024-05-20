import {FC} from "react";

import css from "./terms.module.scss";

import {data} from "@/global/data/terms/data";
import {useRouter} from "next/router";
const TermsProtection: FC = () => {
    const {locale} = useRouter();

    return (
        <div className={css.wrap}>
            {
                // @ts-ignore
                locale && <div dangerouslySetInnerHTML={{__html: data[locale]}}/>
            }

        </div>
)
}

export default TermsProtection;
