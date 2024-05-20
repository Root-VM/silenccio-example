import {FC, useEffect, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {EmployeeResponseApiType} from "@/global/api/phishing/types";
import {useTranslations} from "use-intl";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
};

const Chart: FC<{employee: EmployeeResponseApiType}> = ({employee}) => {
    const [data, setData] = useState<any>({labels: [],
        datasets: []});
    const tC = useTranslations('PHISHING_COMPANY_CARD');

    useEffect(() => {
        if(employee?.events?.length) {
            let labels: string[] = [];
            let email_sent_date: number[] = [];
            let email_opened_date: number[] = [];
            let clicked_link_date: number[] = [];
            let submitted_data_date: number[] = [];
            let email_reported_date: number[] = [];

            employee?.events?.forEach((event: any) => {
                if(event?.emailSentDate) {
                    labels.push(new Date(event?.emailSentDate).toLocaleDateString('de-DE'));
                    email_sent_date.push(Number(!!event?.emailSentDate));
                    email_opened_date.push(Number(!!event?.emailOpenedDate));
                    submitted_data_date.push(Number(!!event?.submittedDataDate));
                    email_reported_date.push(Number(!!event?.emailReportedDate));
                    clicked_link_date.push(Number(!!event?.clickedLinkDate));
                }
            })

            setData({
                labels,
                datasets: [
                    {
                        label: tC('email_1'),
                        data: email_sent_date,
                        backgroundColor: '#999999',
                        stack: 'Stack 0',
                        barThickness: 60,
                        borderWidth: 1,
                    },
                    {
                        label: tC('email_2'),
                        data: email_opened_date,
                        backgroundColor: '#D9D9D9',
                        stack: 'Stack 0',
                        barThickness: 60,
                        borderWidth: 1,
                    },
                    {
                        label: tC('link'),
                        data: clicked_link_date,
                        backgroundColor: '#BC9D45',
                        stack: 'Stack 0',
                        barThickness: 60,
                        borderWidth: 1,
                    },
                    {
                        label: tC('date'),
                        data: submitted_data_date,
                        backgroundColor: '#C91432',
                        stack: 'Stack 0',
                        barThickness: 60,
                        borderWidth: 1,
                    },
                    {
                        label: tC('email_3'),
                        data: email_reported_date,
                        backgroundColor: '#169E3E',
                        stack: 'Stack 0',
                        barThickness: 60,
                        borderWidth: 1,
                    },
                ],
            })
        }
        console.log(1, employee);
    }, [employee]);

    return (
        <>{data && <Bar options={options} data={data}/>}</>
    )
}

export default Chart;
