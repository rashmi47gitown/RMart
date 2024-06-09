import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory(); // Call useCategory to get the categories array
  return (
    <Layout title={"All Categories"}>
      <div className="row">
        {categories.map((category) => (
          <div
            className="col-md-6 mt-5 mb-3 gx-3 gy-3 text-light"
            key={category.id}
          >
            <button className="btn btn-primary text-light">
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
