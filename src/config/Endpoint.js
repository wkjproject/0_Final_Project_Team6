function Endpoint() {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_LOCAL_SERVER_URL;
  } else if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_MONGODB_SERVER_URL;
  }
}

export default Endpoint;
