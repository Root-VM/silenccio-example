type LandingPage = {
    id: number;
    gophishId: number;
    html: string;
    createdAt: string;
    updatedAt: string;
};

type EmailTemplate = {
    id: number;
    gophishId: number;
    html: string | null;
    text: string;
    subject: string;
    createdAt: string;
    updatedAt: string;
    sender: string;
};

export type PresetResponseApiType = {
    id: number;
    landingPageId: number;
    emailTemplateId: number;
    name: string| any;
    description: string | any;
    landingPage: LandingPage;
    emailTemplate: EmailTemplate;
};

export type EmployeeRequestApiType = {
    email: string,
    firstName: string,
    lastName: string
}

export type EmployeeResponseApiType = {
    "id": number,
    "organisationId": number,
    "createdById": number,
    "email": string,
    "firstName": string,
    "lastName": string,
    "groupId": number,
    "events": {
        "id": number,
        "campaignId": number,
        "email": string,
        "emailSentDate": string,
        "emailOpenedDate": string,
        "clickedLinkDate": string,
        "submittedDataDate": string,
        "emailReportedDate": string
    }[]
};

export type EventResponseApiType = {
    "campaignId": number,
    "email": string,
    "emailSentDate": string,
    "emailOpenedDate": string,
    "clickedLinkDate": string,
    "submittedDataDate": string,
    "emailReportedDate": string
};


export type CampaignResponseApiType = {
    createdById: number;
    events: EventResponseApiType[];
    id: number;
    isCompleted: boolean;
    launchDate: string;
    name: string;
    organisationId: number;
    presetId: number;
    sendByDate: any;
}
