import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import RegistrationWrap from "@/modules/registration/componets/registration-wrap/registration-wrap";
import WarningsBlock from "../../../global/components/warnings-block";
import EmployeesTestBlock from "../../../global/components/employees-test-block";
import ItScanBlock from "../../../global/components/it-scan-block";
import CyberInsuranceBlock from "../../../global/components/cyber-insurance-block";
import StepFive from "@/modules/monitoring/components/step-five";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/registration-wrap";

const MonitoringPage: NextPage = () => {

    return (
        <MailTemplate>
            <MainWrap>
                <StepFive />
                <div>
                    <WarningsBlock />
                    <EmployeesTestBlock />
                    <ItScanBlock />
                    <CyberInsuranceBlock />
                </div>
            </MainWrap>
        </MailTemplate>
    )
};

export default MonitoringPage;
