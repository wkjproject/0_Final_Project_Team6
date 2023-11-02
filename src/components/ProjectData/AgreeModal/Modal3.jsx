import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

function Modal3({ setModalOpen }) {

    // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
    const closeModal = () => {
        setModalOpen(false);
    };

    // 모달 외부 클릭시 끄기 처리
    // Modal 창을 useRef로 취득
    const modalRef = useRef(null);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };

        // 이벤트 핸들러 등록
        document.addEventListener('mousedown', handler);
        // document.addEventListener('touchstart', handler); // 모바일 대응

        return () => {
            // 이벤트 핸들러 해제
            document.removeEventListener('mousedown', handler);
            // document.removeEventListener('touchstart', handler); // 모바일 대응
        };
    });

    return (
        // 모달창을 useRef로 잡아준다.
        <div ref={modalRef} className={styles.container}>
            <div className='AgreeModalDivHeader'>개인정보 제3자 제공 동의</div>
            <button className={styles.close} onClick={closeModal}>
                <svg viewBox="0 0 40 40" focusable="false" role="presentation" class="withIcon_icon__3VTbq ConfirmModal_closeIcon__23VbM" aria-hidden="true"><path d="M33.4 8L32 6.6l-12 12-12-12L6.6 8l12 12-12 12L8 33.4l12-12 12 12 1.4-1.4-12-12 12-12z"></path></svg>
            </button>
            <div className='AgreeModalDiv'>
                <div className='AgreeModalDesc'>
                    <div class="ConfirmModal_content__3KM88 ConfirmModal_hasTitle__3rvSc"><div>‘와디즈 스토어’를 통한 결제 및 상품 전달 서비스를 제공하기 위해, 이용자의 사전 동의 아래 제3자(프로젝트 메이커)에게 제공합니다. 메이커에게 전달되는 개인 정보는 기재된 목적 달성 후 파기에 대한 책임이 메이커에게 있으며, 파기하지 않아 생기는 문제에 대한 법적 책임은 메이커에게 있습니다. 아래 내용에 대하여 동의를 거부할 수 있으며, 거부 시 서비스 이용이 제한됩니다.</div><div class="PrivacyAgreementModal_termsTable__2CTzl"><h3 class="PrivacyAgreementModal_title__34yUb">개인정보 제3자 제공 내역</h3><table><tbody><tr><th>제공받는자</th><td><strong>와디즈 주식회사</strong></td></tr><tr><th>목적</th><td><strong>스토어 구매 정보 확인 및 상품 발송, 상품 제공과 관련된 공지 및 민원처리</strong></td></tr><tr><th>항목</th><td>서포터 정보(이름, 이메일, 휴대폰 번호), 수취인 정보(이름, 휴대폰 번호, 주소, 배송시 요청사항)</td></tr><tr><th>제공받는 자의<br />보유 및 이용 기간</th><td><strong>구매 확정 후 1년</strong></td></tr></tbody></table></div></div>
                </div>
            </div>
            <button onClick={closeModal} className='AgreeModalBtn'>확인</button>
        </div>
    );
}
export default Modal3;