import { formatName } from '../../../utils/format'
import { ressourcesUrl } from '../../../utils/url'
import styles from './styles/profilPopover.module.css'

const profileImage = require("../../../medias/img/chinoise.jpg")

const ProfilPopover = ({ authorData }) => {
  return (
    <section className={styles.popoverContainer}>
      <div className={styles.popoverTop}>
        <div className={styles.popoverImageContainer}>
          <img
            src={`${ressourcesUrl.profil}/${authorData.getProfil}`}
          />
        </div>

        <div className={styles.popoverProfilInfo}>
          <span className={styles.popoverName}>{formatName(authorData.getName)}</span>
          <span className={styles.popoverUsername}>{`@${formatName(authorData.getUsername)}`}</span>
        </div>
      </div>

      <div className={styles.popoverBottom}>
        <div className={styles.popoverFollowersInfo}>
          <div className={styles.popoverFollowerItem}>
            <span>13K</span>
            <span>Abonnés</span>
          </div>

          <div className={styles.popoverFollowerItem}>
            <span>350</span>
            <span>Abonnements</span>
          </div>
        </div>

        <div className={styles.popoverFollowersControls}>
          <button className={styles.popoverBtn} onClick={(e) => e.preventDefault()}>S'Abonner</button>
        </div>
      </div>
    </section>
  )
}

export default ProfilPopover