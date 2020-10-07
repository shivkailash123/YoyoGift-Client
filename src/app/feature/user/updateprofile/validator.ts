import { AbstractControl } from '@angular/forms';

export function passwordDoNotMatch(control: AbstractControl) {
  if ((control && control.value !== null) || control.value !== undefined) {
    const confpass = control.value;
    const passControl = control.root.get('password');
    if (passControl) {
      const passValue = passControl.value;
      if (passValue !== confpass) {
        return {
          isError: true,
        };
      }
    }
  }
  return null;
}
