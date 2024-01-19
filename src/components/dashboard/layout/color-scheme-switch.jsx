'use client';

import * as React from 'react';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { useColorScheme } from '@mui/joy/styles';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import { Moon as MoonIcon } from '@phosphor-icons/react/dist/ssr/Moon';
import { Sun as SunIcon } from '@phosphor-icons/react/dist/ssr/Sun';

import { setSettings as setPersistedSettings } from '@/lib/settings/set-settings';
import { useSettings } from '@/hooks/use-settings';

export function ColorSchemeSwitch() {
  const { settings, setSettings } = useSettings();
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleToggle = (event, value) => {
    if (value) {
      const newColorScheme = value;

      const newSettings = {
        ...settings,
        colorScheme: newColorScheme,
      };

      setSettings(newSettings);
      setPersistedSettings(newSettings);

      setColorScheme(newColorScheme);
    }
  };

  return (
    <Tabs
      onChange={handleToggle}
      sx={{
        borderRadius: 'var(--joy-radius-lg)',
        '& .MuiTabList-root': {
          bgcolor: 'var(--joy-palette-neutral-900)',
        },
        '& .MuiTab-root': {
          color: 'var(--joy-palette-neutral-400)',
          '&.Mui-selected': {
            bgcolor: 'var(--joy-palette-neutral-950)',
            color: 'var(--joy-palette-common-white)',
          },
          '&:not(&.Mui-selected):hover': {
            bgcolor: 'var(--joy-palette-neutral-800)',
            color: 'var(--joy-palette-common-white)',
          },
        },
      }}
      value={colorScheme}
      variant="custom"
    >
      <TabList>
        <Tab value="light">
          <ListItemDecorator>
            <SunIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </ListItemDecorator>
          Light
        </Tab>
        <Tab value="dark">
          <ListItemDecorator>
            <MoonIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </ListItemDecorator>
          Dark
        </Tab>
      </TabList>
    </Tabs>
  );
}
