import {CampaignResponseApiType, EmployeeResponseApiType} from "@/global/api/phishing/types";

export function calculatePhishingFilledPercentage(data: any, variableName: string) {
    let totalCount = 0;
    let filledCount = 0;

    data.forEach((obj: any) => {
        const events = obj.events;
        if (Array.isArray(events) && events.length >= 0) {
            if (events.length === 0) {
                totalCount++;
                if (variableName === 'createdAt' || variableName === 'updatedAt') {
                    filledCount++;
                }
            } else {
                totalCount += events.length;
                events.forEach(event => {
                    if (event.hasOwnProperty(variableName) && event[variableName] !== null) {
                        filledCount++;
                    }
                });
            }
        }
    });

    if (totalCount === 0) {
        return 0;
    }

    return (filledCount / totalCount) * 100 ;
}

export function calculateCurrentPhishingFilledPercentage(data: any, variableName: string) {
    let totalCount = 0;
    let filledCount = 0;


    console.log(2,variableName, data)
    data.forEach((obj: any) => {
        const events = data;
        if (Array.isArray(events) && events.length >= 0) {
            if (events.length === 0) {
                totalCount++;
                if (variableName === 'createdAt' || variableName === 'updatedAt') {
                    filledCount++;
                }
            } else {
                totalCount += events.length;
                events.forEach(event => {
                    if (event.hasOwnProperty(variableName) && event[variableName] !== null) {
                        filledCount++;
                    }
                });
            }
        }
    });

    if (totalCount === 0) {
        return 0;
    }

    return (filledCount / totalCount) * 100 ;
}

export const  calculate = (arr:CampaignResponseApiType["events"], activityType: string) => {
    let count = 0;

    if(!arr?.length) {
        return count;
    }

    arr?.forEach((event: any) => {
        if (event[activityType] !== null) {
            count++;
        }
    });

    return count;
}
