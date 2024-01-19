function generateToken() {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Rene',
  lastName: 'Wells',
  email: 'rene@devias.io',
};

class AuthClient {
  async signUp(_) {
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_) {
    return {
      error: 'Social authentication not implemented',
    };
  }

  async signInWithPassword(params) {
    const { email, password } = params;

    if (email !== 'rene@devias.io' || password !== 'Secret1') {
      return {
        error: 'Invalid credentials',
      };
    }

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async resetPassword(_) {
    return {
      error: 'Password reset not implemented',
    };
  }

  async updatePassword(_) {
    return {
      error: 'Update reset not implemented',
    };
  }

  async getUser() {
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut() {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
