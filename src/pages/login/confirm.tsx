import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import {Show} from "@chakra-ui/react";
import ConfirmCodeForm from "@/modules/login/components/confirm-code-form";

const LoginConfirmPage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'>
                    <TextsBlock title='Lorem Ipsum...' />
                </Show>
                <ConfirmCodeForm />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default LoginConfirmPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
