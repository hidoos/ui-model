import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CanBeNew } from '@ui-model/common';
import { FormMetadata, metaField, metaForm } from '../decorators/metas';
const Reflect = window['Reflect'];

@Injectable()
export class FormMaker<T> {

  constructor() {
  }

  createFromModel(model: CanBeNew<T>): FormGroup {
    return this._createFromModel(model) as FormGroup;
  }

  private _createFromModel(model: CanBeNew<T>): AbstractControl {
    if (!Reflect.hasMetadata(metaForm, model)) {
      throw Error('The `model` parameter must be a class with the `@FormModel()` decorator!');
    }

    const meta = Reflect.getMetadata(metaForm, model) as FormMetadata;

    const controls: { [name: string]: AbstractControl } = {};

    meta.fields.forEach((field) => {
      let control;
      if (field.isSubModel) {
        control = this._createFromModel(field.type);
      } else if (field.isArray) {
        control = new FormArray([]);
      } else {
        control = new FormControl();
      }

      control[metaField] = field;

      control.setValidators(field.validators);
      control.setAsyncValidators(field.asyncValidators);
      controls[field.name] = control;
    });

    return new FormGroup(controls);
  }

  setValue(control: AbstractControl, value: T): void {
    this._setValue(control, value);
  }

  private _setValue(control: AbstractControl, value: any): void {
    if (control instanceof FormControl) {
      control.setValue(value);
    } else if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((name) => {
        const c = control.controls[name];
        const v = value && value[name];
        this._setValue(c, v);
      });
    } else if (control instanceof FormArray) {
      // clear
      for (let i = control.length - 1; i >= 0; --i) {
        control.removeAt(i);
      }
      (value || []).forEach((item) => {
        control.push(new FormControl(item));
      });
    }
  }
}