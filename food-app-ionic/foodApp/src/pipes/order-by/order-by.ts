import { UtilsHelper } from './../../app/helpers/utils-helper';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: Array<any>, args: string) {
    let _result = []
    let _args = args.replace('-', '')

    if (args.indexOf('-') > -1){
      _result = (<Array<any>>UtilsHelper.data.sorting(value, _args)).reverse()
    }
    else{
      _result = <Array<any>>UtilsHelper.data.sorting(value, _args)
    }

    return _result
  }
}
