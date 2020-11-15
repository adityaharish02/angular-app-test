import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {
  @Input('format2') format2;

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur(){
    let value: string = this.el.nativeElement.value;
    if (this.format2 == 'uppercase')
      this.el.nativeElement.value = value.toUpperCase();
    else 
      this.el.nativeElement.value = value.toLowerCase();
  }

}
