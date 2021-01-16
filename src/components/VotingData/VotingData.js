import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const VotingData = () => {
  const columnHeaderData = [
    {
      Header: "STATE",
      accessor: "state", // accessor is the "key" in the data
    },
    {
      Header: "VOTES",
      accessor: "votes",
    },
    {
      Header: "PERCENTAGE",
      accessor: "percentage",
    },
  ];

  const columns = useMemo(() => columnHeaderData, []);

  const columnMainData = [
    {
      state: "USA",
      votes: 4242343,
      percentage: 70.7,
    },
    {
      state: "Alaska",
      votes: 318608,
      percentage: 51.3,
    },
    {
      state: "Arizona",
      votes: 2573165,
      percentage: 48.7,
    },
    {
      state: "California",
      votes: 14181595,
      percentage: 31.6,
    },
    {
      state: "Florida",
      votes: 9420039,
      percentage: 49.0,
    },
    {
      state: "Nebraska",
      votes: 844227,
      percentage: 58.7,
    },
    {
      state: "Tennnessee",
      votes: 2508027,
      percentage: 60.7,
    },
  ];

  const data = React.useMemo(() => columnMainData, []);

  const chartOptions = {
    title: {
      text: "Voting Data",
    },
    chart: {
      type: "",
    },
    series: [
      {
        data: [70.7,51.3,48.7,31.6,49],
      },
    ],
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const [selectedDataIndex, setSelectedDataIndex] = useState(0);

  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-7">
        <table className="table table-striped" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="head-cell"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onMouseOver={(e) => {
                    const tr = e.target.parentElement;
                    const userName = tr.children[0].innerHTML;
                    let selectedDataIndex = -1;
                    columnMainData.forEach((data, index) => {
                      if (data.state.toLowerCase() === userName.toLowerCase()) {
                        selectedDataIndex = index;
                      }
                    });
                    setSelectedDataIndex(selectedDataIndex);
                  }}
                >
                  {row.cells.map((cell) => (
                    <td
                      className={`p-2 cell ${
                        cell.column.Header === "PERCENTAGE" && cell.value > 50
                          ? "bg-50"
                          : ""
                      }`}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-12 col-sm-6 col-md-5">
        <div className="row h-100">
          <div className="col-12 col-lg-6">
            <div>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="d-flex h-100 justify-content-center align-items-center">
              {!!(selectedDataIndex + 1) && (
                <p>
                  Republicians recieved{" "}
                  <b>{columnMainData[selectedDataIndex]?.percentage} %</b> votes{" "}
                  in <b>{columnMainData[selectedDataIndex]?.state}</b>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingData;
