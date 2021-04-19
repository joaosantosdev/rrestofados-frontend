import {FormControl} from '@angular/forms';

export class ValidatorsHelper{
  static noEmptyString(control: FormControl){
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { required: true };
  }
}
