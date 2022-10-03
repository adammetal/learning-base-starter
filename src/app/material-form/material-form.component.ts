import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {
  materialForm!: FormGroup;

  label?: string = "";
  link?: string = "";
  description?: string = "";

  constructor() { }

  ngOnInit(): void {
    this.materialForm = new FormGroup({
      label: new FormControl(this.label, [Validators.required]),
      link: new FormControl(this.link, [Validators.required]),
      description: new FormControl(this.description)
    });
  }

  onSubmit(): void {
    console.log(this.materialForm.valid);
    console.log(this.materialForm.value);
  }

}
