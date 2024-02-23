import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import TextsBlock from "@/modules/registration/componets/texts-block/texts-block";
import IntroInfoBlock from "@/modules/registration/componets/intro-info-block";
import {Show} from "@chakra-ui/react";

const RegistrationPage: NextPage = () => {

    return (
        <MailTemplate>
            <RegistrationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock /></Show>
                <IntroInfoBlock />
            </RegistrationWrap>
        </MailTemplate>
    )
};

export default RegistrationPage;
