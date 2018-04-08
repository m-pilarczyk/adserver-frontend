import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

import { TimespanFilter } from 'models/chart/chart-filter-settings.model';

@Component({
  selector: 'app-chart-filter',
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.scss'],
})
export class ChartFilterComponent {
  @Output() filter: EventEmitter<TimespanFilter> = new EventEmitter();
  dateFrom = new FormControl('');
  dateTo = new FormControl('');
  minDate = new Date();

  filterChart(from, to) {
    if (this.dateTo.value > this.dateFrom.value) {
      const timespan = {
        from: isNaN(from) ? from.value._d : moment().subtract(from, 'days').format(),
        to: isNaN(to) ? to.value._d : moment().format()
      };

      this.filter.emit(timespan);
    }
  }
}
