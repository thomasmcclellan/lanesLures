import {AbstractControl} from '@angular/forms';
export class EqualValidator {

    static MatchEmail(AC: AbstractControl) {
       let password = AC.get('password').value;
       let email = AC.get('email').value; // to get value in input tag
       let confirmEmail = AC.get('signUpEmailConfirm').value; // to get value in input tag
        if(email != confirmEmail) {
            console.log('false');
            AC.get('signUpEmailConfirm').setErrors( {MatchEmail: true} )
        } else {
            console.log('true');
            return null
        }
    }
}