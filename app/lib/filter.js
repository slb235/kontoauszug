import { findInvoiceNumber } from '../lib/fidor';

export default function (filterRules) {
  return (desc) => {
    if (findInvoiceNumber(desc)) {
      return desc;
    }
    for (const rule of filterRules) {
      const match = desc.match(new RegExp(rule.from));
      if (match) {
        return desc.replace(match[0], ` RE-AB-${match[1]}-${match[2]} `);
      }
    }
    return desc;
  };
}
