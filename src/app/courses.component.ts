import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    template: `
        <h4>{{ title }}</h4>
        <ul>
            <li *ngFor="let course of courses">
                {{ course }}
            </li>
        </ul>

        <img [src]="imageUrl" />
        <table>
            <tr>
                <td [attr.colspan]="colSpan"></td>
            </tr>
        </table>
        <input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />

        <h4>Pipes portion</h4> <br/>
        {{ courses2.title | uppercase | lowercase }} <br/>
        {{ courses2.students | number }} <br/>
        {{ courses2.rating | number: '1.1-2' }} <br/>
        {{ courses2.price | currency: 'INR' }} <br/>
        {{ courses2.releaseDate | date: 'longDate' }} <br/>

        {{ text | summary: 20 }}
    `
})
export class CoursesComponent{
    title = "List of courses";
    imageUrl = "http://lorempixel.com/100/100";
    colSpan = 2;

    courses;

    //Services
    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }

    //2-way binding
    email = "abc@abc.com";
    onKeyUp(){
        console.log(this.email);
    }

    //pipes portion
    courses2 = {
        title: "The Angular Course",
        rating: 4.975,
        students: 1230123,
        price: 190.95,
        releaseDate: new Date(2020, 1, 1)
    }

    //custom pipe
    text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
}