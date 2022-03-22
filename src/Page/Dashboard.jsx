import React, { useState } from "react";
import { Alert, Table, Container } from "react-bootstrap";
import { getOrderHistory } from "../Firebase/FirebaseHandler";

const Dashboard = ({
  username,
  isLoginSuccess,
  setIsLoginSuccess,
  userID,
  isOrderComplete,
  setIsOrderComplete,
}) => {
  const [orderHistory, setOrderHistory] = useState({});
  const [historyLoaded, setHistoryLoaded] = useState(false);

  React.useEffect(() => {
    getOrderHistory(userID).then((order) => {
      setOrderHistory(order);
      setHistoryLoaded(true);
    });
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoginSuccess(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [setIsLoginSuccess]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOrderComplete(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isOrderComplete]);

  return (
    <React.Fragment>
      <Container>
        <div>
          {isOrderComplete ? (
            <Alert
              variant="success"
              onClose={() => setIsOrderComplete(false)}
              dismissible
            >
              <Alert.Heading>Order Complete</Alert.Heading>
            </Alert>
          ) : (
            <p></p>
          )}
        </div>
        <div>
          {isLoginSuccess ? (
            <Alert
              variant="success"
              onClose={() => setIsLoginSuccess(false)}
              dismissible
            >
              <Alert.Heading>Succesfully logged in</Alert.Heading>
            </Alert>
          ) : (
            <p></p>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <h2>{username}'s Dashboard</h2>
        </div>
        <div>
          <h3>Order History</h3>
        </div>
        {historyLoaded ? (
          orderHistory.map((item) => {
            var itemArr = [];
            for (var key in item) {
              if (key != "status" && key != "subtotal" && key != "orderID") {
                itemArr.push(item[key]);
              }
            }
            return (
              <React.Fragment>
                <h6>Order Number: {item["orderID"]}</h6>
                <Table bordered hover size="sm">
                  <thead>
                    <tr key={item["orderID"]}>
                      <th className="text-center">Item Name</th>
                      <th className="text-center">Item Price</th>
                      <th className="text-center">Quantity</th>
                    </tr>
                  </thead>
                  {itemArr.map((item) => {
                    return (
                      <tbody>
                        <tr>
                          <th className="text-center">{item.itemName}</th>
                          <th className="text-center">£{item.itemPrice}</th>
                          <th className="text-center">{item.itemQuantity}</th>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th className="text-center">Subtotal</th>
                      <th className="text-center">£{item["subtotal"]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="text-center">Order Status</th>
                      <th className="text-center">{item["status"]}</th>
                    </tr>
                  </tbody>
                </Table>
              </React.Fragment>
            );
          })
        ) : (
          <p />
        )}
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
