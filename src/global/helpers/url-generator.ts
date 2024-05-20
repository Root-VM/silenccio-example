
export const getDefaultUrl = () => {
    return `/`
}
export const getLoginUrl = () => {
    return `/login`
}

export const getLoginCompanyUrl = () => {
    return `/login/company`
}

export const getLoginConfirmUrl = () => {
    return `/login/confirm`
}

export const getAuthenticationInfoUrl = () => {
    return `/authentication/intro-info`
}

export const getRegistrationUrl = () => {
    return `/authentication/registration`
}

export const getPasswordResetUrl = () => {
    return `/authentication/password-reset`
}

export const getConfirmEmailUrl = () => {
    return `/authentication/confirm-email`
}
export const getRegistrationPersonalDataUrl = () => {
    return `/authentication/personal-data`
}

export const getRegistrationCompanyDataUrl = () => {
    return `/authentication/company-data`
}


export const getRegistrationPhoneUrl = () => {
    return `/authentication/phone`
}
export const getConfirmPhoneUrl  = () => {
    return `/authentication/confirm-phone`
}

export const getOnboardingUrl  = (step: number) => {
    return `/authentication/onboarding/${step}`
}

export const getDashboardUrl  = () => {
    return `/dashboard`
}

export const getProfileUrl  = () => {
    return `/profile`
}
export const getAlertsUrl  = () => {
    return `/alerts`
}

export const getTermsUrl = () => {
    return `/terms`
}

export const getMonitoringUrl  = () => {
    return `/monitoring`
}

export const getMonitoringStartUrl  = () => {
    return `/monitoring/start`
}
export const getMonitoringStepUrl  = (step: number) => {
    return `/monitoring/step/${step}`
}

export const getPhishingUrl  = () => {
    return `/phishing`
}

export const getPhishingStepUrl  = (step: number) => {
    return `/phishing/template/${step}`
}

export const getDataProtectionUrl  = () => {
    return `/data-protection`
}

export const getTermsConditionUrl  = () => {
    return `/terms`
}
