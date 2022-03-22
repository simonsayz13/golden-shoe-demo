import firebaseApp from "./Firebase";
import { getDatabase, ref, get, set, update } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const rtdb = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export const signUp = (username, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, { displayName: username });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign out successfully");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const getProducts = () => {
  const dbref = ref(rtdb, "Product");
  return get(dbref)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const childArray = [];
        snapshot.forEach((child) => {
          const { name, description, price, stock, imgUrl, id } = child.val();
          //if (stock !== 0) {
          childArray.push({
            name,
            description,
            price,
            stock,
            imgUrl,
            id,
          });
          //}
        });
        return childArray;
      } else {
        console.log("No data");
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const checkItemStock = async (itemID) => {
  const stockCheckRef = ref(rtdb, "Product/" + itemID + "/stock");
  return await get(stockCheckRef)
    .then((snapshot) => {
      if (snapshot.val() > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
};

export const checkBasketStock = async (basket) => {
  const stockCheckRef = ref(rtdb, "Product/");
  const productResult = await get(stockCheckRef);

  for (let i = 0; i < basket.length; i++) {
    const { itemID, itemName } = basket[i];
    const allProducts = productResult.val();
    if (basket[i].itemQuantity > allProducts[itemID].stock) {
      return [false, itemName];
    }
  }
  return [true, ""];
};

export const placeOrder = async (basket, userID, sum) => {
  const orderID = new Date().getTime();
  const orderRef = ref(rtdb, "Order/" + userID + "/" + orderID);
  const order = basket.reduce(
    (a, { itemID, ...obj }) => ((a[itemID] = obj), a),
    {}
  );
  order["subtotal"] = sum;
  order["status"] = "Processing";
  order["orderID"] = orderID;
  set(orderRef, order);
};

export const updateStock = async (basket) => {
  for (let i = 0; i < basket.length; i++) {
    const productRef = ref(rtdb, "Product/" + basket[i].itemID);
    await get(productRef).then((snapshot) => {
      const product = snapshot.val();
      const updateItemStock = {
        stock: (product.stock -= basket[i].itemQuantity),
      };
      update(productRef, updateItemStock);
    });
  }
};

export const getOrderHistory = async (userID) => {
  const orderRef = ref(rtdb, "Order/" + userID + "/");
  var orderHistoryArr = [];
  return await get(orderRef).then((snapshot) => {
    const order = snapshot.val();
    const arrayOfOrder = Object.entries(order).map((e) => ({ [e[0]]: e[1] }));
    for (var key in arrayOfOrder) {
      const arrayOfOrderItem = Object.entries(arrayOfOrder[key]).map((e) => ({
        [e[0]]: e[1],
      }));
      for (let i = 0; i < arrayOfOrderItem.length; i++) {
        const arrayOfOrderItem1 = Object.entries(arrayOfOrderItem[i]).map(
          (e) => ({
            [e[0]]: e[1],
          })
        );
        for (var key1 in arrayOfOrderItem1[0]) {
          orderHistoryArr.push(arrayOfOrderItem1[0][key1]);
        }
      }
    }
    return orderHistoryArr;
  });
};
