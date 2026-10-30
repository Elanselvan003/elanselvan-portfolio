import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { IconComponent } from '../../icon.component';
import { DEVELOPER_PROFILE } from '../../portfolio.data';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <main class="min-h-[75vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-xl mx-auto space-y-6">
        <!-- Error Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wide font-mono">
          <span>HTTP 404 &bull; PAGE NOT FOUND</span>
        </div>

        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          404 - Page Not Found
        </h1>

        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          The page you requested does not exist or may have been moved. Return to the homepage to explore the portfolio, SaaS projects, and technical skills of <strong>Elanselvan S</strong>, Angular Front-End Developer in Bengaluru.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a routerLink="/" class="btn-primary" aria-label="Return to Elanselvan S Portfolio Homepage">
            <app-icon name="arrow-right" iconClass="w-4 h-4 rotate-180"></app-icon>
            <span>Back to Portfolio Homepage</span>
          </a>

          <a [href]="profile.resumeUrl" 
             download="Elanselvan_Resume.pdf" 
             class="btn-secondary" 
             aria-label="Download Elanselvan S Resume PDF">
            <app-icon name="download" iconClass="w-4 h-4"></app-icon>
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>
    </main>
  `
})
export class NotFoundComponent implements OnInit {
  profile = DEVELOPER_PROFILE;
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.titleService.setTitle('Page Not Found | Elanselvan S');
    this.metaService.updateTag({
      name: 'description',
      content: 'The requested page could not be found. Explore the Angular front-end developer portfolio and SaaS projects of Elanselvan S based in Bengaluru, India.'
    });
    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, follow'
    });
  }
}

