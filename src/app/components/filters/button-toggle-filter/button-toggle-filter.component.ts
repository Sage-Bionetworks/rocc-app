import { Component, forwardRef } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { FilterComponent } from '../filter.component';

@Component({
    selector: 'button-toggle-filter',
    templateUrl: './button-toggle-filter.html',
    styleUrls: ['./button-toggle-filter.scss'],
    providers: [{ provide: FilterComponent, useExisting: forwardRef(() => ButtonToggleFilterComponent) }],
})
export class ButtonToggleFilterComponent extends FilterComponent {
    static parameters = [];
    constructor() {
        super();
    }

    ngOnInit() {
        this.changeFilter.next(this.getSelection());
    }

    select(event: MatButtonToggleChange): void {
        this.changeFilter.next({
            group: this.group,
            value: event.value,
        });
    }

    getSelection(): any {
        return {
            group: this.group,
            value:
                Array.isArray(this.filters) && this.filters.length > 0
                    ? this.filters.find(f => f.active).value
                    : undefined,
        };
    }
}
