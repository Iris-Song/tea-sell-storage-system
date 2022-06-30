/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";
import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { TableHead } from "@mui/material";
import { TableCell } from "@mui/material";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiAvatar from "components/SuiAvatar";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

import TablePaginationActions from "../tablePagination";

function Table(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const [request, setRequest] = useState({ rows: props.rows, columns: props.columns });

  useEffect(async () => {
    // const res = await axios.get("xxx");
    setRequest({ rows: props.rows, columns: props.columns });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const renderColumns = props.columns.map(({ name, align, width }, key) => {
  //   let pl;
  //   let pr;

  //   if (key === 0) {
  //     pl = 3;
  //     pr = 3;
  //   } else if (key === props.columns.length - 1) {
  //     pl = 3;
  //     pr = 3;
  //   } else {
  //     pl = 1;
  //     pr = 1;
  //   }

  //   return (
  //     <SuiBox
  //       key={name}
  //       component="th"
  //       width={width || "auto"}
  //       pt={1.5}
  //       pb={1.25}
  //       pl={align === "left" ? pl : 3}
  //       pr={align === "right" ? pr : 3}
  //       textAlign={align}
  //       fontSize={size.xxs}
  //       fontWeight={fontWeightBold}
  //       color="secondary"
  //       opacity={0.7}
  //       borderBottom={`${borderWidth[1]} solid ${light.main}`}
  //     >
  //       {name.toUpperCase()}
  //     </SuiBox>
  //   );
  // });

  const renderRows = (rowsPerPage > 0
    ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : props.rows
  ).map((row, key) => {
    const rowKey = `row-${key}`;
    const tableRow = props.columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SuiBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <SuiBox mr={2}>
                <SuiAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </SuiBox>
              <SuiTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        );
      } else {
        template = (
          <SuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SuiTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </SuiTypography>
          </SuiBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return (
    <>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 500 }} aria-label="pagination table">
          <SuiBox component="thead">
            <TableRow>
              {props.columns.map((column) => (
                <TableCell
                  key={column.name}
                  align={column.align}
                >
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </SuiBox>
          <TableBody>
            {renderRows}
            {/* {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.price}
                                </TableCell>
                                <TableCell align="center">
                                    {row.remain}
                                </TableCell >
                                <TableCell align="center">
                                    {row.spot}
                                </TableCell >
                                <TableCell align="center">
                                    <Button onClick={() => { handleModify(row) }}>修改</Button>
                                    <Button onClick={() => { handleDelete(row.name) }}>删除</Button>
                                </TableCell>
                            </TableRow>
                        ))} */}

            {/* {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={10}
              colSpan={props.columns.length}
              labelRowsPerPage={'每页记录数量'}
              sx={{ width: 1 / 4 }}
              count={props.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                autoWidth: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableFooter>
        </MuiTable>
      </TableContainer>
    </>
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
