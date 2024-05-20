import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import WarningsBlock from "../../../global/components/warnings-block";
import EmployeesTestBlock from "../../../global/components/employees-test-block";
import CyberInsuranceBlock from "../../../global/components/cyber-insurance-block";
import StepOne from "@/modules/monitoring/components/step-one";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/main-wrap";
import isAuth from "@/global/helpers/guard";

const MonitoringPage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <StepOne />
                <div>
                    {/*<MonitoringBlock />*/}
                    <WarningsBlock />
                    <EmployeesTestBlock />
                    {/*<ItScanBlock />*/}
                    <CyberInsuranceBlock />
                </div>
            </MainWrap>
        </MailTemplate>
    )
};

export default isAuth(MonitoringPage);

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
import MonitoringBlock from "@/global/components/monitoring-block";
export { getStaticProps };
