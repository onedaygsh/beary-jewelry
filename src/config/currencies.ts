export const currencyConfig = {
    en: { code: 'USD', symbol: '$', rate: 1 },
    zh: { code: 'CNY', symbol: '¥', rate: 7.2 }, // Example fixed rate
    jp: { code: 'JPY', symbol: '¥', rate: 150 }  // Example fixed rate
};

export type LocaleType = keyof typeof currencyConfig;
