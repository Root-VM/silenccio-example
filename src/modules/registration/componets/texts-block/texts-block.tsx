import {FC} from "react";


import css from "./texts-block.module.scss";

const TextsBlock: FC = () => {
    return (
        <div className={css.wrap}>
            <p className={css.title}>SILENCCIO</p>
            <h1>Wählen Sie Silenccio für mehr Sicherheit im Internet.</h1>
            <p className={css.text}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>
        </div>
    )
}

export default TextsBlock;
