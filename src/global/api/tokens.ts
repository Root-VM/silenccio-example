export const setRegisterToken = (data: string) => {
    window.localStorage.setItem('registerToken', data);
}

export const getRegisterToken = (): string | null => {
    return window.localStorage.getItem('registerToken');
};

export const getAccessToken = (): string | null => {
    const tokenData = window.localStorage.getItem('accessToken');

    if (!tokenData) {
        return null;
    }

    const { expiresAt, data } = JSON.parse(tokenData);
    const expirationDate = new Date(expiresAt);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
        window.localStorage.removeItem('accessToken');
        return null;
    }

    return data;
};

export const setAccessToken = (expiresAt: string, data: string) => {
    window.localStorage.setItem('accessToken', JSON.stringify({ expiresAt, data }));
}

export const setLoginToken = ( expiresAt: string, data: string) => {
    window.localStorage.setItem('loginToken', JSON.stringify({ expiresAt, data }));
}

export const getLoginToken = (): string | null => {
    const tokenData = window.localStorage.getItem('loginToken');

    if (!tokenData) {
        return null;
    }

    const { expiresAt, data } = JSON.parse(tokenData);
    const expirationDate = new Date(expiresAt);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
        window.localStorage.removeItem('loginToken');
        return null;
    }

    return data;
};

export const setChallengeToken = ( expiresAt: string, data: string, id: number) => {
    window.localStorage.setItem('challengeToken', JSON.stringify({ expiresAt, data, id }));
}

export const getChallengeToken = (): string | null => {
    const tokenData = window.localStorage.getItem('challengeToken');

    if (!tokenData) {
        return null;
    }

    const { expiresAt, data } = JSON.parse(tokenData);
    const expirationDate = new Date(expiresAt);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
        window.localStorage.removeItem('challengeToken');
        return null;
    }

    return data;
};

export const getChallengeTokenId = (): string | null => {
    const tokenData = window.localStorage.getItem('challengeToken');

    if (!tokenData) {
        return null;
    }

    const { id } = JSON.parse(tokenData);

    return id;
};
