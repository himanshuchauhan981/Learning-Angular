import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { usernameValidators } from './username.validators';

@Component({
	selector: 'signup-form',
	templateUrl: './signup-form.component.html',
	styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
	form = new FormGroup({
		account: new FormGroup({
			username: new FormControl('',[
				Validators.required,
				Validators.minLength(3),
				usernameValidators.cannotContainSpace
			],usernameValidators.shouldBeUnique),
			password: new FormControl('',Validators.required)
		})
	})

	login(){
		this.form.setErrors({
				invalidLogin: true
			})
	}
	get username(){
		return this.form.get('account.username')
	}
}