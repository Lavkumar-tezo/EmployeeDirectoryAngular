import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { GeneralModel } from '../../../core/models/generalModel';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [NgStyle,NgFor,CommonModule],
  templateUrl: './select-filter.component.html',
  styleUrl: './select-filter.component.css'
})
export class SelectFilterComponent {
  @Input() name: string="";
  @Input() values: GeneralModel[]=[];
  @Input() isAllValuesDefault:boolean=true;
  count: number = 0;
  selectedValues: Set<string> = new Set();
  isDropdownVisible: boolean = false;
  @Output() valuesEvent:EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() filterChangedEvent:EventEmitter<string>= new EventEmitter<string>();
  constructor(private el: ElementRef) {}


  ngOnChanges(){
    if(this.isAllValuesDefault){
      this.selectedValues.clear();
      this.count = 0;
      this.isDropdownVisible = false;
      const checkboxes = this.el.nativeElement.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = false;
        });
    }
  }
  showDropdown() {
    this.isDropdownVisible = true;
  }
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  onCheckboxChange(event: Event) {
    this.isAllValuesDefault=true;
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedValues.add(input.value);
    } else {
      this.selectedValues.delete(input.value);
    }
    this.count = this.selectedValues.size;
    this.valuesEvent.emit(Array.from(this.selectedValues));
    this.filterChangedEvent.emit(this.name);
  }

  getSelectedValues(): string[] {
    return Array.from(this.selectedValues);
  }
}
