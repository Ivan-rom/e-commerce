export default function formatPrice(money: { currencyCode: string; centAmount: number }): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(money.centAmount / 100);
}
