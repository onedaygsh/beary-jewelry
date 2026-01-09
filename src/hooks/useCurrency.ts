import { useLocale } from 'next-intl';
import { currencyConfig, LocaleType } from '@/config/currencies';

export const useCurrency = () => {
    const locale = useLocale() as LocaleType;
    const config = currencyConfig[locale] || currencyConfig.en;

    const formatPrice = (usdValue: number) => {
        const localValue = usdValue * config.rate;
        // Format to 2 decimal places if there are cents, otherwise keep it clean
        const formattedValue = localValue % 1 === 0
            ? localValue.toString()
            : localValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        return `${config.symbol}${formattedValue}`;
    };

    return {
        symbol: config.symbol,
        code: config.code,
        formatPrice,
        rate: config.rate
    };
};
