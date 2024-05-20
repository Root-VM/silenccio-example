import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";

import MainWrap from "@/global/components/templates/mail-template/main-wrap/main-wrap";
import isAuth from "@/global/helpers/guard";
import WarningsBlock from "@/global/components/warnings-block";
import EmployeesTestBlock from "@/global/components/employees-test-block";
import CyberInsuranceBlock from "@/global/components/cyber-insurance-block";
import TemplateTwoBlock from "@/modules/phishing/components/template-two-block";

const PhishingTemplatePage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <TemplateTwoBlock />

                <div>
                    <MonitoringBlock />
                    <WarningsBlock />
                    <EmployeesTestBlock />
                    {/*<ItScanBlock />*/}
                    <CyberInsuranceBlock />
                </div>
            </MainWrap>
        </MailTemplate>
    )
};

export default isAuth(PhishingTemplatePage);

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
import MonitoringBlock from "@/global/components/monitoring-block";
export { getStaticProps };
