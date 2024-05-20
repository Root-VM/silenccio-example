import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import IntroInfoBlock from "@/modules/authentication/componets/intro-info-block";
import {Show} from "@chakra-ui/react";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";

const IntroInfoPage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock title='Lorem Ipsum...' /></Show>
                <IntroInfoBlock />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default IntroInfoPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
