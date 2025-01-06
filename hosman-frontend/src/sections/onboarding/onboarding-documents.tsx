import { LoadingButton } from '@mui/lab';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import { useUser } from 'src/hooks/use-user';
import { API_METHODS, ENDPOINT_DOCUMENT_DELETE, makeNetworkCall } from 'src/network';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setOnboardingSteps } from 'src/store/app/appReducer';
import { requestSellerOnboardingStatus } from 'src/store/sellers/sellersThunk';
import { FileAddItem } from './file-add-item';
import { FileListItem } from './file-list-item';
import { Document } from './type';

export function OnboardingDocuments() {
  const sellerStatus = useAppSelector((state) => state.sellers.sellerStatus) as {
    documentStatus: Document[];
    documents: Document[];
    currentDocuments: Document[];
  };

  const { sellerDetails } = useUser();

  const { steps } = useAppSelector((state) => state.app.onboarding);

  const dispatch = useAppDispatch();

  const [notUploadedDocuments, setNotUploadedDocuments] = useState<Document[] | undefined>([]);

  const filterUploadedDocuments = () => {
    let pendingDocs: string[] = [];
    sellerStatus.documentStatus?.forEach((doc) => {
      !doc.isThere && pendingDocs.push(doc?.docId!);
    });
    let filteredDocs = sellerStatus.documents?.filter((doc) => pendingDocs.includes(doc?.key!));
    if (filteredDocs?.length === 0) {
      dispatch(setOnboardingSteps({ step: 5, enabled: true }));
    } else {
      dispatch(setOnboardingSteps({ step: 5, enabled: false }));
    }
    return filteredDocs;
  };

  useEffect(() => {
    setNotUploadedDocuments(filterUploadedDocuments);
  }, [sellerStatus]);

  const handleDeleteDocument = async (fileId: string) => {
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: `${ENDPOINT_DOCUMENT_DELETE}${fileId}`,
      });

      if (response?.data?.data?.documentDeleted)
        dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    try {
      dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
      dispatch(setOnboardingSteps({ step: 6, enabled: true }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 3, minHeight: 400 }}>
        <Typography variant="subtitle1">Finalize and Send for Review</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#606060' }}>
          Upload necessary documents to complete verification. This ensures compliance and builds
          trust with buyers, helping your store grow.
        </Typography>
        <Scrollbar sx={{ gap: 2, overflowY: 'scroll', minHeight: 420 }}>
          {notUploadedDocuments?.map((file) => <FileAddItem key={file.key} file={file} />)}
          {sellerStatus?.currentDocuments?.map((file) => (
            <FileListItem key={file.id} file={file} onDelete={(id) => handleDeleteDocument(id)} />
          ))}
        </Scrollbar>
      </Paper>
      <Stack mt={2} direction="row" justifyContent={'flex-end'}>
        <LoadingButton
          variant="contained"
          type="submit"
          disabled={!steps.enabled}
          onClick={handleNext}
        >
          Next
        </LoadingButton>
      </Stack>
    </Box>
  );
}
