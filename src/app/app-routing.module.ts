import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'topic/:id', component: TopicComponent },
  { path: 'add-topic', component: TopicFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
