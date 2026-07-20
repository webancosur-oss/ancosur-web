import {
  CurrencyCircleDollarIcon,
  FileTextIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  investorBenefits,
} from "../data";

import styles from "./InvestorsBenefits.module.css";

const icons = [
  CurrencyCircleDollarIcon,
  FileTextIcon,
  ShieldCheckIcon,
];

export default function InvestorsBenefits() {
  return (
    <section
      className={styles.section}
      aria-label="Beneficios para inversionistas"
    >
      <div className={styles.grid}>
        {investorBenefits.map((item, index) => {
          const Icon = icons[index];

          return (
            <article
              key={item.title}
              className={styles.item}
            >
              <span className={styles.icon}>
                <Icon
                  size={25}
                  weight="duotone"
                  aria-hidden="true"
                />
              </span>

              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}