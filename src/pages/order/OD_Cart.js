import React, { useState, useEffect } from 'react'
import { Row, Card, Nav, Button } from 'react-bootstrap'
import { reactLocalStorage } from 'reactjs-localstorage'
import { Link } from 'react-router-dom'

import OrderStep from '../../components/order/CartStep'
import CartMotor from '../../components/order/CartMotor'
import CartProduct from '../../components/order/CartProduct'
import GrandTotal from '../../components/order/CheckOut_GrandTotal'

function OD_Cart() {
  const [ListType, setListType] = useState('Motor')
  const [motorCart, setMotorCart] = useState([])
  const [productCart, setProductCart] = useState([])
  const [motorCartDisplay, setMotorCartDisplay] = useState([])
  const [productCartDisplay, setProductCartDisplay] = useState([])
  const [checkedCart, setCheckedCart] = useState([])
  const localShipping = reactLocalStorage.get('shipping')

  function setLocalStorage() {
    reactLocalStorage.setObject('motorCart', [
      {
        id: 1,
        img: 'Leoncino_250_gray.jpg',
        company: 'SUZUKI',
        model: 'GSX - S1000S',
        color: 'BROWN',
        rentalPrice: '1000',
        rentalAmount: 1,
        rentalLocation: '台北濱江店',
        rentalDate: '2021-01-09',
        rentalTime: '14:16:00',
        returnLocation: '台北濱江店',
        returnDate: '2021-01-10',
        returnTime: '14:16:00',
        valid: 0,
      },
    ])
    reactLocalStorage.setObject('productCart', [
      {
        id: 2,
        name: 'Wacth Product 01 ',
        img: 'https://www.upsieutoc.com/images/2020/07/18/img1.jpg',
        color: 'red',
        size: 'XL',
        price: 10001,
        amount: 1,
        colorOptions: ['red', 'black', 'teal'],
        sizeOptions: ['XL', 'L', 'M', 'XM', 'LX'],
      },
      {
        id: 3,
        name: 'Wacth Product 02',
        img: 'https://www.upsieutoc.com/images/2020/07/18/img2.jpg',
        color: 'black',
        size: 'L',
        price: 102,
        amount: 1,
        colorOptions: ['red', 'black', 'teal'],
        sizeOptions: ['XL', 'L', 'M', 'XM', 'LX'],
      },
      {
        id: 4,
        name: 'Wacth Product 03',
        img: 'https://www.upsieutoc.com/images/2020/07/18/img3.jpg',
        color: 'teal',
        size: 'M',
        price: 103,
        amount: 1,
        colorOptions: ['red', 'black', 'teal'],
        sizeOptions: ['XL', 'L', 'M', 'XM', 'LX'],
      },
      {
        id: 4,
        name: 'Wacth Product 03',
        img: 'https://www.upsieutoc.com/images/2020/07/18/img3.jpg',
        color: 'teal',
        size: 'M',
        price: 103,
        amount: 1,
        colorOptions: ['red', 'black', 'teal'],
        sizeOptions: ['XL', 'L', 'M', 'XM', 'LX'],
      },
      {
        id: 4,
        name: 'Wacth Product 03',
        img: 'https://www.upsieutoc.com/images/2020/07/18/img3.jpg',
        color: 'teal',
        size: 'M',
        price: 103,
        amount: 1,
        colorOptions: ['red', 'black', 'teal'],
        sizeOptions: ['XL', 'L', 'M', 'XM', 'LX'],
      },
      {
        id: 5,
        name: 'Wacth Product 04',
        img: 'https://www.upsieutoc.com/images/2020/07/18/img4.jpg',
        color: 'red',
        size: 'XM',
        price: 104,
        amount: 1,
        colorOptions: ['red', 'black', 'teal'],
        sizeOptions: ['XL', 'L', 'M', 'XM', 'LX'],
      },
      {
        id: 6,
        name: 'Wacth Product 05',
        img: 'https://www.upsieutoc.com/images/2020/07/18/img5.jpg',
        color: 'black',
        size: 'LX',
        price: 105,
        amount: 1,
        colorOptions: ['red', 'black', 'teal'],
        sizeOptions: ['XL', 'L', 'M', 'XM', 'LX'],
      },
    ])
    reactLocalStorage.set('shipping', [])
  }

  //get local storage data
  function getCartFromLocalStorage() {
    const newMotorCart = localStorage.getItem('motorCart') || '[]'
    const newProductCart = localStorage.getItem('productCart') || '[]'
    setMotorCart(JSON.parse(newMotorCart))
    setProductCart(JSON.parse(newProductCart))
    localStorage.setItem('motorCart', newMotorCart)
    localStorage.setItem('productCart', newProductCart)
    localStorage.setItem('finalProductCart', '[]')
  }
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  //get users chose
  const ListTypeOnClick = ListType
  function changeDisplay(a, b) {
    document.getElementById(a).classList.add('displayBlock')
    document.getElementById(b).classList.remove('displayBlock')
    document.getElementById(a).classList.remove('displayNone')
    document.getElementById(b).classList.add('displayNone')
  }
  useEffect(() => {
    ListTypeOnClick === 'Motor'
      ? changeDisplay('BodyMotor', 'BodyProd')
      : changeDisplay('BodyProd', 'BodyMotor')
  }, [ListType])

  /////////////////////////////////////////////////////////////////

  //reorganize the productCart
  useEffect(() => {
    let newProductCartDisplay = []

    for (let i = 0; i < productCart.length; i++) {
      const index = newProductCartDisplay.findIndex(
        (value) => value.id === productCart[i].id
      )
      // console.log(index)
      if (index !== -1) {
        newProductCartDisplay[index].amount += productCart[i].amount
      } else {
        const newItem = { ...productCart[i] }
        newProductCartDisplay = [...newProductCartDisplay, newItem]
      }
      // console.log('hi')
    }
    // console.log(newProductCartDisplay)
    setProductCartDisplay(newProductCartDisplay)

    localStorage.setItem('productCart', JSON.stringify(newProductCartDisplay))
  }, [productCart])
  //reorganize the motorCart
  useEffect(() => {
    let newMotorCartDisplay = []
    newMotorCartDisplay = motorCart
    setMotorCartDisplay(newMotorCartDisplay)

    localStorage.setItem('motorCart', JSON.stringify(newMotorCartDisplay))
  }, [motorCart])

  // update productCart Amount to localStorage
  const updateCartAmountToLocalStorage = (item, isAdded = true) => {
    // console.log(item, isAdded)
    const currentCart = JSON.parse(localStorage.getItem('productCart')) || []

    const index = currentCart.findIndex((v) => v.id === item.id)
    // console.log('index', index)

    if (index !== -1) {
      if (isAdded) {
        updateCheckedItem(
          item,
          currentCart[index].id,
          'plus',
          currentCart[index].amount + 1
        )
        currentCart[index].amount++
      } else {
        updateCheckedItem(
          item,
          currentCart[index].id,
          'minus',
          currentCart[index].amount - 1
        )
        currentCart[index].amount--
      }
    }

    localStorage.setItem('productCart', JSON.stringify(currentCart))

    setProductCart(currentCart)
  }

  // update productCart size to localStorage
  const updateCartSizeToLocalStorage = (item, selected) => {
    // console.log(item, selected)
    const currentCart = JSON.parse(localStorage.getItem('productCart')) || []

    const index = currentCart.findIndex((v) => v.id === item.id)
    // console.log('index', index)

    if (index !== -1) {
      currentCart[index].size = selected
      updateCheckedItem(item, currentCart[index].id, 'selectSize', selected)
    }

    localStorage.setItem('productCart', JSON.stringify(currentCart))

    setProductCart(currentCart)
  }

  // delete productCart item to localStorage
  const deletItemToLocalStorage = (item) => {
    // console.log('delete', item)
    const currentCart = JSON.parse(localStorage.getItem('productCart')) || []

    const index = currentCart.findIndex((v) => v.id === item.id)
    // console.log('index', index)

    if (index !== -1) {
      updateCheckedItem(item, currentCart[index].id, 'delete', null)
      currentCart.splice(index, 1)
    }

    localStorage.setItem('productCart', JSON.stringify(currentCart))

    setProductCart(currentCart)
  }

  //check productCart checkedItem data
  const checkedItem = (item, checked, index) => {
    // console.log(item, checked, index)
    const currentCart = JSON.parse(localStorage.getItem('productCart')) || []

    let newCheckedItem = checkedCart

    const newIndex = newCheckedItem.findIndex((v) => v.id === item.id)
    // console.log(newIndex)
    checked
      ? (newCheckedItem = [...newCheckedItem, currentCart[index]])
      : newIndex !== -1 && newCheckedItem.splice(newIndex, 1)
    console.log(newCheckedItem)
    setCheckedCart(newCheckedItem)

    localStorage.setItem('finalProductCart', JSON.stringify(newCheckedItem))
  }

  //update productCart checkedItem data
  const updateCheckedItem = (item, id, eventType, value) => {
    // console.log(item, id, eventType, value)

    let newCheckedCart = checkedCart

    const index = newCheckedCart.findIndex((v) => v.id === item.id)
    if (index !== -1) {
      eventType === 'plus' && (newCheckedCart[index].amount = value)
      eventType === 'minus' && (newCheckedCart[index].amount = value)
      eventType === 'selectSize' && (newCheckedCart[index].size = value)
      eventType === 'delete' && newCheckedCart.splice(index, 1)
    }

    setCheckedCart(newCheckedCart)
    localStorage.setItem('finalProductCart', JSON.stringify(newCheckedCart))
  }

  // delet motor data
  const motorDeleteBtn = () => {
    console.log('hi')
    const doNotHaveMotor = '[]'
    setMotorCart(JSON.parse(doNotHaveMotor))
    localStorage.setItem('motorCart', doNotHaveMotor)
  }

  const display = (
    <>
      <article className="col-10">
        {/* 購物車步驟 */}
        <OrderStep step="1" />

        <Card className="cartHome">
          {/* CardHeader */}
          <Card.Header>
            <Nav fill variant="tabs" defaultActiveKey="#Nav_Motor">
              <Nav.Item>
                <Nav.Link
                  href="#Nav_Motor"
                  onClick={() => {
                    setListType('Motor')
                  }}
                >
                  <p>重機租賃</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#Nav_Prod"
                  onClick={() => {
                    setListType('Prod')
                  }}
                >
                  <p>周邊商品</p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          {/* CardBody */}
          <div id="BodyMotor">
            <CartMotor data={motorCart} motorDeleteBtn={motorDeleteBtn} />
          </div>
          <div id="BodyProd">
            {productCartDisplay.length > 0 ? (
              <div className="py-4">
                {productCartDisplay.map((v, index) => {
                  return (
                    <>
                      <CartProduct
                        index={index}
                        data={v}
                        updateCartAmountToLocalStorage={
                          updateCartAmountToLocalStorage
                        }
                        deletItemToLocalStorage={deletItemToLocalStorage}
                        updateCartSizeToLocalStorage={
                          updateCartSizeToLocalStorage
                        }
                        checkedItem={checkedItem}
                      />
                      <div className="col-11 m-auto" key={index}>
                        {productCart.length - 1 === index ? (
                          ''
                        ) : (
                          <div className="line"></div>
                        )}
                      </div>
                    </>
                  )
                })}
              </div>
            ) : (
              <Card.Body className="leaseNothing">
                <Row>
                  <div>
                    <h5>這裡好空</h5>
                    <h5>可以餵我&nbsp;&nbsp;&nbsp;&nbsp;吃東西嗎？</h5>
                    <Link to={'/product'}>
                      <Button
                        className="nothingBtn place-center mt-2"
                        variant="primary"
                      >
                        馬上來
                      </Button>
                    </Link>
                  </div>
                  <section>
                    <img
                      src="http://localhost:3000/images/order/undraw_empty_xct9.svg"
                      alt=""
                    />
                  </section>
                </Row>
              </Card.Body>
            )}
          </div>
        </Card>

        <GrandTotal
          type={ListType}
          data={ListTypeOnClick === 'Motor' ? motorCartDisplay : checkedCart}
          shipping={localShipping}
        />

        {/* Button */}
        <Row className="justify-content-center finalBtnParent">
          <Link to={'/'}>
            <Button className="finalBtn place-center" variant="danger">
              繼續購物
            </Button>
          </Link>
          <Link
            to={
              ListTypeOnClick === 'Motor'
                ? '/order/CreditCard'
                : '/order/checkout'
            }
          >
            <Button
              className="finalBtn finalBtnTwo place-center"
              variant="primary"
            >
              下一步
            </Button>
          </Link>
          <Button
            className="finalBtn finalBtnTwo place-center"
            variant="primary"
            onClick={setLocalStorage}
          >
            取資料
          </Button>
        </Row>
      </article>
    </>
  )
  return <>{display}</>
}

export default OD_Cart
