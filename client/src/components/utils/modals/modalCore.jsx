import React, { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from './css/modalCore.module.css'
import ModalContext from '../../../dataManager/context/modalContext';
import CategoryModalContent from './components/CategoryModalContent';
import ProfilUpdateModalContent from './components/ProfilUpdateModalContent';
import UserModalContent from './components/UserModalContent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  minHeight: 400,
  maxHeight: 500,
  height: 'auto',
  bgcolor: '#fff',
  boxShadow: 35,
  borderRadius: 2,
  overflowX: 'hidden',
  overflowY: "auto"
};

const ModalCoreContainer = ({ open, title, closeModal }) => {
  // Get global state
  const { currentModalCode } = useContext(ModalContext)

  // Some handlers
  const generateModalContent = () => {
    switch (currentModalCode.toUpperCase()) {
      case "SELECT_CATEGORIES": {
        return <CategoryModalContent />
      }

      case "PROFILE_UPDATE": {
        return <ProfilUpdateModalContent />
      }

      case "USERS_INFO": {
        return <UserModalContent />
      }

      default: return null
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <header className={styles.modalCoreHeader}>
              <span className={styles.modalCoreHeaderText}>{title.toUpperCase()}</span>
            </header>

            <Box sx={{
              padding: 2
            }}>
              {generateModalContent()}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalCoreContainer