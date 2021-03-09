import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss']
})
export class TodoEntryComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      item: ['', [Validators.required]]
    });
  }

  get item(): AbstractControl {
    return this.form.get('item');
  }
  submit(): void {
    if (this.form.valid) {
      console.log('The Form', this.form.value);
    } else {
      console.log('The form isn\'t valid!');
    }
  }
}
