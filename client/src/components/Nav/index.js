import React from 'react';

function Nav () {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div class='container-fluid'>
        <h1 className='navbar-brand'>Google Books</h1>
        <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon' />
        </button>
        <div class='collapse navbar-collapse' id='navbarNav'>
          <ul class='navbar-nav'>
            <li class='nav-item'>
              <a class='nav-link' href='/'>Search</a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' href='/saved'>Saved</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
