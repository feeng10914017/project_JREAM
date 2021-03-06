import { React, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { IoPersonOutline } from 'react-icons/io5'
import { IoCartOutline } from 'react-icons/io5'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { withRouter, NavLink, Route, Redirect } from 'react-router-dom'

function MyNavbar(props) {
  const { location, auth, setAuth } = props
  const [member, setMember] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )
  // console.log(location.pathname)
  const loginout = (
    <Nav.Link as={NavLink} to="/login">
      <IoPersonOutline size="18" />
      <h6>登入</h6>
    </Nav.Link>
  )
  useEffect(() => {
    setMember(JSON.parse(localStorage.getItem('userData')))
  }, [auth])
  const login = (
    <>
      <NavDropdown title={<h6>{member && member.memberName}</h6>}>
        <NavDropdown.Item as={NavLink} to="/member">
          會員中心
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/member/rent-record">
          租車紀錄
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          as={NavLink}
          to="/"
          onClick={() => {
            localStorage.removeItem('userData')
            console.log('Logged out Success')
            let timerInterval
            Swal.fire({
              title: '登出成功',
              html: '跳轉到首頁',
              timer: 800,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  const content = Swal.getContent()
                  if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                      b.textContent = Swal.getTimerLeft()
                    }
                  }
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
            sessionStorage.removeItem('userData')
            setAuth(false)
          }}
        >
          登出
        </NavDropdown.Item>
      </NavDropdown>
    </>
  )

  //一般header
  const display = (
    <>
      <header className="header ">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="primary"
          variant="dark"
          // fixed="top"
        >
          <Navbar.Brand href="#home">
            <Nav.Link as={NavLink} to="/">
              <img
                className="logo"
                src="http://localhost:3000/images/logo/logo_w.png"
                alt=""
              />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/news">
                <h6>最新消息</h6>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/motor">
                <h6>機車租賃</h6>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/product">
                <h6>周邊商品</h6>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/location">
                <h6>據點消息</h6>
              </Nav.Link>
            </Nav>
            <Nav>
              {auth ? login : loginout}
              {/* <Nav.Link as={NavLink} to="/login">
                <IoPersonOutline size="18" /> */}
              {/* {auth ? login : loginout} */}
              {/* </Nav.Link> */}
              <Nav.Link eventKey={2} as={NavLink} to="/order">
                <IoCartOutline size="20" />
                <h6>購物車</h6>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  )

  const homeDisplay = (
    <>
      <header className="header">
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          fixed="top"
          bg="primary"
        >
          <Navbar.Brand href="#home">
            <Nav.Link as={NavLink} to="/">
              <img
                className="logo"
                src="http://localhost:3000/images/logo/logo_w.png"
                alt=""
              />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/news">
                <h6>最新消息</h6>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/motor">
                <h6>機車租賃</h6>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/product">
                <h6>周邊商品</h6>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/location">
                <h6>據點消息</h6>
              </Nav.Link>
            </Nav>
            <Nav>
              {auth ? login : loginout}
              {/* <Nav.Link as={NavLink} to="/login">
                <IoPersonOutline size="18" />
                <h6>登入</h6>
              </Nav.Link> */}
              <Nav.Link eventKey={2} as={NavLink} to="/order">
                <IoCartOutline size="20" />
                <h6>購物車</h6>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  )
  return (
    <>
      {/* {location.pathname === '/' || location.pathname == '/motor'
        ? homeDisplay
        : display} */}
      {location.pathname === '/' ? homeDisplay : display}
      {/* {display} */}
    </>
  )
}

export default withRouter(MyNavbar)
