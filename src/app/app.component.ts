import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html', // 👈 Using external HTML
})
export class AppComponent {
  logMessages(): void {
    console.log('🔵 This is a log message.');
    console.info('🟢 This is an info message.');
    console.warn('🟠 This is a warning message.');
    console.error('🔴 This is an error message.');
    console.debug('⚪ This is a debug message.');
    console.trace('🧭 This is a trace message.');
  }
}
