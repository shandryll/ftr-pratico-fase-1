import { Link } from "lucide-react";
import * as ScrollArea from "@radix-ui/react-scroll-area"
import ButtonCSV from "./ui/ButtonCSV";
import { LinkCard } from "./commons/LinkCard";

interface Links {
  originalLink: string,
  shortenedLink: string
}

export function MyLinks() {
  const myLinksList: Links[] = []

  const isMyLinkListEmpty = myLinksList.length === 1

  return (
    <div className='bg-gray-100 flex flex-col p-[2rem] rounded-xl w-[580px] h-[234px] max-h-[396px]'>

      <div className="mb-[20px] flex flex-row justify-between">
        <h1 className="text-lg text-gray-600 font-bold">Meus links</h1>
        <ButtonCSV disabled={isMyLinkListEmpty ? true : false}>Baixar CSV</ButtonCSV>
      </div>

      <ScrollArea.Root type="scroll" className="overflow-hidden">
        <ScrollArea.Viewport className="h-[396px]" >
          {isMyLinkListEmpty ? (
            <div className="flex flex-col w-[516px] border-t border-gray-200">
              <div className="flex flex-col items-center justify-center mt-10">
                <Link size={32} className="text-gray-400" />
                <span className="text-xs text-gray-500 uppercase mt-3">ainda não existem links cadastrados</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <LinkCard />
              <LinkCard />
              <LinkCard />
              <LinkCard />
              <LinkCard />
              <LinkCard />
              <LinkCard />
              <LinkCard />
              <LinkCard />
            </div>
          )}

        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-gray-100 p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

    </div >
  )
}