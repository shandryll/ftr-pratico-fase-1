import { CreateLink } from "./components/CreateLink"
import { Header } from "./components/Header"
import { MyLinks } from "./components/MyLinks"

export function App() {
  return (
    <div className="max-w-7xl max-auto">
      <Header />
      <CreateLink />
      <MyLinks />
    </div>
  )
}

export default App
