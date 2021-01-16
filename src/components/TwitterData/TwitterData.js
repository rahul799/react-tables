import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TwitterData = () => {
  const columnHeaderData = [
    {
      Header: "ACCOUNT",
      accessor: "account", // accessor is the "key" in the data
    },
    {
      Header: "FOLLOWERS",
      accessor: "followers",
    },
    {
      Header: "EXCLUSIVE FOLLOWERS",
      accessor: "exclusive",
    },
  ];

  const columns = useMemo(() => columnHeaderData, []);

  const columnMainData = [
    {
      account: "@marwilliamson",
      followers: 2610335,
      exclusive: 74.8,
    },
    {
      account: "@KamalaHarris",
      followers: 9254423,
      exclusive: 54.8,
    },
    {
      account: "@SenGilli",
      followers: 6435352,
      exclusive: 43.6,
    },
    {
      account: "@Trumph",
      followers: 2984951,
      exclusive: 12.5,
    },
    {
      account: "@JoeBiden",
      followers: 7473324,
      exclusive: 82.1,
    },
    {
      account: "@amyKlob",
      followers: 7864265,
      exclusive: 77.8,
    },
  ];

  const chartOptions = {
    title: {
      text: "Twitter Account Data",
    },
    chart: {
      type: "",
    },
    series: [
      {
        data: [74.8,54.8,43.6,12.5,82.1,77.8],
      },
    ],
  };

  const data = useMemo(() => columnMainData, []);

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
                      if (
                        data.account.toLowerCase() === userName.toLowerCase()
                      ) {
                        selectedDataIndex = index;
                      }
                    });
                    setSelectedDataIndex(selectedDataIndex);
                  }}
                >
                  {row.cells.map((cell) => (
                    <td className={`p-2 cell`} {...cell.getCellProps()}>
                      {cell.column.Header === "EXCLUSIVE FOLLOWERS" ? (
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                            role="progressbar"
                            style={{ width: `${cell.value}%` }}
                            aria-valuenow={cell.value}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {cell.value}%
                          </div>
                        </div>
                      ) : cell.column.Header === "FOLLOWERS" ? (
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                            role="progressbar"
                            style={{
                              width: `${(cell.value / 10000000) * 100}%`,
                            }}
                            aria-valuenow={(cell.value / 10000000) * 100}
                            aria-valuemin="0"
                            aria-valuemax="10000000"
                          >
                            {cell.value}
                          </div>
                        </div>
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
                  <b>{columnMainData[selectedDataIndex]?.account}</b> has{" "}
                  <b>{columnMainData[selectedDataIndex]?.followers}</b> on the
                  twitter
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterData;
