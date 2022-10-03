import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css'],
})
export class TopicFormComponent implements OnInit {
  topicForm!: FormGroup;

  title?: string = "";
  subTitle?: string = "";
  image?: string = "";
  description?: string = "";

  constructor() {}

  ngOnInit(): void {
    this.topicForm = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      subTitle: new FormControl(this.subTitle, [Validators.required]),
      image: new FormControl(this.image, [Validators.required]),
      description: new FormControl(this.description),
    });
  }

  onSubmit(): void {
    console.log(this.topicForm.valid);
    console.log(this.topicForm.value);
  }
}
