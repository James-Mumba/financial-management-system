import React, { useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { db, app } from "../Firebaze";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import Table from "react-bootstrap/Table";

function Experriment() {
  const auth = getAuth(app);
  const Navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      Navigate("/");
    }
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //
  //
  const [Expense, setExpense] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;

        const fetchData = async () => {
          const q = query(
            collection(db, "Expense-Data"),
            where("userId", "==", userId)
          );
          let theExpense = [];
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((ExpenseDoc) => {
            theExpense.push({ id: doc.id, ...ExpenseDoc.data() });
            setExpense([...theExpense]);
          });
          console.log("test");
        };
        fetchData();
      }
    });
  }, []);

  const nameRef = useRef();
  const piecesRef = useRef();
  const priceRef = useRef();

  function click() {
    const name = nameRef.current.value;
    const pieces = piecesRef.current.value;
    const price = priceRef.current.value;
    const total = price * pieces;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);

        const newExpense = doc(collection(db, "Expense-Data"));

        setDoc(newExpense, {
          userId: userId,
          Name: name,
          Pieces: pieces,
          Price: price,
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

  return (
    <div className="experiment">
      <Sidebar />
      <div className="zone">
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Finance System</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" id="name" ref={nameRef} />
            <br />
            <label htmlFor="pieces">pieces</label>
            <br />
            <input type="number" id="pieces" ref={piecesRef} />
            <br />
            <label htmlFor="price">price</label>
            <br />
            <input type="number" id="price" ref={priceRef} />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={click}>
              Generate
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Pieces</th>
              <th>Price</th>
              <th>Total</th>
              <th>userId</th>
            </tr>
          </thead>
          <tbody>
            {Expense.map((theExpense) => {
              <tr key={Math.random()}>
                <td> {theExpense.Name} </td>
                <td>{theExpense.pieces}</td>
                <td>{theExpense.Price}</td>
                <td>{theExpense.Total}</td>
                <td>{theExpense.userId}</td>
              </tr>;
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Experriment;
