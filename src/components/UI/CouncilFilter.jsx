import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react"

function CouncilFilter({councilsData, selectedCouncilIds, setSelectedCouncilIds}){
  return (
    <Listbox value={selectedCouncilIds} onChange={setSelectedCouncilIds} multiple>
      <div className="relative">
        <ListboxButton className="rounded-lg border border-border px-3 py-2">
          Filters {selectedCouncilIds.length > 0 && `(${selectedCouncilIds.length})`}
        </ListboxButton>

        <ListboxOptions className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-background shadow-lg p-2 z-50">
        {councilsData.map((council) => (
          <ListboxOption
            key={council.council_id}
            value={council.council_id}
            className="cursor-pointer rounded-md px-2 py-1 text-sm data-[active]:bg-primary/10"
          >
            {({ selected }) => (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
                  onClick={(e) => e.preventDefault()}
                />
                <span className={selected ? "font-medium" : ""}>{council.name}</span>
              </div>
            )}
          </ListboxOption>
        ))}
        </ListboxOptions>
      </div>
    </Listbox>
    )
}

export default CouncilFilter