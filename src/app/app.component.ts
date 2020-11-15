import { Component } from '@angular/core';
import { FavoriteChangedEventArgs } from './favorite/favorite.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  post = {
    title: 'hello-world',
    isFavorite: false
  }

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs){
    console.log('Favorite is clicked: ', eventArgs)
  }

  courses3 = ['course1', 'course2', 'course3'];
  courses4;
  viewMode = 'map';

  //For ngFor part
  // onAdd() {
  //   this.courses3.push('course4');
  // }

  // onRemove(course) {
  //   let index = this.courses3.indexOf(course);
  //   this.courses3.splice(index, 1);
  // }

  loadCourses() {
    this.courses4 = [
      { id: 1, name: 'course1' },
      { id: 2, name: 'course2' },
      { id: 3, name: 'course3' }
    ];
  }

  trackCourse(index, course) {
    return course ? course.id : undefined; 
  }

  canSave = true;
  task = {
    title: 'Review Applications',
    assignee: null
  }

}