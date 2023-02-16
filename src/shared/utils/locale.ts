export interface ITransList {
  [key: string]: string;
}

class L {
  private locale: string = "vi";
  private transList: ITransList = {};
  constructor(locale: string, transList: ITransList) {
    this.locale = locale;
    this.transList = transList;
  }

  public t(key: string): string {
    return this.transList[key] || key;
  }
}

export default L;
