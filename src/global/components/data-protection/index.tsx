import {FC} from "react";

import css from "./data-protection.module.scss";

import {data} from "@/global/data/data-protection/data";
import {useRouter} from "next/router";
const DataProtection: FC = () => {
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

export default DataProtection;
