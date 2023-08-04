import React, { useEffect } from "react";
import { useRef } from "react";
import { app, db } from "../Firebaze";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import Sidebar from "../Components/Sidebar";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import swal from "sweetalert";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function Dashboard() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //
  // start fetching data firestore
  //create usestate with 2 variables
  const [income, setIncome] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;

        const fetchData = async () => {
          const q = query(
            collection(db, "Income-Data"),
            where("userId", "==", userId)
          );
          let incomeItems = [];
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((incomeDoc) => {
            incomeItems.push({ id: doc.id, ...incomeDoc.data() });
            setIncome([...incomeItems]);
          });
          console.log("test");
        };
        fetchData();
      }
    });
  }, []);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       //if there is a user, save as follows below
  //       const userId = user.uid;

  //       const fetchData = async () => {
  //         const q = query(
  //           collection(db, "Income-Data"),
  //           where("userId", "==", userId)
  //         );
  //         let incomeItems = [];
  //         const querySnapshot = await getDocs(q);

  //         querySnapshot.forEach((incomeDoc) => {
  //           incomeItems.push({ id: doc.id, ...incomeDoc.data() });
  //           setIncome([...incomeItems]);
  //         });
  //       };
  //       //initialize function outside a function
  //       fetchData();
  //     }
  //   });
  // }, []);
  //
  const itemBrandRef = useRef();
  const quantityRef = useRef();
  const priceRef = useRef();

  function get() {
    const name = itemBrandRef.current.value;
    const quantity = quantityRef.current.value;
    const price = priceRef.current.value;
    const total = price * quantity;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // navigate("/");
        const userId = user.uid;
        console.log(userId);

        const newIncome = doc(collection(db, "Income-Data"));

        setDoc(newIncome, {
          userId: userId,
          name: name,
          Amount: price,
          Quantity: quantity,
          Total: total,
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      }
    });
  }

  function deleteEntry(incomeDocId) {
    const docId = incomeDocId;

    swal({
      title: `Delete Entry`,
      text: `Are you sure you want to delete this Entry?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDoc(doc(db, "Income-Data", docId)).then(() => {
          swal("Deleted", "", "success");
          swal(`Entry has been deleted!`, {
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        });
      } else {
        swal("Cancelled!");
      }
    });
  }
  // function deleteEntry(incomeDocId) {
  //   const docId = incomeDocId;

  //   swal({
  //     title: `Delete Entry`,
  //     text: `Are you sure you want to delete this Entry`,
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         deleteDoc(doc(db, "Income-Data", docId)).then(() => {
  //           swal("Delete", "", "success");
  //           swal(`Entry has been deleted!`, {
  //             icon: "success",
  //           })
  //             .then(() => {
  //               window.location.reload();
  //             })
  //             .catch((error) => {
  //               const errorMessage = error.message;
  //               console.log(errorMessage);
  //             });
  //         });
  //       } else {
  //         swal("Cancelled!");
  //       }
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //     });
  // }
  return (
    <div className="experiment">
      <Sidebar />
      <div className="zone">
        <Button className="ton" variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Financial Management System</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="">item</label>
            <br />
            <input type="text" id="name" ref={itemBrandRef} />
            <br />
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input type="number" ref={quantityRef} />
            <br />
            <label htmlFor="amount">Price</label>
            <br />
            <input type="number" ref={priceRef} />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={get}>
              Get
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {income.map((incomeItems) => (
              <tr key={Math.random()}>
                <td>{incomeItems.name}</td>
                <td>{incomeItems.Quantity}</td>
                <td>{incomeItems.Amount} </td>
                <td>{incomeItems.Total}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteEntry(incomeItems.incomeDocId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    // Modals
  );
}
// }

export default Dashboard;
