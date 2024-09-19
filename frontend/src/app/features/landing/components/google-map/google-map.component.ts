import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <iframe
      class="border-round border-1 border-blue-400 h-10rem w-full"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      [src]="safeUrl">
    </iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapComponent implements OnInit {
  private readonly domSanitizer = inject(DomSanitizer);
  public readonly lat = input.required<string>();
  public readonly lon = input.required<string>();
  public safeUrl!: SafeResourceUrl;

  ngOnInit(): void {
    this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${this.lat()},${this.lon()}&hl=es&z=15&output=embed`
    );
  }
}
