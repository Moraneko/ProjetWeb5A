import {
  OnInit,
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';

@Component({
  selector: 'app-usercalendar',
  templateUrl: './usercalendar.component.html',
  styleUrls: ['./usercalendar.component.css'],
  encapsulation: ViewEncapsulation.None,
    styles: [
      `
        .cal-week-view .cal-time-events .cal-day-column {
          margin-right: 10px;
        }

        .cal-week-view .cal-hour {
          width: calc(100% + 10px);
        }
      `,
    ],
})
export class UsercalendarComponent implements OnInit {

  constructor() { }
  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event',
      color: {
                 primary: '#e3bc08',
                 secondary: '#FDF1BA',
               },
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Another event',
      color: {
                 primary: '#1e90ff',
                 secondary: '#D1E8FF',
               },
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 2), 2),
      end: addDays(new Date(), 2),
      title: 'And another',
      color: {
                 primary: '#ad2121',
                 secondary: '#FAE3E3',
               },
    },
  ];

  ngOnInit(): void {
  }

}
