import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import MemberNav from './components/MemberNav'
import { Table, Button, Alert } from 'react-bootstrap'

import './member.scss'

function Information({
  name = '王大明',
  nickname = '路人乙',
  birth = '2088-12-31',
  gender = '男',
  email = 'LOL@gmail.com',
  phone = '0911111111',
  telephone = '(02)08000000',
  address = '桃園市中壢區某某路某某巷XX號',
}) {
  return (
    <>
      <MemberNav />
      <Table className="MBI">
        <tbody className="MBItr">
          <tr>
            <td className="MBItdC">姓名</td>
            <td className="MBItdL">{name}</td>
          </tr>
          <tr>
            <td className="MBItdC">暱稱</td>
            <td className="MBItdL">{nickname}</td>
          </tr>
          <tr>
            <td className="MBItdC">生日</td>
            <td className="MBItdL">{birth}</td>
          </tr>
          <tr>
            <td className="MBItdC">性別</td>
            <td className="MBItdL">{gender}</td>
          </tr>
          <tr>
            <td className="MBItdC">信箱</td>
            <td className="MBItdL">{email}</td>
          </tr>
          <tr>
            <td className="MBItdC">手機</td>
            <td className="MBItdL">{phone}</td>
          </tr>
          <tr>
            <td className="MBItdC">電話</td>
            <td className="MBItdL">{telephone}</td>
          </tr>
          <tr>
            <td className="MBItdC">地址</td>
            <td className="MBItdL">{address}</td>
          </tr>
          <tr>
            <td className="MBItdC"></td>
            <td className="MBItdR">
              <Link to="/information">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginRight: '16px' }}
                >
                  取消
                </Button>
              </Link>
              <Link to="/information">
                <Button variant="primary" type="submit">
                  確認修改
                </Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
      <Link to="/member">
        <button>回首頁</button>
      </Link>
    </>
  )
}

export default withRouter(Information)