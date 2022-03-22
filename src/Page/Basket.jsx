import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  checkBasketStock,
  placeOrder,
  updateStock,
} from "../Firebase/FirebaseHandler";

const Basket = ({
  basket,
  setIsOrderComplete,
  isLoggedIn,
  setCartCount,
  setBasket,
  userID,
}) => {
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [oosItem, setOosItem] = useState("");
  const [sum, setSum] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    var initSum = 0;
    var initSubTotal = 0;
    for (let i = 0; i < basket.length; i++) {
      initSum += basket[i].itemPrice * basket[i].itemQuantity;
      initSubTotal += basket[i].itemQuantity;
    }
    setSubtotal(initSubTotal);
    setSum(initSum);
  }, [sum, subtotal]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOutOfStock(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [isOutOfStock]);

  const processOrder = () => {
    if (isLoggedIn) {
      checkBasketStock(basket).then((result) => {
        if (result[0]) {
          placeOrder(basket, userID, sum);
          updateStock(basket);
          setIsOrderComplete(true);
          setCartCount(0);
          setBasket([]);
          navigate("/dashboard");
        } else {
          setIsOutOfStock(true);
          setOosItem(result[1]);
        }
      });
    } else {
      navigate("/login");
    }
  };

  const updateBasket = (itemID, newQuantity) => {
    var tempSum = 0;
    var tempSubtotal = 0;
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].itemID === itemID) {
        const newItemQuantity = {
          itemID: basket[i].itemID,
          itemName: basket[i].itemName,
          itemPrice: basket[i].itemPrice,
          itemQuantity: newQuantity,
        };
        basket[i] = newItemQuantity;
        setBasket(basket);
        break;
      }
    }

    for (let i = 0; i < basket.length; i++) {
      tempSum += basket[i].itemPrice * basket[i].itemQuantity;
      tempSubtotal += basket[i].itemQuantity;
    }
    setSubtotal(tempSubtotal);
    setCartCount(tempSubtotal);
    setSum(tempSum);
  };

  return (
    <React.Fragment>
      <Container>
        <div>
          {isOutOfStock ? (
            <Alert
              variant="danger"
              onClose={() => setIsOutOfStock(false)}
              dismissible
            >
              <Alert.Heading>{oosItem}: not enough stock</Alert.Heading>
            </Alert>
          ) : (
            <p></p>
          )}
        </div>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th className="text-center">Item ID</th>
              <th className="text-center">Item Name</th>
              <th className="text-center">Item Price</th>
              <th className="text-center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {basket.map(({ itemID, itemName, itemPrice, itemQuantity }) => {
              return (
                <tr key={itemID}>
                  <th className="text-center">{itemID}</th>
                  <th className="text-center">{itemName}</th>
                  <th className="text-center">£{itemPrice}</th>
                  <th>
                    <form
                      method="post"
                      className="d-flex justify-content-center"
                    >
                      <input
                        className="text-center"
                        type="text"
                        id={itemID}
                        name="quantity"
                        defaultValue={itemQuantity}
                        onChange={() => {
                          updateBasket(
                            itemID,
                            Number(document.getElementById(itemID).value)
                          );
                        }}
                      />
                    </form>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="text-center">Subtotal {subtotal} items</th>
              <th className="text-center">£{sum}</th>
            </tr>
          </thead>
        </Table>

        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={() => {
              processOrder();
            }}
          >
            Checkout
          </Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Basket;
