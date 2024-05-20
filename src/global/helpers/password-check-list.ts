export function passwordCheckList(password: string) {
    return {
        length: password.length >= 8 && password.length <= 25,
        digit: /\d/.test(password),
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        special: /[^a-zA-Z0-9]/.test(password),
        noWhitespace: !/\s/.test(password)
    };
}

export function isPasswordValid(password: string) {
    const checklist = {
        length: password.length >= 8 && password.length <= 25,
        digit: /\d/.test(password),
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        special: /[^a-zA-Z0-9]/.test(password),
        noWhitespace: !/\s/.test(password)
    };

    for (const key in checklist) {
        // @ts-ignore
        if (!checklist[key]) {
            return false;
        }
    }
    return true;
}
