import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { Item } from "../App";
import "../App.css";

interface ItemModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  currentItem: Item;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const categories = [
  { value: "Burger", label: "Burger" },
  { value: "Pizza", label: "Pizza" },
  { value: "Hotdog", label: "Hotdog" },
  { value: "Chicken", label: "Chicken" },
  { value: "Meatballs", label: "Meatballs" },
];

const ItemModal: React.FC<ItemModalProps> = ({
  show,
  handleClose,
  handleSave,
  currentItem,
  handleChange,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{currentItem.id ? "Edit Item" : "Add Item"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Select
                className="select-dropdown"
                placeholder="Select..."
                name="category"
                value={categories.find(
                  (cat) => cat.value === currentItem.category
                )}
                onChange={(selectedOption) =>
                  handleChange({
                    target: {
                      name: "category",
                      value: selectedOption?.value ?? "",
                    },
                  } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
                }
                options={categories}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOptions">
              <Form.Label>Options</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Options"
                name="options"
                value={currentItem.options}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Separate options with commas (e.g., Small, Medium, Large)
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentItem.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCost">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type="number"
                  name="cost"
                  value={currentItem.cost}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formStock">
                <Form.Label>Stock Qty.</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={currentItem.stock}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="close-btn" onClick={handleClose}>
          Close
        </button>
        <button type="button" className="add-save-btn" onClick={handleSave}>
          {currentItem.id ? "Save Changes" : "Add Item"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
