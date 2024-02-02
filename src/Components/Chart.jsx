import React from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";

const Chart = () => {
  const { selectedProduct } = useSelector((state) => state.products);

  return (
    <>
      <section className="flex justify-center items-center flex-col">
        <Plot
          data={[
            {
              type: "bar",
              x: selectedProduct.map((product) => product.Title),
              y: selectedProduct.map((product) => product.Price),
              marker: { color: "lime" },
            },
          ]}
          layout={{
            title: "Product Prices",
            plot_bgcolor: "black",
            paper_bgcolor: "#262427",
            font: {
              color: "white",
              size: 12,
            },
          }}
        />
        <p className="text-xl text-center font-semibold text-lime-500  m-4">
          {selectedProduct.length === 0 && "Select some Products to see Chart"}
        </p>
      </section>
    </>
  );
};

export default Chart;
