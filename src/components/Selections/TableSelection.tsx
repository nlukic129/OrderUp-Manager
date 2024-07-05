import { ITable } from "types/venueType";

interface ITablesSelection {
  tables: ITable[];
  selectedTablesIds: string[];
  setSelectedTablesIds: (selectedTablesIds: string[]) => void;
}

const TableSelection = ({ tables, selectedTablesIds, setSelectedTablesIds }: ITablesSelection) => {
  const checkIsTableSelected = (tableId: string) => {
    return selectedTablesIds.includes(tableId);
  };

  const toggleTable = (tableId: string) => {
    if (selectedTablesIds.includes(tableId)) {
      setSelectedTablesIds(selectedTablesIds.filter((id) => id !== tableId));
    } else {
      setSelectedTablesIds([...selectedTablesIds, tableId]);
    }
  };

  return (
    <div className="grid gap-4 grid-cols-2 mt-5 pb-10 sm:grid-cols-3 lg:grid-cols-4 md:w-4/5">
      {tables.map((table, index) => (
        <div className={checkIsTableSelected(table.id) ? "tableBoxSelected" : "tableBoxUnselected"} onClick={() => toggleTable(table.id)} key={index}>
          <p>{table.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TableSelection;
