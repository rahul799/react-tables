import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WorldCupData = () => {
  const columnHeaderData = [
    {
      Header: "TEAM",
      accessor: "team", // accessor is the "key" in the data
    },
    {
      Header: "GROUP",
      accessor: "group",
    },
    {
      Header: "SPI",
      accessor: "spi",
    },
    {
      Header: "OFF.",
      accessor: "off",
    },
    {
      Header: "DEF.",
      accessor: "def",
    },
    {
      Header: "MAKE ROUND OF 16",
      accessor: "ro16",
    },
    {
      Header: "MAKE QTR-FINALS",
      accessor: "qf",
    },
    {
      Header: "MAKE SEMIFINALS",
      accessor: "sf",
    },
    {
      Header: "WIN WORLD CUP",
      accessor: "win",
    },
  ];

  const columns = useMemo(() => columnHeaderData, []);

  const columnMainData = [
    {
      team: "Argentina",
      group: "D",
      spi: 98.3,
      off: 1.5,
      def: 1.4,
      ro16: 1,
      qf: "78.4%",
      sf: "42.1%",
      win: "19.4%",
    },
    {
      team: "New York",
      group: "A",
      spi: 78.3,
      off: 2.5,
      def: 1.1,
      ro16: 0.98,
      qf: "68.4%",
      sf: "32.1%",
      win: "39.4%",
    },
    {
      team: "Australia",
      group: "D",
      spi: 80.3,
      off: 2.1,
      def: 2.2,
      ro16: 0.13,
      qf: "58.4%",
      sf: "32.1%",
      win: "8.4%",
    },
    {
      team: "USA",
      group: "B",
      spi: 98.3,
      off: 1.5,
      def: 1.9,
      ro16: 0.44,
      qf: "38.4%",
      sf: "55.1%",
      win: "55.4%",
    },
    {
      team: "Arezona",
      group: "C",
      spi: 58.3,
      off: 1.5,
      def: 1.9,
      ro16: 0.39,
      qf: "78.4%",
      sf: "42.1%",
      win: "19.4%",
    },
    {
      team: "Alask",
      group: "A",
      spi: 78.3,
      off: 9.8,
      def: 0.9,
      ro16: 9.98,
      qf: "68.4%",
      sf: "11.2%",
      win: "35.4%",
    },
  ];

  const data = React.useMemo(() => columnMainData, []);

  const chartOptions = {
    title: {
      text: "World Cup Data",
    },
    chart: {
      type: "",
    },
    series: [
      {
        data: [19.4,39.4,8.4,55.4,19.4,35.4],
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
                    console.log(userName);
                    let selectedDataIndex = -1;
                    columnMainData.forEach((data, index) => {
                      if (data.team.toLowerCase() === userName.toLowerCase()) {
                        selectedDataIndex = index;
                      }
                    });
                    setSelectedDataIndex(selectedDataIndex);
                  }}
                >
                  {row.cells.map((cell) => (
                    <td
                      className={`p-2 cell ${
                        cell.column.Header === "MAKE ROUND OF 16"
                          ? "bg-info"
                          : ""
                      }`}
                      {...cell.getCellProps()}
                    >
                      {cell.column.Header === "OFF." ||
                      cell.column.Header === "DEF." ? (
                        <span
                          className={`bg-circle ${
                            cell.column.Header === "OFF."
                              ? "bg-info"
                              : "bg-danger"
                          }`}
                        >
                          {cell.render("Cell")}
                        </span>
                      ) : (
                        cell.render("Cell")
                      )}
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
                  <b>{columnMainData[selectedDataIndex]?.team}</b> has{" "}
                  <b>{columnMainData[selectedDataIndex]?.win}</b> chances of
                  winning world cup
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldCupData;
