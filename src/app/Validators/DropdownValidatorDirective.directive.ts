import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[nonZeroValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: DropdownValidatorDirective,
  multi: true}]
})
export class DropdownValidatorDirective implements Validator {
  
  @Input("nonZeroValue") zeroNotAllowed: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    /*var notAllowed = false;
    if(control.value === "0") {
      notAllowed = true;
    } 
    
   
    if(notAllowed) {
      return {'nonZeroValue':true};
    } else {
      return null;
    }*/
    //console.log("zeroNotAllowed: ", this.zeroNotAllowed);
    //console.log("control.value: ", control.value);
    //var compare = "" + control.value;
    //console.log("regex: ", new RegExp(this.zeroNotAllowed).test(control.value));
    //console.log("regex1", /^([1-9][0-9]+|[1-9])$/.test(control.value));
    //const notAllowed = new RegExp(this.zeroNotAllowed).test(control.value);
    //const notAllowed = /^[1-9][0-9]*$/.test(control.value);
    //const notAllowed = /^(?!0)\d+$/.test(control.value);
    
    //const notAllowed = /^([1-9][0-9]+|[1-9])$/.test(control.value);
    //if value is not null and greater than zero then return else null


    /*if(control.value == null) {
      console.log("if", control.value);
      return {'nonZeroValue': false}
    } else if(/^([1-9][0-9]+|[1-9])$/.test(control.value)) {
      console.log("else if", control.value);
      return {'nonZeroValue': false}
    } else {
      console.log("else", control.value);
      return {'nonZeroValue': true}
    }*/

    const notAllowed = /^0$/.test(control.value);
    //console.log("notAllowed", notAllowed);
    return notAllowed ? {'nonZeroValue':true} : null;
  }

}