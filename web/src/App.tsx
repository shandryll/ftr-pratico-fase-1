import { Home } from "./pages/Home"
import { LinkNotFound } from "./pages/LinkNotFound"
import { LinkRedirect } from "./pages/LinkRedirect"

export function App() {
  return (
    <main className="max-w-7xl mx-auto px-28">
      {/* <Home /> */}
      {/* <LinkRedirect /> */}
      <LinkNotFound />
    </main>
  )
}

export default App
