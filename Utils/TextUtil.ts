class TextUtil {
  // public static currency = 'USD';

  public static formatPercentage(
    value: number,
    numberOfDecimalPlaces: number = 1,
  ): string {
    return value.toFixed(numberOfDecimalPlaces);
  }

  public static formatCurrency(
    value: number,
    locale: string = 'en-US',
    options: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      // currencySign: '$',
    },
  ): string {
    return value.toLocaleString(locale, options);
  }
}

export default TextUtil;
