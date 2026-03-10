export const authService = {
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@incomelens.com' && password === 'admin123') {
                    resolve({
                        id: '1',
                        name: 'Admin User',
                        email: 'admin@incomelens.com',
                        token: 'mock-jwt-token-12345',
                        role: 'admin',
                    });
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 800);
        });
    },

    signup: async (name, email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: '2',
                    name,
                    email,
                    token: 'mock-jwt-token-67890',
                    role: 'user',
                });
            }, 1000);
        });
    },

    logout: () => {
        // Mock logout just resolves immediately
        return Promise.resolve();
    }
};
