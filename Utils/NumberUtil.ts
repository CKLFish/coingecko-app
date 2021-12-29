class NumberUtil {
  public static randomBetween(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

export default NumberUtil;
