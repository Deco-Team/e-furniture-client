const LoginRegisterCard = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <ul className='nav nav-tabs card-header-tabs'>
          <li className='nav-item'>
            <a className='nav-link active' aria-current='true' href='#'>
              Login
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Register
            </a>
          </li>
        </ul>
      </div>
      <div className='card-body'>
        <h5 className='card-title'>Login or Register</h5>
        <p className='card-text'>Login or register to access the site.</p>
        <a href='#' className='btn btn-primary'>
          Login
        </a>
        <a href='#' className='btn btn-primary'>
          Register
        </a>
      </div>
    </div>
  )
}

export default LoginRegisterCard
