import React, { useState } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { setUserAddr } from '../../../../redux/reducer/userAddrActions';

function AddressSearch() {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userAddress, setuUserAddress] = useState('')
  const handleAddressComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    dispatch(setUserAddr(fullAddress));
    setuUserAddress(fullAddress);
    setModalIsOpen(false);
  };

  return (
    <div>
      <input className='AddressSearchInputShort' type='text' value={userAddress} readOnly></input>
      <button onClick={() => setModalIsOpen(true)}>주소검색</button>
      {/* 모달 다이얼로그 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)} // 모달 닫기 버튼을 누르면 모달이 닫히도록 설정
        contentLabel="주소 검색"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={{
              content: {
                width: '50%', // 모달 내용의 가로 크기
                height: '50%', // 모달 내용의 세로 크기
                overflow: 'hidden', // 모달 스크롤바 hidden
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // 배경 색상 및 투명도
                zIndex: 1000, // 오버레이의 Z-index
              },
            }}
      >
        <button style={{ marginLeft: 'auto', display: 'block' }} onClick={() => setModalIsOpen(false)}>X</button> {/* 닫기 버튼 추가 */}
        <DaumPostcode
          onComplete={handleAddressComplete}
          autoClose
          animation
          autoMapping
          style={{ width: '100%', height: '100%' }}
        />
      </Modal>
    </div>
  );
}

export default AddressSearch;