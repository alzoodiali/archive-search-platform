import styles from './SectionRibbon.module.css';

/** شريط عنوان على شكل سهم — مطابق للعلامة "بحث بسيط/بحث متقدم" في التصميم المرجعي */
export default function SectionRibbon({ icon: Icon, children, as: Tag = 'h2', id }) {
  return (
    <Tag className={styles.ribbon} id={id}>
      {Icon && <Icon size={16} aria-hidden="true" />}
      <span>{children}</span>
    </Tag>
  );
}
