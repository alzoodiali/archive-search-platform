import styles from './Card.module.css';

export default function Card({ as: Tag = 'section', className = '', children, ...rest }) {
  return (
    <Tag className={`${styles.card} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
