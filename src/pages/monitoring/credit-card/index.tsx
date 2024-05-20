import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/main-wrap";
import isAuth from "@/global/helpers/guard";

const MonitoringPage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <SuccessCreditCard />
            </MainWrap>
        </MailTemplate>
    )
};

export default isAuth(MonitoringPage);

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
import SuccessCreditCard from "@/modules/monitoring/components/success-credit-card";
export { getStaticProps };
