import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormatWidth } from '@angular/common';

@Component({
	selector: 'new-course-form',
	templateUrl: './new-course-form.component.html',
	styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent {
	form = new FormGroup({
		topics: new FormArray([])
	})
	addTopic(topic:HTMLInputElement){
		
	}
}