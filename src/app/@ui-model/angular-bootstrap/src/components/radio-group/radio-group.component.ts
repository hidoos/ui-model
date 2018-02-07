import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectValueAccessor } from '@ui-model/angular';

const RADIO_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupComponent),
  multi: true,
};

@Component({
  selector: 'ui-radio-group',
  template: require('./radio-group.component.html'),
  styles: [require('./radio-group.component.scss')],
  inputs: ['disabled', 'valueField', 'labelField'],
  providers: [RADIO_GROUP_VALUE_ACCESSOR],
})
export class RadioGroupComponent<T> extends SelectValueAccessor<T> {
  randomId = `${new Date().getTime()}${Math.floor(Math.random() * 10000)}`;

  @Input() options: T[];
}
