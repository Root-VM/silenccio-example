import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import TextsBlock from "@/modules/authentication/componets/texts-block/texts-block";
import {Show} from "@chakra-ui/react";
import CompanyDataFrom from "@/modules/authentication/componets/forms/company-data-form";
import AuthenticationWrap from "@/modules/authentication/componets/authentication-wrap/authentication-wrap";

const CompanyDataPage: NextPage = () => {

    return (
        <MailTemplate hideAxa hideNavigation>
            <AuthenticationWrap>
                <Show breakpoint='(min-width: 961px)'><TextsBlock title='Lorem Ipsum...' /></Show>
                <CompanyDataFrom />
            </AuthenticationWrap>
        </MailTemplate>
    )
};

export default CompanyDataPage;

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
export { getStaticProps };

