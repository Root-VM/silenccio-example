export type RegistrationResponseApiType = {
    "token": string,
    "type": string,
    "expiresAt": string
}

export type RegisterConfirmRequestType = {
    "id": number,
    "expiresAt": string
}

export type RegisterConfirmVerifyType = {
    "challengeId": number,
    "code": string
}
