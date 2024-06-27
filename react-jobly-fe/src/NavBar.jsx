import Nav from 'react-bootstrap/Nav';
import Link from 'react-router'

function StackedExample() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Link href="/home">Active</Link>
      <Link eventKey="link-1">Users</Link>
      <Link eventKey="link-2">Companies</Link>
      <Link eventKey="link-3">Jobs</Link>
      <Link eventKey="link-4">Submit A Job</Link>
    </Nav>
  );
}

export default StackedExample;