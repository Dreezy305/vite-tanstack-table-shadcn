import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./App.css";
import { generatePeople } from "./data/data";

function App() {
  const people = generatePeople(200);
  console.log(people, "people");

  return (
    <div className="">
      <h1 className="text-white text-3xl text-center">TANSATCK TABLE</h1>
    </div>
  );
}

export default App;

//  https://tanstack.com/table/latest/docs/framework/react/examples/pagination
