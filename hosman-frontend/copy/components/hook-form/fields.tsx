// import { RHFCode } from './rhf-code';
import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFCheckbox, RHFMultiCheckbox } from './rhf-checkbox';
import { RHFCode } from './rhf-code';
import { RHFCountrySelect } from './rhf-country-select';
import { RHFDatePicker, RHFMobileDateTimePicker } from './rhf-date-picker';
import { RHFEditor } from './rhf-editor';
import { RHFPhoneInput } from './rhf-phone-input';
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFRating } from './rhf-rating';
import { RHFMultiSelect, RHFSelect } from './rhf-select';
import { RHFSellerType } from './rhf-seller-type';
import { RHFSlider } from './rhf-slider';
import { RHFMultiSwitch, RHFSwitch } from './rhf-switch';
import { RHFTextField } from './rhf-text-field';
import { RHFUpload, RHFUploadAvatar } from './rhf-upload';

// ----------------------------------------------------------------------

export const Field = {
  Code: RHFCode,
  Editor: RHFEditor,
  Select: RHFSelect,
  Upload: RHFUpload,
  Switch: RHFSwitch,
  Slider: RHFSlider,
  Rating: RHFRating,
  Text: RHFTextField,
  Phone: RHFPhoneInput,
  Checkbox: RHFCheckbox,
  // UploadBox: RHFUploadBox,
  RadioGroup: RHFRadioGroup,
  DatePicker: RHFDatePicker,
  MultiSelect: RHFMultiSelect,
  MultiSwitch: RHFMultiSwitch,
  UploadAvatar: RHFUploadAvatar,
  Autocomplete: RHFAutocomplete,
  MultiCheckbox: RHFMultiCheckbox,
  CountrySelect: RHFCountrySelect,
  MobileDateTimePicker: RHFMobileDateTimePicker,
  SellerTypePicker: RHFSellerType,
};
