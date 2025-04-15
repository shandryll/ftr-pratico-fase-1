import { CreateLink } from "./components/CreateLink"
import { Header } from "./components/Header"
import { MyLinks } from "./components/MyLinks"

export function App() {
  return (
    <main className="max-w-7xl mx-auto">
      <Header />

      <div className="flex flex-row justify-between">
        <CreateLink />
        <MyLinks />
      </div>
    </main>
  )
}

export default App
