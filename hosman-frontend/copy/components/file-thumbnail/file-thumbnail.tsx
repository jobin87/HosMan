import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { RemoveButton } from './action-buttons';
import { fileThumbnailClasses } from './classes';
import { fileData, fileFormat, fileThumb } from './utils';

import type { FileThumbnailProps } from './types';

// ----------------------------------------------------------------------

export function FileThumbnail({
  sx,
  file,
  tooltip,
  onRemove,
  imageView,
  slotProps,
  onDownload,
  className,
  ...other
}: FileThumbnailProps) {
  const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

  const { name, path } = fileData(file);

  const format = fileFormat(path || previewUrl);
  const renderImg = (
    <Box
      component="img"
      src={previewUrl}
      className={fileThumbnailClasses.img}
      sx={{
        width: 6,
        height: 6,
        objectFit: 'cover',
        borderRadius: 'inherit',
        ...slotProps?.img,
      }}
    />
  );

  const renderIcon = (
    <Box
      component="img"
      src={fileThumb(format)}
      className={fileThumbnailClasses.icon}
      sx={{ width: 50, height: 50, ...slotProps?.icon }}
    />
  );

  const renderContent = (
    <Box
      component="span"
      className={fileThumbnailClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width: 50,
        flexShrink: 0,
        borderRadius: 1.25,
        alignItems: 'center',
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      {format === 'image' && imageView ? renderImg : renderIcon}

      {onRemove && (
        <RemoveButton
          onClick={onRemove}
          className={fileThumbnailClasses.removeBtn}
          sx={slotProps?.removeBtn}
        />
      )}

      {/* {onDownload && (
        <DownloadButton
          onClick={onDownload}
          className={fileThumbnailClasses.downloadBtn}
          sx={slotProps?.downloadBtn}
        />
      )} */}
    </Box>
  );

  if (tooltip) {
    return (
      <Tooltip
        arrow
        title={name}
        open={true}
        slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -12] } }] } }}
      >
        {renderContent}
      </Tooltip>
    );
  }

  return renderContent;
}
