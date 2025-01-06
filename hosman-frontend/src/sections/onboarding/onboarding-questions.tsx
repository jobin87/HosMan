import { Box, Button, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setOnboardingSteps } from 'src/store/app/appReducer';
import {
  requestSellerOnboardingStatus,
  requestSellerOnboardingUpdateQuestion,
} from 'src/store/sellers/sellersThunk';
import { AnsweredQuestion, QuestionTypes } from './type';

//----------------------------------------------------------------

export function OnboardingQuestions() {
  const { sellerDetails } = useUser();

  const dispatch = useAppDispatch();

  const { steps } = useAppSelector((state) => state.app.onboarding);

  const sellerStatus = useAppSelector((state) => state.sellers.sellerStatus) as {
    questions: QuestionTypes[];
    currentQuestions: AnsweredQuestion[];
    questionStatus: QuestionTypes[];
  };

  const [questionsAnswered, setQuestionsAnswered] = useState(sellerStatus?.currentQuestions || []);

  const handleOptionSelection = (option: string, key: string, label: string) => {
    setQuestionsAnswered((prevQuestions) => {
      const questionIndex = prevQuestions.findIndex((q) => q.key === key);

      if (questionIndex === -1) {
        return [...prevQuestions, { key, label, answer: option }];
      }
      return prevQuestions.map((q, index) =>
        index === questionIndex && q.answer !== option ? { ...q, answer: option } : q
      );
    });
  };

  const handleAnswerInput = (key: string, answer: string, label: string) => {
    setQuestionsAnswered((prevQuestions) => {
      const questionIndex = prevQuestions.findIndex((q) => q.key === key);

      if (questionIndex === -1) {
        return [...prevQuestions, { key, label, answer }];
      }
      return prevQuestions.map((q, index) =>
        index === questionIndex && q.answer !== answer ? { key, label, answer } : q
      );
    });
  };

  const extractAnswer = (key: string) => {
    const answer = questionsAnswered.find((q) => q.key === key)?.answer;
    return answer || '';
  };

  // const check
  const renderOptions = (question: QuestionTypes) => (
    <Box display={'flex'} gap={2} flexWrap={'wrap'}>
      {question?.options?.map((choice: string, index: number) => (
        <Box
          key={index}
          minWidth={200}
          height={50}
          border={1}
          borderRadius={1}
          display={'flex'}
          flex={1}
          gap={3}
          p={2}
          borderColor={'gray'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleOptionSelection(choice, question.key, question.label)}
        >
          <input
            type="radio"
            style={{ width: 20, height: 20 }}
            checked={checkOptionSelected(choice, question.key)}
            onChange={() => ''}
          />
          <Typography>{choice}</Typography>
        </Box>
      ))}
    </Box>
  );

  const renderDropDown = (question: QuestionTypes) => (
    <Select
      fullWidth
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      placeholder="Select"
      value={extractAnswer(question.key)}
      onChange={(e) => handleOptionSelection(e.target.value, question.key, question.label)}
    >
      <MenuItem disabled={true}>
        <p>Select</p>
      </MenuItem>
      {question?.options?.map((choice: string, index: number) => (
        <MenuItem key={index} value={choice}>
          {choice}
        </MenuItem>
      ))}
    </Select>
  );

  const renderDOB = (question: QuestionTypes) => (
    <DateField
      fullWidth
      defaultValue={dayjs('2022-04-17')}
      value={dayjs(extractAnswer(question.key))}
      required={question.required}
      slotProps={{
        textField: {
          error: false,
        },
      }}
      onChange={(newValue) =>
        handleOptionSelection(dayjs(newValue).format('MM/DD/YYYY'), question.key, question.label)
      }
    />
  );

  const renderTextInput = (question: QuestionTypes) => (
    <TextField
      fullWidth
      placeholder="Answer..."
      type={question.inputType}
      value={extractAnswer(question.key)}
      onChange={(e) => handleAnswerInput(question.key, e.target.value, question.label)}
    />
  );

  const checkOptionSelected = (option: string, key: string) =>
    questionsAnswered?.some((question) => question.key === key && question.answer === option);

  useEffect(() => {
    const checkIfEnableButton = () => {
      let pendingQuestions = new Set();
      sellerStatus?.questions?.forEach((question) => {
        if (question.required) pendingQuestions.add(question.key);
      });
      questionsAnswered?.forEach((answer) => {
        if (answer.answer === '') return;
        if (pendingQuestions.has(answer.key)) pendingQuestions.delete(answer.key);
      });
      if (pendingQuestions.size === 0) {
        dispatch(setOnboardingSteps({ step: 0, enabled: true }));
      } else {
        dispatch(setOnboardingSteps({ step: 0, enabled: false }));
      }
    };
    checkIfEnableButton();
  }, [questionsAnswered]);

  const handleNext = async () => {
    try {
      const response = await dispatch(
        requestSellerOnboardingUpdateQuestion({
          sellerId: sellerDetails?.id,
          questions: questionsAnswered,
        })
      );
      if (response?.payload?.questionsUpdated) {
        dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 3, minHeight: 300 }}>
        <Typography variant="subtitle1">Quick Questions for Personalization</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#606060' }}>
          Help us get to know you better by answering a few questions. This information will
          personalize your seller experience and streamline the setup.
        </Typography>
        <Scrollbar>
          {sellerStatus?.questions?.map((question: QuestionTypes) => (
            <Box mb={4} key={question.key}>
              <Typography variant="subtitle1" mb={1}>
                {question.label} <span style={{ color: 'red' }}> {question.required && '*'}</span>
              </Typography>

              {question.inputType === 'select' &&
                question?.options?.length! > 4 &&
                renderDropDown(question)}

              {question.inputType === 'select' &&
                question?.options?.length! < 4 &&
                renderOptions(question)}

              {question.inputType === 'text' && renderTextInput(question)}

              {question.inputType === 'date' && renderDOB(question)}

              {question.inputType === 'number' && renderTextInput(question)}
            </Box>
          ))}
        </Scrollbar>
      </Paper>
      <Stack mt={2} direction="row" justifyContent={'flex-end'}>
        <Button variant="contained" disabled={!steps.enabled} onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}
