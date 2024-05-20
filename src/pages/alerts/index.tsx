import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import WarningsBlock from "../../global/components/warnings-block";
import EmployeesTestBlock from "../../global/components/employees-test-block";
import CyberInsuranceBlock from "../../global/components/cyber-insurance-block";
import CurentAlerts from "@/modules/alerts/components/curent-alerts";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/main-wrap";
import isAuth from "@/global/helpers/guard";

const AlertsPage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <CurentAlerts />
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

export default isAuth(AlertsPage);

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
import MonitoringBlock from "@/global/components/monitoring-block";
export { getStaticProps };
