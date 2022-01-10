import React from 'react'
import styles from '../../../../css/signin.module.css'

const AlertError = ({message, onHide}) => {
	return (
		<div className={styles.signinSectionRightAlertMessage}>
			{message}

			<span 
				className={styles.signinSectionRightAlertClose}
				onClick={onHide}
			>&times;</span>
		</div>
	)
}

export default AlertError