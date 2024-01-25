function generateToken() {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = localStorage.getItem('authUser');

class AuthClient {
  async signUp(token) {
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

    return { data: user?JSON.parse(user):null };
  }

  async signOut() {
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem("authUser");
    return {};
  }
}

export const authClient = new AuthClient();
