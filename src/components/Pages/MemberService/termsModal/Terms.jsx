import React, { useState } from 'react';
import Modal from 'react-modal';
import { TermsContent } from './TermsContent';

export const Terms = () => {
  // 모달 스타일 정의
  const customStyles = {
  content: {
    width: '50%',
    height: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={openModal}>약관 내용 펼쳐보기</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="약관 동의 모달"
      >
        <button style={{ marginLeft: 'auto', display: 'block' }} onClick={closeModal}>X</button>
        <TermsContent />
      </Modal>
    </>
  );
}