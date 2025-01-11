import { useEffect } from 'react';
import toast, { Toaster as HotToaster, useToasterStore } from 'react-hot-toast';

import { useTheme } from '@mui/material/styles';

export const Toaster = () => {
  const theme = useTheme();

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <HotToaster
      position="top-center"
      maxCount={1}
      reverseOrder={false}
      toastOptions={{
        style: {
          backdropFilter: 'blur(6px)',
          // background: alpha(theme.palette.neutral[900], 0.8),
          // color: theme.palette.common.white,
          boxShadow: theme.shadows[16],
        },
        duration: 5000,
      }}
    />
  );
};
