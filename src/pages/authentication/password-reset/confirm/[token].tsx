import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import {Show} from "@chakra-ui/react";
import PasswordResetConfirmForm from "@/modules/authentication/componets/forms/password-reset-confirm-form";

export const PasswordResetConfirmPage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'>
                    <TextsBlock title='Lorem Ipsum...' />
                </Show>
                <PasswordResetConfirmForm />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default PasswordResetConfirmPage;

// Translation props
import { getServerSideProps } from '@/global/helpers/locale-props';
export { getServerSideProps };

