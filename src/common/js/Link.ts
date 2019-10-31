export default class Link {
  private _href: string;
  private link: string;
  private _rules: RegExp[];
  constructor (link: string, href: string, rules: RegExp[] = []) {
    this.link = link
    this._href = href
    this._rules = []
  }
  get href (): string {
    return this._href
  }
  set href (href) {
    if (this._rules.some(regExp => regExp.test(href))) {
      this._href = href
    } else {
      this._href = ''
    }
  }
}