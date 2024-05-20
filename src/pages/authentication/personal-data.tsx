import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import PersonalDataFrom from "@/modules/authentication/componets/forms/personal-data-form";
import {Show} from "@chakra-ui/react";
import RegistrationWrap from "@/global/components/templates/mail-template/main-wrap/main-wrap";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";

const PersonalDataPage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock title='Lorem Ipsum...' /></Show>
                <PersonalDataFrom />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default PersonalDataPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
