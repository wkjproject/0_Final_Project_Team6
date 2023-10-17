function Endpoint() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  } else if (process.env.NODE_ENV === 'production') {
    return 'https://port-0-final-project-server1-euegqv2blntuic8i.sel5.cloudtype.app/';
  }
}

export default Endpoint;
