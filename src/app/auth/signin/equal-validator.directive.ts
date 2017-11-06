import {AbstractControl} from '@angular/forms';
export class EqualValidator {

    static MatchEmail(AC: AbstractControl) {
       let password = AC.get('password').value;
       let email = AC.get('email').value; // to get value in input tag
       let confirmEmail = AC.get('signUpEmailConfirm').value; // to get value in input tag
        if(email != confirmEmail) {
            AC.get('signUpEmailConfirm').setErrors( {MatchEmail: true} )
        } else {
            return null
        }
    }
}