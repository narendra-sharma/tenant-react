'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretUp as CaretUpIcon } from '@phosphor-icons/react/dist/ssr/CaretUp';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';
import { Logo } from '@/components/core/logo';
import { NoSSR } from '@/components/core/no-ssr';

import { ColorSchemeSwitch } from './color-scheme-switch';
import { CurrentUser } from './current-user';
import { icons } from './nav-icons';

export function SideNav({ items }) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--Layout-background)',
        '--SideNav-color': 'var(--joy-palette-common-white)',
        '--NavItem-color': 'var(--joy-palette-neutral-200)',
        '--NavItem-active-background': 'var(--joy-palette-primary-solidBg)',
        '--NavItem-active-color': 'var(--joy-palette-common-white)',
        '--NavItem-active-icon-color': 'var(--joy-palette-common-white)',
        '--NavItem-open-color': 'var(--joy-palette-common-white)',
        '--NavItem-hover-background': undefined,
        '--NavItem-hover-color': 'var(--joy-palette-common-white)',
        '--NavItem-disabled-background': 'var(--joy-palette-neutral-800)',
        '--NavItem-disabled-color': 'var(--joy-palette-neutral-400)',
        '--NavItem-icon-color': 'var(--joy-palette-neutral-400)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: {
          xs: 'none',
          lg: 'block',
        },
        height: '100%',
        left: 0,
        position: 'fixed',
        p: 'var(--Layout-gap)',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
      }}
    >
      <Box
        sx={{
          height: '100%',
          pb: '100px', // footer height
          position: 'relative',
          pt: '185px', // header height
        }}
      >
        {/* <button onClick={() => changeLanguage('es')}>es</button>
        <button onClick={() => changeLanguage('en')}>en</button> */}
        {/* <h1 className="text-white">{t('dashboard')}</h1> */}
        <Stack spacing={3} sx={{ left: 0, position: 'absolute', py: '16px', top: 0, width: '100%', zIndex: 2 }}>
          <div>
            <Box component={RouterLink} href={paths['home']} sx={{ display: 'inline-block', fontSize: 0 }}>
              <Logo color="light" height={78} width={253} />
            </Box>
          </div>
        </Stack>
        <Box
          component="nav"
          sx={{
            height: '100%',
            overflowY: 'auto',
            pb: '20px', // footer shadow
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {renderNavGroups({ items, pathname })}
        </Box>
        <Box
          sx={{
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            left: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            '&:before': {
              background: 'linear-gradient(to top, rgb(14,15,17), rgba(14,15,17, 0))',
              content: '" "',
              height: '40px',
              left: 0,
              pointerEvents: 'none',
              position: 'absolute',
              top: '-40px',
              width: '100%',
            },
          }}
        >
          <NoSSR>
            <ColorSchemeSwitch />
          </NoSSR>
          {/* <CurrentUser /> */}
        </Box>
      </Box>
    </Box>
  );
}

function renderNavGroups({ items, pathname }) {
  const { t, i18n } = useTranslation();
  const children = items.reduce((acc, curr) => {
    acc.push(
      <ListItem
        key={curr.key}
        sx={{
          '--ListItem-paddingRight': 0,
          '--ListItem-paddingLeft': 0,
          '--ListItem-paddingY': 0,
        }}
      >
        <ListItemContent>
          {curr.title ? (
            <Box sx={{ py: '12px' }}>
              <Typography fontSize="xs" fontWeight="lg" textColor="neutral.500">
                {t(curr.title)}
              </Typography>
            </Box>
          ) : null}
          {renderNavItems({ depth: 0, pathname, items: curr.items })}
        </ListItemContent>
      </ListItem>
    );

    return acc;
  }, []);

  return <List sx={{ '--List-padding': 0 }}>{children}</List>;
}

function renderNavItems({ depth = 0, pathname, items = [] }) {
  const children = items.reduce((acc, curr) => {
    const { items: childItems, key, ...item } = curr;

    const forceOpen = childItems
      ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
      : false;

    acc.push(
      <NavItem depth={depth} forceOpen={forceOpen} key={key} pathname={pathname} {...item}>
        {childItems ? renderNavItems({ depth: depth + 1, pathname, items: childItems }) : null}
      </NavItem>
    );

    return acc;
  }, []);

  return (
    <List data-depth={depth} sx={{ '--List-gap': '9px', '--List-padding': 0 }}>
      {children}
    </List>
  );
}

function NavItem({ children, depth, disabled, external, forceOpen = false, href, icon, matcher, pathname, title }) {
  const [open, setOpen] = React.useState(forceOpen);
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? icons[icon] : null;
  const ExpandIcon = open ? CaretUpIcon : CaretDownIcon;
  const isBranch = children && !href;
  const isLeaf = !children && href;
  const showChildren = Boolean(children && open);
  const { t, i18n } = useTranslation();

  if (!(isBranch || isLeaf)) {
    throw new Error('Children or href required');
  }

  const currentUserRole = JSON.parse(localStorage.getItem('authUser'))?.role;
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  return (
    <>
    {console.log()}
      {(currentUserRole == 'admin' ||
        (title == 'User' && permissions['ADMIN Management']?.can_create_new_user) ||
        (title == 'Devices' && permissions['Tenant Management']?.can_view_devices) ||
        (title == 'Dashboard' && false) ||
        (title == 'Settings' && permissions['Tenant Management']?.can_change_own_detail) ||
        (title == 'Tenant' && permissions['ADMIN Management']?.can_create_tenants) ||
        (title == 'ADMIN' && (permissions['ADMIN Management']?.can_create_new_device || permissions['ADMIN Management']?.can_create_tenants || permissions['ADMIN Management']?.can_create_new_user))) && (
        <ListItem
          data-depth={depth}
          sx={{
            '--ListItem-paddingRight': 0,
            '--ListItem-paddingLeft': 0,
            '--ListItem-paddingY': 0,
            userSelect: 'none',
          }}
        >
          <ListItemContent>
            <Box
              {...(isBranch
                ? {
                    component: 'a',
                    onClick: () => {
                      setOpen(!open);
                    },
                  }
                : {
                    component: RouterLink,
                    href,
                    target: external ? '_blank' : '',
                    rel: external ? 'noreferrer' : '',
                  })}
              sx={{
                alignItems: 'center',
                borderRadius: 'var(--joy-radius-sm)',
                color: 'var(--NavItem-color)',
                cursor: 'pointer',
                display: 'flex',
                p: '12px',
                textDecoration: 'none',
                ...(disabled && {
                  bgcolor: 'var(--NavItem-disabled-background)',
                  color: 'var(--NavItem-disabled-color)',
                  cursor: 'not-allowed',
                }),
                ...(active && {
                  bgcolor: 'var(--NavItem-active-background)',
                  color: 'var(--NavItem-active-color)',
                }),
                ...(open && {
                  color: 'var(--NavItem-open-color)',
                }),
                '&:hover': {
                  ...(!active && {
                    bgcolor: 'var(--NavItem-hover-background)',
                    color: 'var(--NavItem-hover-color)',
                  }),
                },
              }}
            >
              {Icon ? (
                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', mr: 1 }}>
                  <Icon
                    fill={active ? 'var(--NavItem-active-icon-color)' : 'var(--NavItem-icon-color)'}
                    fontSize="var(--joy-fontSize-xl)"
                    weight={forceOpen || active ? 'fill' : 'bold'}
                  />
                </Box>
              ) : null}
              <Box sx={{ flexGrow: 1 }}>
                <Typography component="span" fontSize="sm" fontWeight="md" textColor="inherit">
                  {t(title)}
                </Typography>
              </Box>
              {isBranch ? <ExpandIcon style={{ fontSize: 'var(--joy-fontSize-sm)' }} weight="bold" /> : null}
            </Box>
            {showChildren ? (
              <Box sx={{ pl: '20px' }}>
                <Box sx={{ borderLeft: '1px solid var(--joy-palette-neutral-700)', pl: '12px' }}>{children} </Box>
              </Box>
            ) : null}
          </ListItemContent>
        </ListItem>
      )}
    </>
  );
}
