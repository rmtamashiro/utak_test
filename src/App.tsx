import React, { useEffect, useState, ChangeEvent } from "react";
import { Row, Col, Table } from "react-bootstrap";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase-config";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./component/NavigationBar";
import CategoryCard from "./component/CategoryCard";
import ItemModal from "./component/ItemModal";
import * as FaIcons from "react-icons/fa";
import "./App.css";

export interface Item {
  id: string;
  category: string;
  name: string;
  options?: string;
  price: number;
  cost: number;
  stock: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>({
    id: "",
    category: "",
    name: "",
    options: "",
    price: 0,
    cost: 0,
    stock: 0,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    updateCategories();
  }, [items]);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const itemsList: Item[] = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Item[];
    setItems(itemsList);
  };

  const updateCategories = () => {
    const categoriesMap: {
      [key: string]: { name: string }[];
    } = {};

    items.forEach((item) => {
      if (!categoriesMap[item.category]) {
        categoriesMap[item.category] = [];
      }
      categoriesMap[item.category].push({
        name: item.name,
      });
    });

    setCategories(Object.entries(categoriesMap));
  };

  const [categories, setCategories] = useState<[string, { name: string }[]][]>(
    []
  );

  const handleShow = (item: Item | null = null) => {
    if (item) {
      setCurrentItem(item);
    } else {
      setCurrentItem({
        id: "",
        category: "",
        name: "",
        options: "",
        price: 0,
        cost: 0,
        stock: 0,
      });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (currentItem.id) {
      const itemDoc = doc(db, "items", currentItem.id);
      await updateDoc(itemDoc, { ...currentItem });
      setItems(
        items.map((item) => (item.id === currentItem.id ? currentItem : item))
      );
    } else {
      const docRef = await addDoc(collection(db, "items"), {
        ...currentItem,
        id: "",
      });
      setItems([...items, { ...currentItem, id: docRef.id }]);
    }
    handleClose();
  };

  const handleRemove = async (id: string) => {
    await deleteDoc(doc(db, "items", id));
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]:
        name === "price" || name === "cost" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const totalEntries = items.length;

  return (
    <section className="container-fluid">
      <NavigationBar />
      <ItemModal
        show={show}
        handleClose={handleClose}
        handleSave={handleSave}
        currentItem={currentItem}
        handleChange={handleChange}
      />

      <Row>
        {categories.map(([category, items]) => (
          <CategoryCard
            key={category}
            category={category}
            items={items}
            count={items.length}
          />
        ))}
      </Row>

      <Row className="my-4">
        <Col>
          <button
            type="button"
            className="add-btn"
            onClick={() => handleShow()}
          >
            <FaIcons.FaPlus className="icon-btn" /> Add Item
          </button>
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <div className="table-container">
            <Table striped bordered hover responsive>
              <thead className="table-header">
                <tr>
                  <th style={{ width: "10%" }}>Category</th>
                  <th style={{ width: "15%" }}>Name</th>
                  <th style={{ width: "20%" }}>Options</th>
                  <th style={{ width: "10%" }}>Price</th>
                  <th style={{ width: "10%" }}>Cost</th>
                  <th style={{ width: "10%" }}>Stock (Qty.)</th>
                  <th style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7}>No added data</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td className="category">{item.category}</td>
                      <td className="name">{item.name}</td>
                      <td>{item.options}</td>
                      <td>{item.price}</td>
                      <td>{item.cost}</td>
                      <td>{item.stock}</td>
                      <td>
                        <button
                          type="button"
                          className="edit-btn me-2"
                          onClick={() => handleShow(item)}
                        >
                          <FaIcons.FaEdit className="icon-btn" /> Edit
                        </button>
                        <button
                          type="button"
                          className="remove-btn me-2"
                          onClick={() => handleRemove(item.id)}
                        >
                          <FaIcons.FaTrash className="icon-btn" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <Row className="text-end">
            <Col className="mb-3">
              <div className="total-entries">Total Entries: {totalEntries}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default App;
