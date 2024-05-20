import moment from "moment";
import {getTranslationFromFile} from "@/global/helpers/get-translation-native";
import {getLocaleFromUrl} from "@/global/helpers/get-lang-native";
import {getFilterColor} from "@/global/helpers/filter-color";

const findingsHtml = (findings: any, texts: any) => {
    const grouped_findings = findings.reduce((acc: any, currentItem: any) => {
        const tag = currentItem?.tag;
        const index = acc.findIndex((group: any) => group[0].tag === tag);
        if (index !== -1) {
            acc[index].push(currentItem);
        } else {
            acc.push([currentItem]);
        }
        return acc;
    }, []);

    return grouped_findings.map((findings: any) => {
        let title;
        let list = '';

        if (findings[0].tag === "NETWORK") {
            title = `<div class="title_line" style="margin-top: 15px"><div class="icon"><img src="./img/${getFilterColor(findings, 'NETWORK', !!findings[0]?.empty)}-circle.svg" alt="red"><img src="./img/network.svg" alt="network"></div><h3>${texts?.category_1}</h3></div>`
        }
        if (findings[0].tag === "WEB_PRESENCE") {
            title = `<div class="title_line" style="margin-top: 15px"><div class="icon"><img src="./img/${getFilterColor(findings, 'WEB_PRESENCE', !!findings[0]?.empty)}-circle.svg" alt="red"><img src="./img/planet.svg" alt="network"></div><h3>${texts?.category_2}</h3></div>`
        }
        if (findings[0].tag === "MAIL") {
            title = `<div class="title_line" style="margin-top: 15px"><div class="icon"><img src="./img/${getFilterColor(findings, 'MAIL', !!findings[0]?.empty)}-circle.svg" alt="red"><img src="./img/mail.svg" alt="network"></div><h3>${texts?.category_3}</h3></div>`
        }
        if (findings[0].tag === "DATA_LEAK") {
            title = `<div class="title_line" style="margin-top: 15px"><div class="icon"><img src="./img/${getFilterColor(findings, 'DATA_LEAK', !!findings[0]?.empty)}-circle.svg" alt="red"><img src="./img/folder.svg" alt="network"></div><h3>${texts?.category_4}</h3></div>`
        }

        findings.map((finding: any) => {
            if (!finding?.empty) {
                list = list + `<div style="margin-bottom: 40px"><h4 style="margin-bottom: 10px">&nbsp;&nbsp;&nbsp;${finding?.name}<svg class="bg_color" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: -7px; left: 0; width: 100%; height: calc(100% + 6px); z-index: -1;"><rect width="100%" height="100%" x="10" y="10" fill="#D3E3F5" /></svg></h4><div class="content"><i>${texts?.dashboard_influence_title}</i><p >${finding?.description?.cLevel?.cause}</p></div><div class="content"><i >${texts?.dashboard_what_can_happen_title}</i><p >${finding?.description?.cLevel?.meaning}</p></div><div class="content"><i>${texts?.expert}</i><p>${finding?.description?.technical}</p></div></div>`;
            }
        })

        return title + list;
    });
}

function modifyString(str: string | null) {
    if (!str) {
        return  '';
    }
    return str.replace(/–/g, "-<br>");
}

const template = async (
    account: any,
    organisation_data: any,
    subscription: any,
    lastLoginDate: string,
    lastScanDate: string,
    globalColor: string,
    findings: any,
    phishingColor: string,
    organisation_name: string,
    webs: any,
    questionnaire: any,
    email: any
) => {
    const secondary_title1 = await getTranslationFromFile("DASHBOARD_PAGE." + "secondary_title1", getLocaleFromUrl())
    const secondary_title2 = await getTranslationFromFile("DASHBOARD_PAGE." + "secondary_title2", getLocaleFromUrl())
    const secondary_title3 = await getTranslationFromFile("DASHBOARD_PAGE." + "secondary_title3", getLocaleFromUrl())
    const category_1 = await getTranslationFromFile("DASHBOARD_PAGE." + "category_1", getLocaleFromUrl())
    const category_2 = await getTranslationFromFile("DASHBOARD_PAGE." + "category_2", getLocaleFromUrl())
    const category_3 = await getTranslationFromFile("DASHBOARD_PAGE." + "category_3", getLocaleFromUrl())
    const category_4 = await getTranslationFromFile("DASHBOARD_PAGE." + "category_4", getLocaleFromUrl())
    const category_5 = await getTranslationFromFile("DASHBOARD_PAGE." + "category_5", getLocaleFromUrl())
    const dashboard_influence_title = await getTranslationFromFile("LOST_DATA." + "dashboard_influence_title", getLocaleFromUrl())
    const expert = await getTranslationFromFile("LOST_DATA." + "dashboard_expert_mode_headline", getLocaleFromUrl())
    const dashboard_what_can_happen_title = await getTranslationFromFile("LOST_DATA." + "dashboard_what_can_happen_title", getLocaleFromUrl())
    const last = await getTranslationFromFile("DASHBOARD_PAGE." + "secondary_text_2", getLocaleFromUrl())
    const male = await getTranslationFromFile("LOST_DATA." + "sex_male", getLocaleFromUrl())
    const female = await getTranslationFromFile("LOST_DATA." + "sex_female", getLocaleFromUrl())
    const export_date = await getTranslationFromFile("PDF_Export." + "export_date", getLocaleFromUrl())
    const contract_duration = await getTranslationFromFile("PDF_Export." + "contract_duration", getLocaleFromUrl())
    const address = await getTranslationFromFile("PDF_Export." + "address", getLocaleFromUrl())
    const contract_owner = await getTranslationFromFile("PDF_Export." + "contract_owner", getLocaleFromUrl())
    const title2 = await getTranslationFromFile("PAYMENT_FORM_MODAL." + "title", getLocaleFromUrl())
    const title = await getTranslationFromFile("LOST_DATA." + "paid_productname", getLocaleFromUrl())
    const domain = await getTranslationFromFile("PDF_Export." + "URL", getLocaleFromUrl())
    const email_domain = await getTranslationFromFile("MONITORING_PAGE." + "email_domain", getLocaleFromUrl())
    const q_title = await getTranslationFromFile("PDF_Export." + "payment", getLocaleFromUrl())
    const q_contact = await getTranslationFromFile("PDF_Export." + "contact_form", getLocaleFromUrl())
    const q_login = await getTranslationFromFile("PDF_Export." + "login", getLocaleFromUrl())
    const q_link = await getTranslationFromFile("QUESTIONNAIRES_ITEM." + "link", getLocaleFromUrl())
    const yes = await getTranslationFromFile("COMMON." + "yes", getLocaleFromUrl())
    const no = await getTranslationFromFile("COMMON." + "no", getLocaleFromUrl())
    const dont_know = await getTranslationFromFile("COMMON." + "dont_know", getLocaleFromUrl())

    return `<body><style>@import url('https://fonts.cdnfonts.com/css/georgia-2');
.icon{height: 45px!important;width: 45px!important;}h3{font-size: 19px!important;}
.content i::first-letter{text-transform:capitalize;}.line{margin-bottom: 10px!important; min-height: 40px;}.line p{max-width: 110px!important; min-width: 110px!important} .group_t >div:nth-child(2) .line span{max-width: 260px!important; min-width: 260px!important;} .line span{max-width: 170px!important; min-width: 170px!important; word-break: break-word; white-space: normal;} .wrap{padding-top: 15px; padding-bottom: 15px;}h4{line-height: 18px!important; padding: 5px 10px; position: relative; display: flex;}h2{margin-top: 15px!important;}</style>
    <div class="wrap">
        <div style="min-height: 10px; width: 1px"></div>
        <h1 style="font-family: 'Georgia'!important;">${title}</h1>
        <p class="top_t">${organisation_name}</p>
        <p class="top_t">${export_date} ${moment().format('DD.MM.YYYY HH:mm')}</p>
        <div style="min-height: 10px; width: 1px"></div>
        <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: -10px; width: 100%; height: 100%; z-index: -1;"><rect width="100%" height="100%" x="10" y="10" fill="#F4F8FC" /></svg>
    </div>

    <h2>${title2}</h2>

    <div class="top_data_block">
        <img src="./img/attention-${globalColor}.svg" alt="attention">
        <div>
            <strong>
                        ${globalColor === 'red' ? modifyString(secondary_title1) : ''}
                        ${globalColor === 'yellow' ?  modifyString(secondary_title2) : ''}
                        ${globalColor === 'green' ? modifyString(secondary_title3) : ''}
            </strong>
            <p>${last} ${moment(lastScanDate).format('DD.MM.YYYY HH:mm')}</p>
        </div>
    </div>

    <div class="boxes">
        <div class="box">
            <div class="icon">
                <img src="./img/${getFilterColor(findings, 'NETWORK')}-circle.svg" alt="red">
                <img src="./img/network.svg" alt="network">
            </div>
            <p>${category_1}</p>
        </div>
        <div class="box">
            <div class="icon">
                <img src="./img/${getFilterColor(findings, 'WEB_PRESENCE')}-circle.svg" alt="yellow">
                <img src="./img/planet.svg" alt="planet">
            </div>
            <p>${category_2}</p>
        </div>
        <div class="box">
            <div class="icon">
                <img src="./img/${getFilterColor(findings, 'MAIL')}-circle.svg" alt="yellow">
                <img src="./img/planet.svg" alt="planet">
            </div>
            <p>${category_3}</p>
        </div>
        <div class="box">
            <div class="icon">
                <img src="./img/${getFilterColor(findings, 'DATA_LEAK')}-circle.svg" alt="green">
                <img src="./img/folder.svg" alt="folder">
            </div>
            <p>${category_4}</p>
        </div>
        <div class="box" ${phishingColor === 'grey' ? ('style=\'filter: grayscale(100%); opacity: 0.4;\'') : ''}>
            <div class="icon">
                <img src="./img/${phishingColor === 'grey' ? 'green': phishingColor }-circle.svg" alt="green" >
                <img src="./img/triangle.svg" alt="triangle">
            </div>
            <p>${category_5}</p>
        </div>
    </div>

    <div style="position: relative; height: 40px; width: 100%; margin-bottom: 30px; margin-top: -22px">
        <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: -10px; width: 100%; height: 100%; z-index: -1;"><rect width="100%" height="100%" x="10" y="10" fill="#F4F8FC" /></svg>
    </div>
    
    <div style="display: flex" class="group_t">
        <div style="margin-right: 15px">
            <div class="line">
                <p><strong>${contract_owner}</strong></p>
                <span>
                    ${account?.firstName} ${account?.lastName}
                </span>
            </div>
            <div class="line">
                <p><strong>${address}</strong></p>
                <span>
                    ${organisation_data?.street} ${organisation_data?.houseNumber} <br>
                    ${organisation_data?.zipCode} ${organisation_data?.city}
                </span>
            </div>
            <div class="line">
                <p><strong>${contract_duration}</strong></p>
                <span>
                    ${moment(subscription?.startedAt).format('DD.MM.YYYY')} -
                    ${moment(subscription?.expiresAt).format('DD.MM.YYYY')}
                </span>
            </div>
        </div>
        <div>
            <div class="line">
                <p><strong>${domain}</strong></p>
                <span>
                    ${webs?.protocol}://${webs?.hostname}
                </span>
            </div>
            <div class="line">
                <p><strong>${q_title}</strong></p>
                <span>
                    ${questionnaire?.websiteHasPayment === 'true' ? yes : ''}
                    ${questionnaire?.websiteHasPayment === 'false' ? no : ''}
                    ${questionnaire?.websiteHasPayment === 'null' ? dont_know : ''}
                </span>
            </div>
            <div class="line">
                <p><strong>${q_contact}:</strong></p>
                <span>
                    ${questionnaire?.websiteHasContactForm === 'true' ? yes : ''}
                    ${questionnaire?.websiteHasContactForm === 'false' ? no : ''}
                    ${questionnaire?.websiteHasContactForm === 'null' ? dont_know : ''}
                </span>
            </div>
             ${questionnaire?.websiteHasLogin === 'true' && questionnaire?.websiteLoginLink ? (
                `<div class="line"><p><strong>${q_login}:</strong></p><span>${questionnaire?.websiteLoginLink}</span></div>`) : ''
            }
            <div class="line">
                <p><strong>${email_domain}:</strong></p>
                <span>
                    ${email?.sender}
                </span>
            </div>
        </div>
    </div>
` + findingsHtml(findings, {category_1, category_2, category_3, category_4, dashboard_influence_title, dashboard_what_can_happen_title, expert}).join(" ") +
'</body>';
}

export const exportBodyGeneration = async (data:{
    account: any,
    organisation_data: any,
    subscription: any,
    lastLoginDate: string,
    lastScanDate: string,
    globalColor: string,
    findings: any,
    phishingColor: string,
    webs: any,
    questionnaire: any,
    email: any
}) => {
    const account_default = {
        accountId: 1,
        createdAt: "",
        firstName: "",
        id: 1,
        language: "",
        lastName: "",
        positionInCompany: "",
        sex: "",
        updatedAt: ""
    }
    const organisation_data_default = {
        city: '',
        createdAt: "",
        houseNumber: "",
        id: 6,
        organisationId: 7,
        phone: "",
        street: "",
        updatedAt: "",
        zipCode: ""
    }

    let account_data = data?.account?.accountData ? data?.account?.accountData : account_default;
    let organisation_data = data?.organisation_data[0]?.organisationData ? data?.organisation_data[0]?.organisationData : organisation_data_default;
    let organisation_name = data?.organisation_data[0]?.name ? data?.organisation_data[0]?.name : '';

    return await template(
        account_data,
        organisation_data,
        data?.subscription,
        data?.lastLoginDate ? data?.lastLoginDate : '',
        data?.lastScanDate ? data?.lastScanDate : '',
        data?.globalColor ? data?.globalColor : '',
        data.findings,
        data?.phishingColor,
        organisation_name,
        data?.webs?.length ? data?.webs[0] : data?.webs,
        data?.questionnaire,
        data?.email?.length ? data?.email[0] : data?.email
    );
}
