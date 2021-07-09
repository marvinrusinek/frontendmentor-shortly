import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  // code from https://stackoverflow.com/questions/51716712/the-pipe-truncate-could-not-be-found?r=SearchResults

  transform(value: string, args: string[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 40) : 40;
    const trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
