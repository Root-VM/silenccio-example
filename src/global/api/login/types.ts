import {loginOrganisationsApi} from "@/global/api/login/index";

export type LoginResponseApiType = {
    "challenge": {
        "id": number,
        "expiresAt": string
    },
    "token": {
        "token": string,
        "type": "login"
        "expiresAt": string
    }
}
export type LoginOrganisationsResponseApiType = {
    "id": number,
    "name": string,
    "roles": string[]
}[]
