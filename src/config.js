import { AuthStrategy } from '@/lib/auth/strategy';
import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

export const config = {
  site: {
    name: 'Meters2Go',
    description: '',
    colorScheme: 'light',
    themeColor: '#0e0f11',
    primaryColor: 'purple',
    url: getSiteURL(),
  },
  logLevel: import.meta.env.VITE_LOG_LEVEL || LogLevel.ALL,
  auth: {
    strategy: import.meta.env.VITE_AUTH_STRATEGY || AuthStrategy.CUSTOM,
  },
  mapbox: {
    apiKey: import.meta.env.VITE_MAPBOX_API_KEY,
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  gtm: {
    id: import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID,
  },

};
