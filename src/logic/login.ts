export const login = async (email: string, password: string) => {
    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    document.cookie = `token=${response.text()}`;
}

export const register = async (username: string, email: string, password: string) => {
    const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }
}