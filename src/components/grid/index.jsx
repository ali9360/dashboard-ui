import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../assets/css/grid.css';
import Progress from 'components/progress';
import Widget from 'components/widget/Widget';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import { IoDocument, IoDocuments } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import CheckTable from 'views/admin/default/components/CheckTable';
import { useDispatch, useSelector } from 'react-redux';
import { componentAdded } from 'actions';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import MiniCalendar from 'components/calendar/MiniCalendar';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import { columnsDataComplex } from 'views/admin/default/variables/columnsData';
import Gantt from 'components/gantt';
import { selectedIndexChanged } from 'actions';
import { importState as importStateChanged, exportState as exportStateChanged } from 'actions';
import { fileError } from 'actions';

function Grid() {

  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch();
  const [comps, setComps] = useState([]);
  const { selectedIndex, exportState, importState } = useSelector(state => state);
  // const _dragStarted = event => {
  //   const grid = document.getElementsByClassName('react-grid-layout')[0];
  //   if(!grid) return;
  //   grid.classList.add('dragging');
  // }

  // const _dragStopped = event => {
  //     console.log('Drag stopped');
  // }
  useEffect(() => {
    if(!exportState) return;
    
    const components = JSON.stringify(comps);
    const blob = new Blob([components], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'components.json';
    link.href = url;
    link.click();


    dispatch(exportStateChanged(false));
  }, [exportState]);
  useEffect(() => {
    if(!importState) return;
    
    
    const btnFile = document.getElementById('file');
    if(btnFile.files.length === 0)
    {
      dispatch(fileError(true));
      return;
    }
    const file = btnFile.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const fileContents = e.target.result;
      setComps(JSON.parse(fileContents));
    }
    reader.readAsText(file);
    dispatch(importStateChanged(false));
  }, [importState]);
  const tableDataComplex = [
    {
      "name": "Marketplace",
      "status": "Approved",
      "date": "24.Jan.2021",
      "progress": 30
    },
    {
      "name": "Marketplace",
      "status": "Disable",
      "date": "30.Dec.2021",
      "progress": 30
    },
    {
      "name": "Marketplace",
      "status": "Error",
      "date": "20.May.2021",
      "progress": 30
    },
    {
      "name": "Marketplace",
      "status": "Approved",
      "date": "12.Jul.2021",
      "progress": 30
    },
    {
      "name": "Marketplace",
      "status": "Error",
      "date": "12.Jul.2021",
      "progress": 70
    }
  ]
  const _onDrop = (layout, layoutItem, _event) => {
    const tempComps = _.cloneDeep(comps);
    const itemType = _event.dataTransfer.getData('text/plain');
    layout.map(o => {
      if(o.i !== '__dropping-elem__'){
        const {x, y, h, w} = o;
        tempComps[o.i].origin = {x, y, h, w};
      }
      else{
        const {x, y} = o;
        const origin = { x, y };
        if(itemType === 'numbers'){
          origin.h = 2;
          origin.w = 3;
        }
        if(itemType === 'chart'){
          origin.h = 5;
          origin.w = 6;
        }
        if(itemType === 'simpledata'){
          origin.h = 8;
          origin.w = 6;
        }
        if(itemType === 'calender'){
          origin.h = 6;
          origin.w = 3;
        } 
        if(itemType === 'workload'){
          origin.h = 9;
          origin.w = 6;
        }
        if(itemType === 'gantt'){
          origin.h = 9;
          origin.w = 6;
        }
        tempComps[layout.length - 1] = {
          origin, component : itemType
        }
      }
    })
    setComps([...tempComps]);
  }
  const columnsDataCheck = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "PROGRESS",
      accessor: "progress",
    },
    {
      Header: "QUANTITY",
      accessor: "quantity",
    },
    {
      Header: "DATE",
      accessor: "date",
    },
  ];
  const tableDataCheck = [
    {
      "name": ["Marketplace", false],
      "quantity": 2458,
      "date": "Apr 26, 2022",
      "progress": 75.5
    },
    {
      "name": ["Venus DB PRO", true],
      "quantity": 1485,
      "date": "Jul 20, 2022",
      "progress": 35.4
    },
    {
      "name": ["Venus DS", true],
      "quantity": 1024,
      "date": "Sep 30, 2022",
      "progress": 25
    },
    {
      "name": ["Venus 3D Asset", true],
      "quantity": 858,
      "date": "Oct 24, 2022",
      "progress": 100
    },
    {
      "name": ["Marketplace", false],
      "quantity": 258,
      "date": "Nov 29, 2022",
      "progress": 75.5
    }
  ];

  const options = {
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    className: 'layout',
    rowHeight: 30,
    // width: 1200,
    margin: [10, 20],
    // onDragStart: _dragStarted,
    // onDragStop: _dragStopped,
    onDrop: _onDrop,
    isDroppable: true,
    useCSSTransforms: false,
    measureBeforeMount: true
  }
  const _handleSizing = layout => {
    const tempState = _.cloneDeep(comps);
    layout.map(l => {
      const {x, y, h, w} = l;
      tempState[l.i].origin = { x, y, h, w };
    })
    setComps(tempState);
  }
  return <>
    <ResponsiveGridLayout {...options} onResizeStop={_handleSizing} onDragStop={_handleSizing}>
      {
        comps.map((c, i) => {
          return <div key={i} data-grid={c.origin}>
              { c.component === 'numbers' ? <Widget icon={<MdBarChart className="h-7 w-7" />} title="Earnings" subtitle="$340.5" /> : null }
              { c.component === 'chart' ? <TotalSpent/> : null }
              { c.component === 'simpledata' ? <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> : null }
              { c.component === 'calender' ? <MiniCalendar /> : null }
              { c.component === 'workload' ? <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex}/> : null }
              { c.component === 'gantt' ? <Gantt /> : null }
          </div>
        })
      }
      {/* <div key="b" data-grid={{ x: 3, y: 0, w: 3, h: 2 }}>
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
      </div>
      <div key="c" data-grid={{ x: 6, y: 0, w: 3, h: 2 }}>
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
      </div>
      <div key="d" data-grid={{ x: 0, y: 1, w: 3, h: 2 }}>
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
      </div>
      <div key="e" data-grid={{ x: 3, y: 1, w: 3, h: 2 }}>
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
      </div>
      <div key="f" data-grid={{ x: 6, y: 1, w: 3, h: 2 }}>
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        />
      </div>
      <div key={'g'} data-grid={{ x: 0, y: 2, w: 4, h: 5 }}>
        <TotalSpent />
      </div>
      <div key={'h'} data-grid={{ x: 4, y: 2, w: 5, h: 5 }}>
        <WeeklyRevenue />
      </div>
      <div key={'i'} data-grid={{ x: 5, y: 4, w: 5, h: 5 }}>
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>
      </div> */}
    </ResponsiveGridLayout>
  </>
}
export default Grid;