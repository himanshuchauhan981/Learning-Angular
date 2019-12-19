import { AbstractControl, ValidationErrors } from '@angular/forms';

export class usernameValidators{
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return { cannotContainSpace:true }
        }
    }

    //Asynchronous Validators
    static shouldBeUnique(control: AbstractControl):Promise<ValidationErrors | null >{
        return new Promise((resolve,reject)=> {
            setTimeout(()=>{
                if(control.value === 'Banana'){
                    resolve( { shouldBeUnique: true})
                }
                else resolve(null)
            },2000)
        })
    }

}