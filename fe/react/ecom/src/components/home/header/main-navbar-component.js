import { Navbar, Nav, NavDropdown } from "react-bootstrap";
export function MainNavbar(){
    return(
        <>
        <div className="main-navbar">
            <div className="container">
            <Navbar  expand="lg">

            <NavDropdown title="Browse Catagories" id="basic-nav-dropdown" className="sub-cat text-light">
          <NavDropdown.Item href="">Electronic</NavDropdown.Item>
          <NavDropdown.Item href="">Clothings</NavDropdown.Item>
          <NavDropdown.Item href="">Home appliences</NavDropdown.Item>
          <NavDropdown.Item href="">Separated link</NavDropdown.Item>
          <NavDropdown.Item href="">Electronic</NavDropdown.Item>
          <NavDropdown.Item href="">Clothings</NavDropdown.Item>
          <NavDropdown.Item href="">Home appliences</NavDropdown.Item>
          <NavDropdown.Item href="">Separated link</NavDropdown.Item>
        </NavDropdown>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="m-auto">
        <Nav.Link href="#home" className="me-3">Electronic</Nav.Link>
        <Nav.Link href="#link" className="me-3">Clothings</Nav.Link>
        <Nav.Link href="#link" className="me-3">Home appliences</Nav.Link>
        <Nav.Link href="#link" className="me-3">Foods</Nav.Link>
        <Nav.Link href="#link" className="me-3">Pets Food</Nav.Link>
        <Nav.Link href="#link" className="me-3">Babies & Toys</Nav.Link>
        
      </Nav>
    </Navbar.Collapse>
    <div className="header-ad">
   <a href="" title="Daraz Nepal"> <img src="../images/header-ad.png" alt="" /></a>
</div>
</Navbar>

            </div>
        </div>
        </>
    );
}