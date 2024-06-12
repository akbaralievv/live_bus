import { MouseEventHandler, ReactElement } from 'react';
import {
  AppBar,
  Badge,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { drawerWidth } from 'layouts/main-layout';

import { useLocation } from 'react-router-dom';
import capitalizePathname from 'helpers/capitalize-pathname';
import AccountDropdown from './AccountDropdown';
import LanguageDropdown from './LanguageDropdown';
import Image from 'components/base/Image';
import logo from 'assets/logo/elegent-favicon-logo.png';

interface TopbarProps {
  handleDrawerToggle: MouseEventHandler;
}

const Topbar = ({ handleDrawerToggle }: TopbarProps): ReactElement => {
  const { pathname } = useLocation();
  const title = capitalizePathname(pathname);

  return (
    <AppBar
      sx={{
        width: { lg: `calc(100% - ${drawerWidth}px + 24px)` },
        ml: { lg: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          p: 3.75,
        }}
      >
        <Stack direction="row" gap={1}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              width: 40,
              height: 40,
              m: 0,
              p: 0.75,
              display: { lg: 'none' },
              bgcolor: 'inherit',
            }}
          >
            <IconifyIcon icon="mdi:menu" />
          </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 1.75 }}>
          <AccountDropdown />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
