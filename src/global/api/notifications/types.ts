export type NotificationCountResponseApiType = {
    "count": number
}

export type PostNotificationTranslationsType = {
        "id": number,
        "title": string,
        "body": string,
        "language": "DE" | "EN",
        "postNotificationId": number,
        "createdAt": string,
        "updatedAt": string,
        "cve":string,
        "potentialRisks": string,
        "recommendedAction": string,
        "whatIsAffected": string

}
export type NotificationResponseApiType = {
    "id": number,
    "publishedAt": string,
    "postNotificationTranslations": PostNotificationTranslationsType[],
    "read": boolean
}
