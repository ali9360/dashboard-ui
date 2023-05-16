// /* eslint-disable */

// import { HiX } from "react-icons/hi";
// import Links from "./components/Links";

// import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
// import routes from "routes.js";

// const Sidebar = ({ open, onClose }) => {
//   return (
//     <div
//       className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
//         open ? "translate-x-0" : "-translate-x-96"
//       }`}
//     >
//       <span
//         className="absolute top-4 right-4 block cursor-pointer xl:hidden"
//         onClick={onClose}
//       >
//         {/* <HiX /> */}
//       </span>

//       <div className={`mx-[56px] mt-[50px] flex items-center`}>
//         <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
//           Horizon <span class="font-medium">FREE</span>
//         </div>
//       </div>
//       <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

//       <ul className="mb-auto pt-1">
//         <Links routes={routes} />
//       </ul>
//       <div className="flex justify-center">
//         <SidebarCard />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
  Alert
} from "@material-tailwind/react";
import { currentlyDragging } from "actions";
import { MdDragIndicator, MdCalendarToday, MdOutlineLooksOne, MdBarChart, MdReceipt } from 'react-icons/md'
import {BiBarChartSquare, BiNews, BiGitMerge, BiBriefcase} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { exportState } from "actions";
import { importState } from "actions";


export default function Sidebar() {
  const dispatch = useDispatch();
  const {fileError} = useSelector(state => state);
  const _onDragStart = event => {
    event.dataTransfer.setData("text/plain",event.target.id);
    dispatch(currentlyDragging(event.target.id));
  }
  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[19rem] p-4 shadow-xl shadow-blue-gray-900/5" style={{overflowY: 'scroll'}}>
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">Components</Typography>
      </div>
      <List>
        <ListItem>
          <div className="droppable-element" draggable={true} unselectable="on" id="chart" onDragStart={_onDragStart}>
            <div className="list-droppable-item">
              <MdDragIndicator size={20}/>
              <span className="draggable-text"> <BiBarChartSquare size={20}/>Chart</span>
            </div>
          </div>
        </ListItem>
        <ListItem>
          <div className="droppable-element" id="simpledata" draggable={true} unselectable="on" onDragStart={_onDragStart}>
            <div className="list-droppable-item">
              <MdDragIndicator size={20}/>
              <span className="draggable-text"><BiNews size={20}/> Simple Data</span>
            </div>
          </div>
        </ListItem>
        <ListItem>
          <div className="droppable-element" id="numbers" draggable={true} unselectable="on" onDragStart={_onDragStart}>
            <div className="list-droppable-item">
              <MdDragIndicator size={20}/>
              <span className="draggable-text"><MdOutlineLooksOne size={20} /> Numbers</span>
            </div>
          </div>
        </ListItem>
        <ListItem>
          <div className="droppable-element" id="calender" draggable={true} unselectable="on" onDragStart={_onDragStart}>
            <div className="list-droppable-item">
              <MdDragIndicator size={20}/>
              <span className="draggable-text"><MdCalendarToday size={20}/>Calender</span>
            </div>
          </div>
        </ListItem>
        <ListItem>
          <div className="droppable-element" id="gantt" draggable={true} unselectable="on" onDragStart={_onDragStart}>
            <div className="list-droppable-item">
              <MdDragIndicator size={20}/>
              <span className="draggable-text"><BiGitMerge size={20} /> Gantt</span>
            </div>
          </div>
        </ListItem>
        <ListItem>
          <div className="droppable-element" id="workload" draggable={true} unselectable="on" onDragStart={_onDragStart}>
            <div className="list-droppable-item">
              <MdDragIndicator size={20}/>
              <span className="draggable-text"><BiBriefcase size={20} /> Workload</span>
            </div>
          </div>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Button fullWidth onClick={() => dispatch(exportState(true))}>Export State</Button>
        </ListItem>
        {fileError && <ListItem>
          <Alert color="red">Please select backup file.</Alert>
        </ListItem>}
        <ListItem>
          <input accept='.json' type="file" id="file" />
        </ListItem>
        <ListItem>
          <Button fullWidth variant="outlined" onClick={() => dispatch(importState(true))} >Import State</Button>
        </ListItem>
      </List>
    </Card>
  );
}