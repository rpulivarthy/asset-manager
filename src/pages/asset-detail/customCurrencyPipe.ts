import { Inject, LOCALE_ID, Pipe, PipeTransform, Type } from '@angular/core';
import { NumberFormatStyle, NumberFormatter } from './intl';
import { CurrencyPipe } from '@angular/common';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe extends CurrencyPipe implements PipeTransform {
    transform(value: any): string {
        if (value == "N/A") return value;
        if (!value) return value;
        let retNumber = Number(value);
        let transferredValue = super.transform(retNumber, 'USD', true, '1.2-2').toString();
        if (transferredValue.charAt(0) == '-') return transferredValue.substr(2);
        return transferredValue.substr(1);
    }
}