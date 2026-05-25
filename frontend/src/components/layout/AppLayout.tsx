import AppSidebar from './AppSidebar'
import Navbar from './Navbar'

type AppLayoutProps = {
  children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0b1120] text-white">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout