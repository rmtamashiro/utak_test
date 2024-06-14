import { Card, Col } from "react-bootstrap";
import { IconType } from "react-icons";
import * as FaIcons from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

type CategoryIconMap = {
  [key: string]: IconType;
};

const categoryIconMap: CategoryIconMap = {
  burger: FaIcons.FaHamburger,
  pizza: FaIcons.FaPizzaSlice,
  hotdog: FaIcons.FaHotdog,
  salad: FaIcons.FaLeaf,
  chicken: FaIcons.FaDrumstickBite,
  meatballs: FaIcons.FaCloudMeatball,
};

interface CategoryCardProps {
  category: string;
  count: number;
  items: { name: string }[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, count }) => {
  const IconComponent = categoryIconMap[category.toLowerCase()];

  return (
    <Col className="py-3" md={3}>
      <h6 className="card-header mb-2">{category}</h6>
      <Card className="category-card mb-3">
        <Card.Body>
          <Card.Title className="category-title">
            {IconComponent && <IconComponent className="category-icon" />}
          </Card.Title>
          <div className="item">
            <p className="item-name">Total Count: {count}</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CategoryCard;
