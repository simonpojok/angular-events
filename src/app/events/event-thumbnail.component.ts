import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from './shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'events-thumbnail',
  styles: [
    `
      .pad-left {
        margin-left: 10px;
      }

      .well div {
        color: #bbb;
      }

      .thumbnail {
        min-height: 210px;
      }

      .green {
        color: #003300 !important;
      }

      .bold {
        font-weight: bold;
      }
    `,
  ],
  template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{ event?.name }}</h2>
      <div>Date: {{ event?.date }}</div>
      <div [ngSwitch]="event?.time" [ngClass]="getTimeClasses()">
        Time: {{ event?.time }}
        <span *ngSwitchCase="'8:00 am'">( Early Start )</span>
        <span *ngSwitchCase="'10:00 am'">( Late Start )</span>
        <span *ngSwitchDefault>( Normal Start )</span>
      </div>
      <div>Price: \${{ event?.price }}</div>
      <div *ngIf="event?.location">
        <span>Location: {{ event?.location?.address }}</span>
        <span class="pad-left"></span>
        <span>{{ event?.location?.city }}, {{ event?.location?.country }}</span>
      </div>
      <div *ngIf="event?.onlineUrl">Online URL: {{ event?.onlineUrl }}</div>
    </div>
  `,
})
export class EventThumbnailComponent {
  @Input() event: IEvent;
  @Output() eventClick = new EventEmitter();

  getTimeClasses(): any {
    const isEarlyStart = this.event?.time === '8:00 am';
    return {
      green: isEarlyStart,
      bold: isEarlyStart,
    };
  }
}
