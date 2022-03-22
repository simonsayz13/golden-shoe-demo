import React, { useState, useEffect } from "react";
import "../index.css";
import * as firebaseHandler from "../Firebase/FirebaseHandler";

import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ProgressBar,
  Image,
  Alert,
} from "react-bootstrap";

const Home = ({ cartCount, setCartCount, setBasket, basket }) => {
  const [products, setProducts] = useState([]);
  const [dataLoaded, setDataloaded] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [isInStock, setIsInStock] = useState(false);

  const addItem = (item) => {
    firebaseHandler.checkItemStock(item.id).then((isInStock) => {
      if (isInStock) {
        let itemLoc = 0;
        let itemExist = false;
        const basketItem = {
          itemID: item.id,
          itemName: item.name,
          itemPrice: item.price,
          itemQuantity: 1,
        };

        for (let i = 0; i < basket.length; i++) {
          if (basket[i].itemID === item.id) {
            itemLoc = i;
            itemExist = true;
            break;
          }
        }

        if (itemExist) {
          const newBasketItem = {
            itemID: basket[itemLoc].itemID,
            itemName: basket[itemLoc].itemName,
            itemPrice: basket[itemLoc].itemPrice,
            itemQuantity: (basket[itemLoc].itemQuantity += 1),
          };
          basket[itemLoc] = newBasketItem;
          setBasket(basket);
          itemExist = false;
        } else {
          setBasket([...basket, basketItem]);
        }

        setCartCount(cartCount + 1);
      }
      setIsInStock(isInStock);
      setItemAdded(true);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const loadProduct = await firebaseHandler.getProducts();
      setProducts(loadProduct);
      setDataloaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItemAdded(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [itemAdded]);

  return (
    <React.Fragment>
      <Container fluid>
        <div>
          {itemAdded ? (
            isInStock ? (
              <Alert variant="success">
                <Alert.Heading>Succesfully added to cart</Alert.Heading>
              </Alert>
            ) : (
              <Alert variant="danger">
                <Alert.Heading>Out of stock</Alert.Heading>
              </Alert>
            )
          ) : (
            <p></p>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <Image
            src="https://creativemachine.co/wp-content/uploads/2020/03/ecommerce_men_s_clothing_banner_template_13_1200x628.jpg"
            width="1000"
            height="325"
          ></Image>
        </div>
        <br />
        <Row className="justify-content-md-center">
          {dataLoaded ? (
            products.map(({ name, description, price, imgUrl, id, stock }) => {
              return (
                <Col md="auto" key={name}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      /* onClick={} */
                      variant="top"
                      src={imgUrl}
                      alt={description}
                      width="200"
                      height="200"
                    />
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                      <Card.Text>£{price}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          addItem({
                            name,
                            description,
                            price,
                            imgUrl,
                            id,
                            stock,
                          });
                        }}
                      >
                        Add to cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Container fluid>
              <ProgressBar animated now={50} />
            </Container>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;
