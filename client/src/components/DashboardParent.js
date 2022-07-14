import{useState}from 'react'
import { Outlet } from 'react-router-dom';
import RefreshTopBarContext from '../contexts/RefreshTopBarContext';

function DashboardParent() {
  const [refreshView,setRefreshView] = useState(false);
  return (
    <RefreshTopBarContext.Provider value={{refreshView,setRefreshView}}>
      <Outlet></Outlet>
    </RefreshTopBarContext.Provider>
  )
}

export default DashboardParent