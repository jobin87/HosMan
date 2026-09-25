import 'src/global.css';

// ----------------------------------------------------------------------

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { persistor, store } from 'src/store';
import { ThemeProvider } from 'src/theme/theme-provider';

import { MotionLazy } from 'src/components/animate/motion-lazy';

import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <>
      <Toaster />
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <MotionLazy>
              <Router />
            </MotionLazy>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}
