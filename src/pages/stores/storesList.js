import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Badge,
  Card,
  Form,
  Col,
  Alert,
  Container,
  FormControl,
  Table,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Search, PlusCircle, Trash3 } from "react-bootstrap-icons";
import config from "../../config.json";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Stores() {
  //   EXPRESS IMPORTS
  let image = "";
  const [stores, setStores] = useState({});
  let userName = localStorage.getItem("userName");
  let userMobile = localStorage.getItem("userMobile");
  let [paymentForm, setPaymentForm] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  let orderPlaced = () => {
    setPaymentForm(false);
    setShowCustomer(false);
    setShowAlert(true);
  };

  const [filteredStoreList, setFilteredStoreList] = useState([]);
  const findStore = (e) => {
    const toSearch = e.currentTarget.value;
    const searchTerm = toSearch.toLowerCase();

    const filteredList = config.stores.filter((store) =>
      store.name.match(new RegExp(searchTerm, "i"))
    );

    console.log(filteredList);
    setFilteredStoreList(filteredList);
  };

  useEffect(() => {
    async function getAllCustomers() {
      const data = { ...config };

      setStores(data);
    }
    getAllCustomers();
  }, []);
  const [hideStores, setHideStores] = useState(true);
  const [currentStore, setCurrentStore] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const selectStore = (storeName, index) => {
    setHideStores(false);
    setCurrentStore(storeName);
    setCurrentIndex(index);
    console.log(storeName);
    setFilteredStoreList([]);
  };

  const handleStoreClick = (store, index) => {
    setCurrentStore(store.name);
    setCurrentIndex(index);
  };

  const [showOrders, setShowOrders] = useState(true);

  const [showMenu, setShowMenu] = useState(false);

  const [ordersFor, setOrdersFor] = useState({
    customerName: localStorage.getItem("userName"),
    mobile: localStorage.getItem("userMobile"),
    subTotal: "",
    grandTotal: "",
    foodOrdered: [],
  });

  const [foodList, setFoodList] = useState([
    {
      foodName: "Chicken 65",
      qty: 1,
      price: 300,
      category: "nonVeg",
      subTotal: 300,
      status: "selected",
      discount: 10,
    },
    {
      foodName: "Chicken 95",
      qty: 1,
      price: 100,
      category: "nonVeg",
      subTotal: 100,
      status: "selected",
      discount: 10,
    },
    {
      foodName: "Chicken Tandoor",
      qty: 1,
      price: 200,
      category: "nonVeg",
      subTotal: 200,
      status: "selected",
      discount: 50,
    },
  ]);

  const currentOrders = (food, index) => {
    console.log(food);
    const arr = { ...ordersFor };
    console.log(arr);
    const condition = (element) => element.name === food.name;
    console.log(condition);
    let conditionValue = arr.foodOrdered.findIndex(condition);
    if (conditionValue > -1) {
      if (arr.foodOrdered[conditionValue].status === "selected") {
        console.log("Increment Counter QTY");
        arr.foodOrdered[conditionValue].qty++;

        let a = arr.foodOrdered[conditionValue].qty * foodList[index].price;
        arr.foodOrdered[conditionValue].subTotal = a;

        let total = arr.foodOrdered.reduce((acc, curr) => {
          return acc + curr.qty * curr.price;
        }, 0);

        arr.foodOrdered[conditionValue].status = "selected";
        arr.grandTotal = total;
        arr.subTotal = total;
        setOrdersFor(arr);
      } else if (arr.foodOrdered[conditionValue].status === "ordered") {
        console.log("Create New PUSH");
        console.log(arr.foodOrdered[conditionValue]);

        const selectedFood = { ...food };
        selectedFood.qty = 1;
        let a = selectedFood.qty * selectedFood.price;
        selectedFood.subTotal = a;
        selectedFood.status = "selected";
        arr.foodOrdered.push(selectedFood);
        let count = arr.foodOrdered.length;
        setOrderCount(count);
        let total = arr.foodOrdered.reduce((acc, curr) => {
          return acc + curr.qty * curr.price;
        }, 0);

        arr.grandTotal = total;
        arr.subTotal = total;
        setOrdersFor(arr);
      }
    } else {
      console.log("Add Fresh");
      arr.foodOrdered.push(food);

      let count = arr.foodOrdered.length;
      setOrderCount(count);
      let total = arr.foodOrdered.reduce((acc, curr) => {
        return acc + curr.qty * curr.price;
      }, 0);
      console.log(total);
      setGrandTotal(total);
      arr.subTotal = total;
      setOrdersFor(arr);
    }
  };

  const [currentTable, setCurrentTable] = useState("");
  let [tableIndex, setTableIndex] = useState("0");
  let [foodIndex, setFoodIndex] = useState("");
  const [showFoodTable, setShowFoodTable] = useState(false);

  let [grandTotal, setGrandTotal] = useState("");

  let [orderTotal, setOrderTotal] = useState("");
  let [orderCount, setOrderCount] = useState("");
  let [discount, setDiscount] = useState("");
  let [discountedAmount, setDiscountedAmount] = useState("");

  let [tax, setTax] = useState("");
  let [taxAmount, setTaxAmount] = useState("");

  let [bookingId, setBookingId] = useState(103);

  const handleOrderCount = () => {
    let orderId = bookingId;
    orderId++;
    setShowMenu(true);
    const arr = { ...ordersFor };
    arr[orderId] = orderId;
    arr[orderId] = {
      customerName: "",
      mobile: "",
      email: "",
      source: "",
      subTotal: "",
      foodOrdered: [],
    };
    setBookingId(orderId);
    setShowCustomer(false);
    setOrdersFor(arr);
  };

  const [showCustomer, setShowCustomer] = useState(false);
  const addCustomer = (orderId) => {
    setShowCustomer(true);
    setBookingId(orderId);
  };

  const handleAdd = (food, index) => {
    setShowAlert(false);
    const arr = { ...ordersFor };
    const id = arr.foodOrdered.indexOf(food);
    // arr.foodOrdered.splice(id, 1);

    arr.foodOrdered[id].qty++;

    setOrdersFor(arr);
    let count = arr.foodOrdered.length;
    setOrderCount(count);
    let total = arr.foodOrdered.reduce((acc, curr) => {
      // return acc - curr.qty * curr.price;

      return acc + curr.qty * curr.price;
    }, 0);

    console.log(total);
    setOrderTotal(total);
    setGrandTotal(total + taxAmount - discountedAmount);
  };

  const handleDelete = (food, index) => {
    setShowAlert(false);
    const arr = { ...ordersFor };
    const id = arr.foodOrdered.indexOf(food);
    // arr.foodOrdered.splice(id, 1);

    arr.foodOrdered[id].qty === 1
      ? arr.foodOrdered.splice(id, 1)
      : arr.foodOrdered[id].qty--;

    console.log(arr.foodOrdered[id]);
    setOrdersFor(arr);
    let count = arr.foodOrdered.length;
    setOrderCount(count);
    let total = arr.foodOrdered.reduce((acc, curr) => {
      // return acc - curr.qty * curr.price;

      return acc + curr.qty * curr.price;
    }, 0);

    setOrderTotal(total);
    setGrandTotal(total + taxAmount - discountedAmount);
  };

  const [isSlot, setIsSlot] = useState(false);
  const bookSlot = (store, index) => {
    console.log("Hello Their");
    setHideStores(false);
    setIsSlot(true);
    setCurrentStore(store);
    setCurrentIndex(index);
    console.log(store);
    setFilteredStoreList([]);
  };

  const [slotBookAlert, setSlotBookAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const confirmSlot = (item, index) => {
    console.log(item);
    setAlertMessage(
      `Hey ${userName} You Slot Has Been Booked! You Are Welcome In Between ${item}`
    );
    setSlotBookAlert(true);
  };

  return (
    <>
      <Container fluid>
        <Row className="border-bottom">
          <div class="col col-lg-3  bg-white border-bottom py-2">
            <div class="row justify-content-between">
              <Image src={logo} />
            </div>
          </div>
          <div class="col bg-white my-3 py-2">
            <Form.Control
              type="email"
              placeholder="Search Tables"
              size="sm"
              onChange={findStore}
            />
            {filteredStoreList.length > 0 && (
              <ul class="list-group ontop" size="sm">
                {filteredStoreList.map((store, index) => (
                  <li
                    class="list-group-item text-dark"
                    onClick={() => selectStore(store.name, index)}
                  >
                    <strong>{store.name}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Row>
        <Row>
          <div class="col col-lg-5 bg-semiLight">
            <div className="divReverse row p-2">
              <div className="text-center sameHeight bg-semiLight">
                <>
                  <Row className="mb-2">
                    <Col>
                      <InputGroup className="">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="bg-white text-dark border-1"
                        >
                          <Search />
                        </InputGroup.Text>
                        <FormControl
                          size="sm"
                          type="text"
                          className="form-control form-control-sm border-1"
                          placeholder="Enter ZIP Code To Search Near By Stores"
                          //   onChange={handelSearchFood}
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mb-2 mt-3">
                    <ButtonGroup size="sm">
                      <Button variant="outline-primary">Book Slot</Button>
                      <Button variant="outline-primary">Order Online</Button>
                      <Button variant="outline-primary" active>
                        Waiting
                      </Button>
                    </ButtonGroup>
                  </Row>

                  <Row xs={1} md={2} className="g-4">
                    {hideStores &&
                      config.stores.map((store, index) => (
                        <Col>
                          <Card>
                            <img
                              class="card-img-top"
                              src={"https://fakeimg.pl/300/"}
                              alt=""
                            />
                            <Card.Body>
                              <Card.Title className="mb-5">
                                <p className="fs-3 float-start">{store.name}</p>
                                <Badge
                                  className="float-end"
                                  pill
                                  bg="success"
                                  size="sm"
                                >
                                  In Queue {store.queue}
                                </Badge>
                              </Card.Title>
                              <Card.Text>{store.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                              <Row className="mb-2 mt-3">
                                <ButtonGroup size="sm">
                                  <Button
                                    title="Tooltip on top"
                                    variant="dark"
                                    onClick={() => bookSlot(store.name, index)}
                                    disabled={store.queue >= 10 ? true : false}
                                  >
                                    Book Slot
                                  </Button>
                                  <Button
                                    variant="dark"
                                    onClick={() =>
                                      selectStore(store.name, index)
                                    }
                                  >
                                    Order Online
                                  </Button>
                                  <Button variant="dark">Waiting</Button>
                                </ButtonGroup>
                              </Row>
                            </Card.Footer>
                          </Card>
                        </Col>
                      ))}

                    {!hideStores && !isSlot && (
                      <Col>
                        <Card>
                          <Card.Body>
                            <Card.Title className="mb-5">
                              <p className="fs-3 float-start">
                                {config.stores[currentIndex].name}
                              </p>
                              <Badge
                                className="float-end"
                                pill
                                bg="success"
                                size="sm"
                              >
                                Ordering Online
                              </Badge>
                            </Card.Title>
                          </Card.Body>
                          <Card.Footer className="text-muted">
                            <div className="mb-2 mt-3">
                              {config.stores[currentIndex].products.map(
                                (item, index) => (
                                  <Badge
                                    variant="primary"
                                    className="mx-1"
                                    onClick={() => currentOrders(item, index)}
                                  >
                                    {item.name}
                                  </Badge>
                                )
                              )}
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    )}

                    {isSlot && (
                      <Col>
                        <Card>
                          <Card.Body>
                            <Card.Title className="mb-5">
                              <p className="fs-3 float-start">
                                {config.stores[currentIndex].name}
                              </p>
                              <Badge
                                className="float-end"
                                pill
                                bg="success"
                                size="sm"
                              >
                                Book Your Slots
                              </Badge>
                            </Card.Title>
                          </Card.Body>
                          <Card.Footer className="text-muted">
                            <div className="mb-2 mt-3">
                              {config.stores[currentIndex].slots.map(
                                (item, index) => (
                                  <Button
                                    variant="outline-dark"
                                    className="mx-1"
                                    onClick={() => confirmSlot(item, index)}
                                  >
                                    {item}
                                  </Button>
                                )
                              )}
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    )}
                  </Row>

                  {!isSlot && (
                    <Table
                      hover
                      size="sm"
                      className="table table-bordered mt-2"
                    >
                      <thead className="border-bottom border-top small mb-5">
                        <tr className="text-dark">
                          <th colSpan={1}>No.</th>

                          <th colSpan={5}>Item </th>
                          <th colSpan={1}>Qty</th>
                          <th colSpan={1}>Price</th>

                          <th colSpan={2}>Net</th>
                          <th colSpan={1}></th>
                        </tr>
                      </thead>
                      <tbody className="mt-2">
                        {ordersFor.foodOrdered.map((food, index) => (
                          <tr key={index}>
                            <td colSpan={1}>{index + 1}</td>
                            <td colSpan={5} className="text-primary m-0 p-0 ">
                              <PlusCircle
                                className="float-start m-2 text-primary"
                                size={15}
                                onClick={() => handleAdd(food, index)}
                              />
                              {food.name}
                              <Trash3
                                className="float-end m-2 text-danger"
                                size={15}
                                onClick={() => handleDelete(food, index)}
                              />
                            </td>

                            <td colSpan={1}>{food.qty}</td>
                            <td colSpan={1}>{food.price}</td>
                            <td colSpan={2}>{food.price * food.qty}</td>
                            {/* <td colSpan={2}>
                          <EraserFill className="text-danger" />
                        </td> */}
                          </tr>
                        ))}

                        {orderCount && (
                          <>
                            <tr className="cash mt-5 p-2 mb-5 bg-light text-dark">
                              <td colSpan={2}>
                                <small> Count</small>
                              </td>
                              <td colSpan={2}></td>
                              <td colSpan={6}>
                                <small>Grand Total</small>
                              </td>
                            </tr>
                            <tr className="mt-5 mb-5 bg-light text-dark">
                              <td colSpan={2}>{orderCount}</td>
                              <td colSpan={2}></td>
                              <td colSpan={6}>{grandTotal}</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </Table>
                  )}
                  {orderCount > 0 && !showCustomer && (
                    <Row>
                      <div className="d-grid gap-2 mb-5">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setShowCustomer(true)}
                        >
                          Go To Billing !
                        </Button>
                      </div>
                    </Row>
                  )}

                  {showCustomer && !paymentForm && (
                    <Card body>
                      <span>Enter Customer Details</span>
                      <Form>
                        <div className=" row g-2 mt-2">
                          <div className="col-md-6">
                            <Form.Control
                              className="form-control form-control-sm"
                              type="email"
                              placeholder="Customer Name"
                              value={userName}
                            />
                          </div>
                        </div>

                        <div className=" row g-2 mt-2">
                          <div className="col-md-6">
                            <Form.Control
                              className="form-control form-control-sm"
                              type="text"
                              value={userMobile}
                              placeholder="Mobile"
                            />
                          </div>
                          <div className="col-md-6">
                            <Form.Control
                              className="form-control form-control-sm"
                              type="text"
                              placeholder="Customers Address"
                            />
                          </div>
                        </div>
                        <hr />
                        <Button
                          variant="outline-primary"
                          onClick={() => setPaymentForm(true)}
                          size="sm"
                        >
                          Confirm Order And Pay
                        </Button>
                      </Form>
                    </Card>
                  )}

                  {paymentForm && (
                    <div className=" row mx-1 slideIn">
                      <Row>
                        <p className="text-dark">Enter Payment Details</p>
                        <div className="text-start col-md-6">
                          {/* <p className="mt-2 text-primary">Enter Amount</p> */}
                          <Form.Control
                            className="form-control-sm my-2 btnpymentmode"
                            name="CardNumber"
                            placeholder="Card Number"
                          />
                        </div>
                        <div className="text-start col-md-6">
                          {/* <p className="mt-2 text-primary">Remaining Amount</p> */}
                          <Form.Control
                            className="form-control-sm my-2 btnpymentmode"
                            name="ValidThru"
                            placeholder="Valid Thru(MM/YY)"
                          />
                        </div>
                        <div className="text-start col-md-6">
                          {/* <p className="mt-2 text-primary">Total Amount</p> */}
                          <Form.Control
                            className="form-control-sm my-2 btnpymentmode"
                            name="CVV"
                            placeholder="CVV"
                          />
                        </div>
                        <div className="text-start col-md-6">
                          {/* <p className="mt-2 text-primary">Total Amount</p> */}
                          <Form.Control
                            className="form-control-sm my-2 btnpymentmode"
                            name="TransactionID"
                            placeholder="Transaction ID"
                          />
                        </div>
                      </Row>
                      <Button onClick={orderPlaced}>Complete Payment</Button>
                    </div>
                  )}

                  {showAlert && (
                    <Alert variant="success">
                      Your Order Placed Succesfully ! Thank You
                    </Alert>
                  )}

                  {slotBookAlert && (
                    <Alert variant="success">{alertMessage}</Alert>
                  )}
                </>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Stores;
