import { CurrencySign } from '@/types/types';

interface Currency {
  amount: number;
  currency: CurrencySign;
}

export function formatCurrency({ amount, currency }: Currency) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
