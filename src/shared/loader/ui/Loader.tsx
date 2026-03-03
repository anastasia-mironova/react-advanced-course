import styles from './Loader.module.css'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'white'
  text?: string
  fullScreen?: boolean
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = 'primary',
  text,
  fullScreen = false,
  className = ''
}) => {
  const containerClass = fullScreen ? styles.containerFullScreen : styles.container

  return (
    <div className={`${containerClass} ${styles[size]} ${className}`}>
      <div className={styles.dotsWrapper}>
        <div className={`${styles.dot} ${styles.dot1} ${styles[color]}`} />
        <div className={`${styles.dot} ${styles.dot2} ${styles[color]}`} />
        <div className={`${styles.dot} ${styles.dot3} ${styles[color]}`} />
      </div>
      {text && (
        <span className={`${styles.text} ${color === 'white' ? styles.textWhite : ''}`}>
          {text}
        </span>
      )}
    </div>
  )
}
