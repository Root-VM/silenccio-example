"use client";
import {NextPage} from "next";
import MailTemplate from "@/global/components/templates/mail-template/mail-template";
import ItSecurity from "@/modules/dashboard/componets/it-security";
import WarningsBlock from "../../global/components/warnings-block";
import EmployeesTestBlock from "../../global/components/employees-test-block";
import CyberInsuranceBlock from "../../global/components/cyber-insurance-block";
import MainWrap from "@/global/components/templates/mail-template/main-wrap/main-wrap";
import isAuth from "@/global/helpers/guard";
import PaymentProvider from "@/modules/dashboard/providers/payment-provider";

const DashboardPage: NextPage = () => {

    return (
        <MailTemplate>
            <PaymentProvider />

            <MainWrap>
                <ItSecurity />
                <div>
                    <MonitoringBlock />
                    <WarningsBlock />
                    <EmployeesTestBlock />
                    <CyberInsuranceBlock />
                </div>
            </MainWrap>
        </MailTemplate>
    )
};

export default isAuth(DashboardPage);

// Translation props
import { getStaticProps } from '@/global/helpers/locale-props';
import MonitoringBlock from "@/global/components/monitoring-block";
export { getStaticProps };

