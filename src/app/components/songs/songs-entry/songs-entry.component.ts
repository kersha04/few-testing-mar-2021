import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-songs-entry',
  templateUrl: './songs-entry.component.html',
  styleUrls: ['./songs-entry.component.scss']
})
export class SongsEntryComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {

  }

}
