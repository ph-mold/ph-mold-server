export class MaskUtil {
  /**
   * 이름 마스킹 처리
   * 예시: "홍길동" -> "홍*동"
   */
  static maskName(name: string): string {
    if (name.length <= 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  }

  /**
   * 회사명 마스킹 처리
   * 예시: "(주)회사이름" -> "(주) 회**름"
   */
  static maskCompany(company: string): string {
    if (company.length <= 2) return company[0] + '*';
    if (company.includes('(주)')) {
      const withoutJu = company.replace('(주)', '').trim();
      return `(주) ${withoutJu[0]}${'*'.repeat(withoutJu.length - 2)}${withoutJu[withoutJu.length - 1]}`;
    }
    return (
      company[0] + '*'.repeat(company.length - 2) + company[company.length - 1]
    );
  }

  /**
   * 전화번호 마스킹 처리
   * 예시: "010-1234-5678" -> "010-****-5678"
   */
  static maskPhone(phone: string): string {
    const cleaned = phone.replace(/-/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
    }
    return cleaned.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-****-$3');
  }
}
