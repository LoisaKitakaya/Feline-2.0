import { useQuery } from "@apollo/client";
import { PRODUCT_SUB_CATEGORY } from "../../schema";

// eslint-disable-next-line react/prop-types
const ProductSubCategory = ({ parent, setChild }) => {
  const { data, error } = useQuery(PRODUCT_SUB_CATEGORY, {
    variables: { parent: parent },
  });

  if (error) {
    console.log(`${error.message}`);
  }

  return (
    <div className="mb-4">
      <label className="block">
        <span>Sub category</span>
        <select
          name="sub_category"
          className="mt-1 block w-full rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setChild(e.target.value)}
        >
          <option selected>Select a sub-category</option>
          {data &&
            data.getProductSubCategory.map((subCategory) => {
              const options = (
                <>
                  <option
                    key={subCategory.id}
                    value={subCategory.category_name}
                  >
                    {subCategory.category_name}
                  </option>
                </>
              );

              return options;
            })}
        </select>
      </label>
    </div>
  );
};

export default ProductSubCategory;
