import { uploadFileFolders } from 'src/constants/files.constant';
import { API_METHODS, makeNetworkCall } from 'src/network';
import { replaceValues } from './replacer';

export enum FileTypes {
  PDF = 'application/pdf',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS = 'application/vnd.ms-excel',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPT = 'application/vnd.ms-powerpoint',
  PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  TXT = 'text/plain',
  CSV = 'text/csv',
  JPG = 'image/jpeg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  BMP = 'image/bmp',
  SVG = 'image/svg+xml',
  MP3 = 'audio/mpeg',
  WAV = 'audio/wav',
  MP4 = 'video/mp4',
  MKV = 'video/x-matroska',
  ZIP = 'application/zip',
  RAR = 'application/x-rar-compressed',
  SEVEN_Z = 'application/x-7z-compressed',
  JSON = 'application/json',
  XML = 'application/xml',
}

interface fileUploadType {
  filePath?: string | uploadFileFolders;
  fileName: string;
  fileType: string | FileTypes | any;
  file: any;
}

// Function to handle file uploads
export async function uploadFile(props: fileUploadType): Promise<string | boolean> {
  const { filePath, fileType, fileName, file } = props;

  try {
    const params: Partial<fileUploadType> = {};

    if (filePath) {
      params.filePath = replaceValues(filePath) as uploadFileFolders;
    }

    const urlParamsForUpload = new URLSearchParams({
      filePath: params.filePath ? params.filePath + fileName : fileName,
      fileType: fileType,
    });

    const urlForUpload = `${urlParamsForUpload.toString()}`;

    const requestUploadUrl = await makeNetworkCall({
      method: API_METHODS.GET,
      url: urlForUpload,
    });

    const { uploadUrl, downloadUrl } = requestUploadUrl?.data;

    if (uploadUrl) {
      const uploadFile = await makeNetworkCall({
        method: API_METHODS.PUT,
        url: uploadUrl,
        data: file,
        extraHeadersOnly: true,
        extraHeaders: {
          'Content-Type': fileType,
        },
      });

      if (uploadFile?.status === 200) {
        return downloadUrl;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return false;
  }
}

export function readFileAsBinary(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: file.type });
        resolve(blob);
      } else {
        reject(new Error('Error reading file as binary.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };
    reader.readAsArrayBuffer(file);
  });
}
