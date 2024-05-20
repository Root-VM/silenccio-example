import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import {Show} from "@chakra-ui/react";
import ConfirmPhoneForm from "@/modules/authentication/componets/forms/confirm-phone-form";

const ConfirmationPhoneCodePage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock title='Lorem Ipsum...' /></Show>
                <ConfirmPhoneForm />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default ConfirmationPhoneCodePage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
