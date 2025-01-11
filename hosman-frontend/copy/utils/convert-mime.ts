const mimeToExt: { [key: string]: string } = {
  // Documents
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/docx': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/pptx': 'pptx',
  'text/plain': 'txt',
  'text/csv': 'csv',
  'application/rtf': 'rtf',

  // Images
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/x-icon': 'ico',
  'image/heic': 'heic',
  'image/heif': 'heif',
};

export function getExtensionFromMimeType(mimeType: string): string {
  return mimeToExt[mimeType] || 'unknown';
}
