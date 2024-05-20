import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import RegistrationForm from "@/modules/authentication/componets/forms/registration-form";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";

const RegistrationPage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <TextsBlock title='Lorem Ipsum...' />
                <RegistrationForm />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default RegistrationPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };
