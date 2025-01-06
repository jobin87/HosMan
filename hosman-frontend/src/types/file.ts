import type { IDatePickerControl, IDateValue } from './common';

// ----------------------------------------------------------------------

export type IFileFilters = {
  docName: string;
  docType: string[];
  startDate: IDatePickerControl;
  endDate: IDatePickerControl;
};

export type IFileShared = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  permission: string;
};

export type IFolderManager = {
  id: string;
  docName: string;
  docSize: number;
  docType: string;
  docUrl: string;
  tags: string[];
  totalFiles?: number;
  isFavorited: boolean;
  shared: IFileShared[] | null;
  createdAt: IDateValue;
  modifiedAt: IDateValue;
};

export type IFileManager = {
  id?: string;
  docName?: string;
  docSize?: number | string;
  docType?: string;
  docUrl?: string;
  tags?: string[];
  // shared: IFileShared[] | null;
  createdAt?: IDateValue;
  modifiedAt?: IDateValue;
  documentName?: string;
  key?: string;
  status?: string;
  lock?: boolean;
};

export type IFile = IFileManager | IFolderManager;
