export const authService = {
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@incomelens.com' && password === 'admin123') {
                    resolve({
                        id: '1',
                        name: 'Expert Admin',
                        email: 'admin@incomelens.com',
                        token: 'mock-jwt-token-12345',
                        role: 'expert',
                    });
                } else if (email === 'student@incomelens.com' && password === 'student123') {
                    resolve({
                        id: '2',
                        name: 'Finance Student',
                        email: 'student@incomelens.com',
                        token: 'mock-jwt-token-student',
                        role: 'student',
                    });
                } else if (email === 'user@incomelens.com' && password === 'user123') {
                    resolve({
                        id: '3',
                        name: 'General User',
                        email: 'user@incomelens.com',
                        token: 'mock-jwt-token-user',
                        role: 'user',
                    });
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 800);
        });
    },

    signup: async (name, email, password) => {
        // eslint-disable-next-line no-unused-vars
        const response = await new Promise(resolve =>
            setTimeout(() => {
                resolve({
                    id: '2',
                    name,
                    email,
                    token: 'mock-jwt-token-67890',
                    role: 'user',
                });
            }, 1000)
        );
        return response;
    },

    logout: () => {
        // Mock logout just resolves immediately
        return Promise.resolve();
    }
};
