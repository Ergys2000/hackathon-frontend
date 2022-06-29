
type AuthObject = {
    status: string;
    result: {token: string, userId: number, role: string};
    message: string;
};
export const API_LINK = process.env.BACKEND_LINK || "http://localhost:8080";
export const authenticate = async (username: string, password: string): Promise<AuthObject> => {
    return fetch(`${API_LINK}/authenticate`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({username: username, password: password})
    }).then(res => res.json()).then(res => res);
}

export const requestResetToken = async (email: string): Promise<any> => {
    return await fetch(`${API_LINK}/reset/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
    }).then(res => res.json());
}

export const verifyResetToken = async (email: string, code: string): Promise<any> => {
    return await fetch(`${API_LINK}/reset/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, resetKey: code})
    }).then(res => res.json());
}

export const resetPassword = async (email: string, code: string, password: string, confirmPassword: string): Promise<any> => {
    return await fetch(`${API_LINK}/reset/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, resetKey: code, newPassword: password, confirmNewPassword: confirmPassword})
    }).then(res => res.json());
}