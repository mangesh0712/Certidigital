import React from "react";
import { CSVLink } from "react-csv";

function generateCSVData() {
  // Your logic to generate the CSV data goes here
  const csvData = [
    ["Name", "Email", "Phone"],
    ["John Doe", "johndoe@example.com", "555-1234"],
    ["Jane Smith", "janesmith@example.com", "555-5678"],
  ];
  return csvData;
}

function CSVDemo() {
  return (
    <CSVLink data={generateCSVData()} filename="CSVDemo.csv">
      Download CSV
    </CSVLink>
  );
}

export default CSVDemo;
