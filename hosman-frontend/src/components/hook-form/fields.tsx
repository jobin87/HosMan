// import { RHFCode } from './rhf-code';
import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFCheckbox, RHFMultiCheckbox } from './rhf-checkbox';
import { RHFCode } from './rhf-code';
import { RHFDatePicker, RHFMobileDateTimePicker } from './rhf-date-picker';
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFRating } from './rhf-rating';
import { RHFMultiSelect, RHFSelect } from './rhf-select';
import { RHFSlider } from './rhf-slider';
import { RHFMultiSwitch, RHFSwitch } from './rhf-switch';
import { RHFTextField } from './rhf-text-field';

// ----------------------------------------------------------------------

export const Field = {
  Code: RHFCode,
  Select: RHFSelect,
  Switch: RHFSwitch,
  Slider: RHFSlider,
  Rating: RHFRating,
  Text: RHFTextField,
  Checkbox: RHFCheckbox,
  // UploadBox: RHFUploadBox,
  RadioGroup: RHFRadioGroup,
  DatePicker: RHFDatePicker,
  MultiSelect: RHFMultiSelect,
  MultiSwitch: RHFMultiSwitch,
  Autocomplete: RHFAutocomplete,
  MultiCheckbox: RHFMultiCheckbox,
  MobileDateTimePicker: RHFMobileDateTimePicker,
};
