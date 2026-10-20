import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.class]="iconClass || 'w-5 h-5'" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true">
      
      <!-- Theme Moon -->
      <path *ngIf="name === 'moon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>

      <!-- Theme Sun -->
      <path *ngIf="name === 'sun'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>

      <!-- Menu / Hamburger -->
      <path *ngIf="name === 'menu'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16"/>

      <!-- Close / Cross -->
      <path *ngIf="name === 'close'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M6 18L18 6M6 6l12 12"/>

      <!-- Download -->
      <path *ngIf="name === 'download'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>

      <!-- External Link -->
      <path *ngIf="name === 'external-link'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>

      <!-- Email / Envelope -->
      <path *ngIf="name === 'email'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>

      <!-- Phone -->
      <path *ngIf="name === 'phone'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>

      <!-- Map Pin / Location -->
      <path *ngIf="name === 'map-pin'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>

      <!-- Briefcase -->
      <path *ngIf="name === 'briefcase'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>

      <!-- Graduation Cap / Education -->
      <path *ngIf="name === 'graduation-cap'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>

      <!-- Code -->
      <path *ngIf="name === 'code'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>

      <!-- Layers / Architecture -->
      <path *ngIf="name === 'layers'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>

      <!-- Shield / Security -->
      <path *ngIf="name === 'shield'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>

      <!-- Zap / Performance -->
      <path *ngIf="name === 'zap'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M13 10V3L4 14h7v7l9-11h-7z"/>

      <!-- Check -->
      <path *ngIf="name === 'check'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M5 13l4 4L19 7"/>

      <!-- Chevron Down -->
      <path *ngIf="name === 'chevron-down'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M19 9l-7 7-7-7"/>

      <!-- Arrow Right -->
      <path *ngIf="name === 'arrow-right'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M14 5l7 7m0 0l-7 7m7-7H3"/>

      <!-- GitHub (Filled) -->
      <path *ngIf="name === 'github'" fill="currentColor" stroke="none" 
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>

      <!-- LinkedIn (Filled) -->
      <path *ngIf="name === 'linkedin'" fill="currentColor" stroke="none" 
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  `
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() iconClass = 'w-5 h-5';
}
