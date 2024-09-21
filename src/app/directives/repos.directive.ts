import { Directive, ElementRef, Input, OnChanges,  } from "@angular/core";


@Directive({
  selector: '[repoHighlight]',
  standalone: true
})

export class RepositoryHighlight implements OnChanges{
  @Input() repoHighlight!: number;
  constructor(private el: ElementRef) {}

  ngOnChanges(){
    if(this.repoHighlight > 2){
      this.el.nativeElement.style.color = 'red';
    }else{
      this.el.nativeElement.style.color = '';
    }
  }
}
