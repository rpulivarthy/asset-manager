import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'restrictDecimalSize' })
export class DecimalRestrictSize implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return value;
       
        if (value.indexOf('.') >= 0) {
            var indexOfDot = value.indexOf('.');
            return value.substring(0, indexOfDot + 3)
        }
        else {
            if (value != "N/A") {
                return value + ".00";
            }
            else {
                return value;
            }
        }

    }

}
