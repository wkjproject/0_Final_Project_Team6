import React, {useState, useEffect} from 'react';
import './TopBtn.css';

export default function TopBtn() {
  const [showButton, setShowButton] = useState(false);  // 버튼 표시여부

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 300) { // 위치가 300 이상이면 버튼 표시
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    //console.log(window.scrollY);
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className='scroll-container'>
        <button className='topBtn' onClick={scrollToTop} type='button'>
          {' '}
          Top
        </button>
      </div>
    )
  );
}
