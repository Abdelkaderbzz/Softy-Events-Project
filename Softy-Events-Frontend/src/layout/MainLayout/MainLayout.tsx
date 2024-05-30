import { useState, Suspense } from 'react'
import Sidebar from '@components/Sidebar/Sidebar'
import Navbar from '@components/Navbar/Navbar'
import Loader from '@src/components/Loader/Loader'
import useWindowSize from '../../hook/useWindowSize'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [collapseSidebar, setCollapseSidebar] = useState(false)
  const { width } = useWindowSize()
  return (
    <div className="main-layout">
      <div
        className={`main-layout-sidebar ${showSidebar ? 'main-layout-toggle-mobile-sidebar' : ''}`}
      >
        <Sidebar collapseSidebar={collapseSidebar} setShowSidebar={setShowSidebar} />
      </div>
      {showSidebar && width <= 1250 ? (
        <span onClick={() => setShowSidebar(false)} className="main-layout-shadow"></span>
      ) : null}

      <div className={`main-layout-content ${showSidebar ? 'main-layout-disable-events' : ''}`}>
        <div className="main-layout-navbar">
          <Navbar
            setShowSidebar={setShowSidebar}
            setCollapseSidebar={setCollapseSidebar}
            collapseSidebar={collapseSidebar}
          />
        </div>
        <div className="main-layout-outlet">
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
