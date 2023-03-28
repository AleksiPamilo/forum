import React from "react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import Button from "./Button";

type TableProps = {
    headers: string[] | JSX.Element[];
    rows: (string | JSX.Element | undefined)[][];
    rowsPerPage?: number,
}

const Table: React.FC<TableProps> = ({ headers, rows, rowsPerPage = 5 }) => {
    const [rowsPerPageState, setRowsPerPageState] = React.useState(rowsPerPage);
    const [pageState, setPageState] = React.useState(1);

    const calculatePageAmount = (rows: TableProps["rows"], rowsPerPage: number) => {
        const range = [];
        const num = Math.ceil(rows.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    }

    const pageAmount = calculatePageAmount(rows, rowsPerPageState).length;
    const data = rows.slice((pageState - 1) * rowsPerPageState, pageState * rowsPerPageState);
    const handlePageChange = (page: number) => {
        setPageState(page);
    }

    const handleRowsPerPageChange = (rowsPerPage: number) => {
        if (pageAmount < pageState) {
            setPageState(pageAmount);
        }
        setRowsPerPageState(rowsPerPage);
    }

    return (
        <div className="flex flex-col min-w-full rounded-md overflow-hidden bg-zinc-100 dark:bg-dark-secondary">
            <table className="min-w-full text-center">
                <thead className="">
                    <tr className="first:rounded-tl-md last:rounded-tr-md bg-zinc-300 dark:bg-zinc-900 text-black dark:text-white">
                        {
                            headers.map((header, index) => (
                                <th key={index} className="px-4 py-2">{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, index) => (
                            <tr key={index} className="bg-zinc-100 hover:bg-zinc-200 hover:dark:bg-zinc-800 dark:bg-dark-secondary text-black dark:text-white">
                                {
                                    row.map((cell, i) => (
                                        <td key={i + index} className="px-4 py-2 border-y border-zinc-300 dark:border-zinc-900">{cell}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="flex max-sm:flex-col items-center justify-between p-4">
                <div className="flex items-center">
                    <p>Showing rows {pageState === 1 ? 1 : (pageState - 1) * rowsPerPageState + 1} ─ {pageState === pageAmount ? rows.length : pageState * rowsPerPageState}, Total {rows.length}</p>
                    <select className="ml-2 rounded-md p-1 dark:bg-zinc-800" name="rowsPerPage" id="rowsPerPage" onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="flex flex-row gap-2 justify-center mt-2">
                    <Button onClick={() => {
                        if (pageState > 1) {
                            handlePageChange(pageState - 1);
                        }
                    }} disabled={pageState === 1} styles="h-10 px-4 py-2 bg-light-primary dark:bg-dark-primary text-black dark:text-white rounded-md"><AiOutlineCaretLeft /></Button>
                    {
                        calculatePageAmount(rows, rowsPerPageState).map((page, index) => {
                            if (page === pageState) {
                                return <Button key={index} onClick={() => handlePageChange(page)} styles="h-10 px-4 py-2 bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white rounded-md">{page}</Button>
                            } else if (page === pageState - 1 || page === pageState + 1) {
                                return <Button key={index} onClick={() => handlePageChange(page)} styles="h-10 px-4 py-2 bg-light-primary dark:bg-dark-primary text-black dark:text-white rounded-md">{page}</Button>
                            } else if (page === pageState - 2 || page === pageState + 2) {
                                return <Button key={index} onClick={() => handlePageChange(page)} styles="h-10 px-4 py-2 bg-light-primary dark:bg-dark-primary text-black dark:text-white rounded-md hidden md:block">...</Button>
                            } else return null;
                        })
                    }
                    <Button onClick={() => {
                        if (pageState < pageAmount) {
                            handlePageChange(pageState + 1);
                        }
                    }} disabled={pageState === pageAmount} styles="h-10 px-4 py-2 bg-light-primary dark:bg-dark-primary text-black dark:text-white rounded-md"><AiOutlineCaretRight /></Button>
                </div>
            </div>
        </div>
    )
}

export default Table;
