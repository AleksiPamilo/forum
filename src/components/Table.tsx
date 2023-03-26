import React from "react";
import Button from "./Button";

type TableProps = {
    headers: string[] | JSX.Element[];
    rows: (string | JSX.Element | undefined)[][];
    showRowsFrom?: number;
    showRowsTo?: number;
    showRowsAmount?: number;
}
const Table: React.FC<TableProps> = ({ headers, rows, showRowsFrom = 0, showRowsTo = 5, showRowsAmount = 5 }) => {
    const [showRowsFromState, setShowRowsFromState] = React.useState(showRowsFrom);
    const [showRowsToState, setShowRowsToState] = React.useState(showRowsTo);
    const rowsToDisplay = rows.slice(showRowsFromState, showRowsToState);

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
                        rowsToDisplay.map((row, index) => (
                            <tr key={index} className="bg-zinc-100 hover:bg-zinc-200 hover:dark:bg-zinc-800 dark:bg-dark-secondary text-black dark:text-white" style={{ display: index >= showRowsFrom && index < showRowsTo ? "table-row" : "none" }}>
                                {
                                    row.map((cell, index) => (
                                        <td key={index} className="px-4 py-2 border-y border-zinc-300 dark:border-zinc-900">{cell}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="flex max-sm:flex-col items-center justify-between p-4">
                <p>Showing rows {showRowsFromState} ─ {rows.length < showRowsToState ? rows.length : showRowsToState}, Total {rows.length}</p>

                <div className="flex flex-row gap-2 justify-center mt-2">
                    <Button onClick={() => {
                        if (showRowsFromState <= 0) return;
                        setShowRowsFromState(showRowsFromState - showRowsAmount);
                        setShowRowsToState(showRowsToState - showRowsAmount);
                    }} styles={`${showRowsFromState <= 0 && "hover:cursor-not-allowed"} px-4 py-2 bg-light-primary dark:bg-dark-primary text-black dark:text-white rounded-md`}>Previous</Button>
                    <Button onClick={() => {
                        if (showRowsToState >= rows.length) return;
                        setShowRowsFromState(showRowsFromState + showRowsAmount);
                        setShowRowsToState(showRowsToState + showRowsAmount);
                    }} styles={`${showRowsToState >= rows.length && "hover:cursor-not-allowed"} px-4 py-2 bg-light-primary dark:bg-dark-primary text-black dark:text-white rounded-md`}>Next</Button>
                </div>
            </div>
        </div>
    )
}

export default Table;
