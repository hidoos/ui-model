import { Directive, Input, OnInit } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Directive({
  selector: '[uiDynamicComponentInputs]',
  exportAs: 'uiDynamicComponentInputs',
})
export class DynamicComponentInputsDirective implements OnInit {
  constructor(private outlet: NgComponentOutlet) {
  }

  private _inputs: { [name: string]: any }[];

  get inputs(): { [name: string]: any }[] {
    return this._inputs;
  }

  @Input('uiDynamicComponentInputs')
  set inputs(value: { [name: string]: any }[]) {
    this._inputs = value;
    this.updateInputs();
  }

  component: { [name: string]: any };

  ngOnInit(): void {
    // WARNING: access private properties `_componentRef._component` of ngComponentOutlet
    this.component = this.outlet['_componentRef']['_component'];
    this.updateInputs();
  }

  updateInputs(): void {
    if (this.component && this._inputs) {
      const inputs = Object.assign({}, ...this._inputs);
      for (const key in inputs) {
        if (inputs.hasOwnProperty(key)) {
          this.component[key] = inputs[key];
        }
      }
    }
  }
}
