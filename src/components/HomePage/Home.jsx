import { useSelector } from 'react-redux';

export const Home = () => {
  const userName = useSelector((state)=> state.userName.userName) 
  return (
    <div>
      <h1>userName:{userName}</h1>
    </div>
  )
}