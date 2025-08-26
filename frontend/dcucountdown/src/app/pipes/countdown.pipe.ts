import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
  name: 'countdown', 
  pure: false,
  standalone: true
})
export class CountdownPipe implements PipeTransform {
  transform(targetUtc?: string): string {
    if (!targetUtc) return 'Sem data';

    const target = new Date(targetUtc).getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    
    return `${days} days`;
  }
}
