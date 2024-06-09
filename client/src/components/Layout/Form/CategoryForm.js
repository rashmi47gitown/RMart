// import React from "react";

// const CategoryForm = ({ handleSubmit, value, setValue }) => {
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             className="form-control"
//             placeholder="Enter new category"
//             type="text"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };

// export default CategoryForm;

import React, { useState } from "react";

const CategoryForm = ({ handleSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(value);
    setValue(""); // Clear input after submission
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryInput">Enter new category:</label>
          <input
            id="categoryInput"
            className="form-control"
            placeholder="Enter new category"
            type="text"
            value={value}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
