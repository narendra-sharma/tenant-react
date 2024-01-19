'use client';

import * as React from 'react';

import { logger } from '@/lib/default-logger';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';

export const UserContext = React.createContext(undefined);

export function UserProvider({ children }) {
  const [supabaseClient] = React.useState(createSupabaseClient());
  const [state, setState] = React.useState({
    user: null,
    error: null,
    isLoading: true,
  });

  // NOTE: Supabase Auth has `onAuthStateChange` event listener, but we didn't use it here
  //   because the custom auth flow does not support a similar approach.
  //   Instead, we use `checkSession` to refresh the user auth state.

  const checkSession = React.useCallback(async () => {
    try {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Something went wrong' }));
        return;
      }

      if (data?.session?.user) {
        setState((prev) => ({ ...prev, user: data.session.user, error: null }));
      }
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong' }));
    }
  }, [supabaseClient]);

  React.useEffect(() => {
    (async () => {
      await checkSession().catch(() => {
        // noop
      });
      setState((prev) => ({ ...prev, isLoading: false }));
    })().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        checkSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
