# Data Grapher (https://akash-data-grapher.vercel.app/)

## Overview

Data Grapher is a web application built with ReactJS, Plotly.js, React-Table, Redux Toolkit, and Vite. It allows users to visualize data through a Data Table and Bar Chart. Users can select rows from the table to filter the data displayed in the bar chart. The app supports pagination and retrieves data from an API using dummy JSON.

## Screenshot
<img width="845" alt="image" src="https://github.com/AKASH-PRASAD7/DataGrapher/assets/110546856/d506bf52-eb41-4391-bfd8-00df397aac3e">

## Features

1. **Data Table:**

   - Displays a table with product information.
   - Users can select rows to filter the data in the bar chart.

2. **Bar Chart Visualization:**

   - Presents a bar chart based on the selected rows from the data table.
   - Users can visualize data for the selected products.

3. **Product Search:**

   - Users can search for specific products to filter the data in both the table and the bar chart.

4. **Pagination:**
   - Implements pagination for the data table to handle large datasets.

## Technologies Used

- **ReactJS:** For building the user interface components.
- **Plotly.js:** For creating interactive and responsive bar charts.
- **React-Table:** For displaying and managing the data table.
- **Redux Toolkit:** For state management.
- **Vite:** As the build tool for fast development.

## Installation Guide

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AKASH-PRASAD7/DataGrapher.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd data-grapher
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Application:**

   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Visit `http://localhost:5173` in your browser to use the Data Grapher .

## Usage

1. **View Data Table:**

   - Explore the product information in the data table.

2. **Select Rows:**

   - Click on rows in the table to select specific products.

3. **Bar Chart Visualization:**

   - The bar chart will dynamically update based on the selected rows.

4. **Product Search:**

   - Use the search bar to find and filter specific products.

5. **Pagination:**
   - Navigate through different pages in the data table.
