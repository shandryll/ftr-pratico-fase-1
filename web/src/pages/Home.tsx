import { CreateLink } from "../components/CreateLink";
import { Header } from "../components/Header";
import { MyLinks } from "../components/MyLinks";

export function Home() {
  return (
    <>
      <Header />

      <div className="flex flex-row justify-between">
        <CreateLink />
        <MyLinks />
      </div>
    </>
  )
}
