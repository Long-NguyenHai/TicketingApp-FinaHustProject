import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Create Events', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} legacyBehavior>
            <a className="nav-link" style={{ color: 'white' }}>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-dark bg-dark" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Link href="/" legacyBehavior>
        <a className="navbar-brand" style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>HalloTicket</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
