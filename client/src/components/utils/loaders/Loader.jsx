import React from 'react'
import styles from './loader.module.css'

const LoaderCircle = ({color, size}) => {
  return (
    <div 
      className={styles.loaderCircle} 
      style={{borderColor: color, borderBottomColor: 'transparent', width: `${size}px`, height: `${size}px`}}
    ></div>
  )
}

export default LoaderCircle