import React from "react";
import { useSearch } from "../../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="input-group">
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control"
          type="search"
          placeholder="What plant are you loooking for?"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{
            minWidth: "600px",
            borderTopLeftRadius: "1rem",
            borderBottomLeftRadius: "1rem",
            outline: "none", // Remove blue border on focus
          }}
        />
        <button className="btn" type="submit">
          <FaSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
