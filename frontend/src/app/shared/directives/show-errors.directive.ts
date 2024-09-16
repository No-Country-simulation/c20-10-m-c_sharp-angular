import { DestroyRef, Directive, ElementRef, inject, input, OnInit, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appShowErrors]',
  standalone: true,
})
export class ShowErrorsDirective implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  public readonly control = input<AbstractControl | null>(null, { alias: 'appShowErrors' });

  ngOnInit(): void {
    if (this.control()) {
      this.control()!
        .statusChanges.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.setErrorMessages();
        });
      this.setErrorMessages();
    }
  }

  private setErrorMessages(): void {
    if (!this.control()) {
      return;
    }

    const element = this.elementRef.nativeElement;
    this.renderer.setProperty(element, 'innerHTML', '');

    if (this.control()!.errors && (this.control()!.dirty || this.control()!.touched)) {
      const errors = this.control()!.errors;

      if (errors!['required']) {
        this.addErrorMessage('El campo es obligatorio');
      }

      if (errors!['email']) {
        this.addErrorMessage('El correo electrónico es inválido');
      }
    }
  }

  private addErrorMessage(message: string): void {
    const errorElement = this.renderer.createElement('small');
    const text = this.renderer.createText(message);

    this.renderer.addClass(errorElement, 'font-medium');
    this.renderer.addClass(errorElement, 'text-red-500');
    this.renderer.addClass(errorElement, 'pl-2');
    this.renderer.appendChild(errorElement, text);
    this.renderer.appendChild(this.elementRef.nativeElement, errorElement);
  }
}
