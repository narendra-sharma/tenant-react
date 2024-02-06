'use client';

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useRoutes } from 'react-router-dom';

import '@/styles/global.css';

import { config } from '@/config';
import { routes } from '@/routes';
import { UserProvider } from '@/contexts/auth/user-context';
import { SettingsConsumer, SettingsProvider } from '@/contexts/settings';
import { useInitialSettings } from '@/hooks/use-initial-settings';
import { Analytics } from '@/components/core/analytics';
import { NProgress } from '@/components/core/nprogress';
import { SettingsButton } from '@/components/core/settings-button';
import { ThemeRegistry } from '@/components/core/theme-registry';
import { Toaster } from '@/components/core/toaster';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch } from 'react-redux';
import { get_user_profile_details } from './reduxData/user/userAction';

const metadata = {
  title: config.site.name,
};

export function App() {
  const element = useRoutes(routes);
  const initialSettings = useInitialSettings();
  const dispatch=useDispatch();
  React.useEffect(() => {
    get_user_profile_details(dispatch);
  }, []);
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Analytics>
        <UserProvider>
          <SettingsProvider settings={initialSettings}>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeRegistry colorScheme={settings.colorScheme} primaryColor={settings.primaryColor}>
                  <Helmet>
                    <meta content={settings.colorScheme} name="color-scheme" />
                    <meta content={config.site.themeColor} name="theme-color" />
                  </Helmet>
                  {element}
                  <SettingsButton />
                  <Toaster position="top-right" />
                  <NProgress />
                  <LoadingSpinner/>
                </ThemeRegistry>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </UserProvider>
      </Analytics>
    </React.Fragment>
  );
}
