import { config } from '@/config';
import { AuthStrategy } from '@/lib/auth/strategy';

import { UserContext as CustomUserContext, UserProvider as CustomUserProvider } from './custom/user-context';
import { UserContext as SupabaseUserContext, UserProvider as SupabaseUserProvider } from './supabase/user-context';

// eslint-disable-next-line import/no-mutable-exports -- Export based on config
let UserProvider;

// eslint-disable-next-line import/no-mutable-exports -- Export based on config
let UserContext;

switch (config.auth.strategy) {
  case AuthStrategy.CUSTOM:
    UserContext = CustomUserContext;
    UserProvider = CustomUserProvider;
    break;
  case AuthStrategy.SUPABASE:
    UserContext = SupabaseUserContext;
    UserProvider = SupabaseUserProvider;
    break;
  default:
    throw new Error('Invalid auth strategy');
}

export { UserProvider, UserContext };
