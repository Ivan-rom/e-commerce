import * as commercetools from '@commercetools/platform-sdk';
type Money = commercetools.Money;

export default function formatPrice(money: Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(money.centAmount / 100);
}
