import 'src/global.css';

// ----------------------------------------------------------------------

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { persistor, store } from 'src/store';

import { MotionLazy } from 'src/components/animate/motion-lazy';
import { ProgressBar } from 'src/components/progress-bar';
import { defaultSettings, SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from './locales';
import { ThemeProvider } from './theme/theme-provider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <LocalizationProvider>
      <Toaster />
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsProvider settings={defaultSettings}>
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                <Router />
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </PersistGate>
      </ReduxProvider>
    </LocalizationProvider>
  );
}
