import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [InputGroupAddonModule, InputGroupModule, InputTextModule],
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<void> = new Subject();
  private debouncerSubscription?: Subscription;

  @Input() placeholder = 'Buscar...';
  @Input() initialValue = '';
  @Output() onValue: EventEmitter<string> = new EventEmitter();

  @ViewChild('txt_search')
  txt_search!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(500),
      )
      .subscribe(() => {
        this.emitValue();
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(): void {
    this.onValue.emit(this.txt_search.nativeElement.value);
  }

  onKeyPress(): void {
    this.debouncer.next();
  }

}
