// Loading is true by default. Use case: When needed to call an api on page load.
export const basicInitialState:  basicInitialStateProps  = {
  data: null,
  loading: false,
  error: {},
};
export const basicInitialArrayState:  basicInitialStateProps  = {
  data: [],
  loading: false,
  error: {},
};

export const roomState: basicInitialStateProps ={
  data: {
    message: '',
    rooms: [],
  },
  loading: false,
  error: {},
};


export const basicInitialStateWithRole:  basicInitialStatePropsWithRole  = {
  role:null,
  data: null,
  loading: false,
  error: {},
};

// Loading is false by default. Use case: When needed to call an api on button click.
export const networkCallInitialState: basicInitialStateProps = {
  data: null,
  loading: false,
  error: {},
};

export interface basicInitialStateProps {
  data: null | object | any;
  loading: boolean;
  error: null | object;
}

export interface basicInitialStatePropsWithRole {
  role:null| String;
  data: null | object | any;
  loading: boolean;
  error: null | object;
}

export interface paginationProps {
  page: number;
  limit: number;
  search?: number;
}

export const basicSellerStatusState: sellerStatusProps = {
  currentDocuments: null,
  currentQuestions: null,
  documentStatus: null,
  documents: null,
  isAddressUpdated: false,
  isBankDetailsUpdated: false,
  isDocumentsUpdated: false,
  isQuestionUpdated: false,
  isSellerApproved: false,
  isSellerDetailsUpdated: false,
  isStoreNameUpdated: false,
  questionStatus: null,
  questions: null,
  readyToSendForReview: false,
  suggestedStoreNames: null,
};

export interface sellerStatusProps {
  currentDocuments: null | [DocProps];
  currentQuestions: null | [object];
  documentStatus: null | [object];
  documents: null | [object];
  isAddressUpdated: boolean;
  isBankDetailsUpdated: boolean;
  isDocumentsUpdated: boolean;
  isQuestionUpdated: boolean;
  isSellerApproved: boolean;
  isSellerDetailsUpdated: boolean;
  isStoreNameUpdated: boolean;
  questionStatus: null | [object];
  questions: null | [object];
  readyToSendForReview: boolean;
  suggestedStoreNames: null | [object];
}

export interface DocProps {
  docName: string;
  status: string;
  docType: string;
  docSize: string;
  docUrl: string;
  lock: boolean;
  ownerId: string;
  updatedAt: string;
  createdAt: string;
  docId: string;
  id: string;
}
