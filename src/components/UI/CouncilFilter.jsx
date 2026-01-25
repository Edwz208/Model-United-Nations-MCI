import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react"

function CouncilFilter({councilsData = [], selectedCouncilIds =[], setSelectedCouncilIds, isError, isLoading}){

  return (
    <Listbox value={selectedCouncilIds} onChange={setSelectedCouncilIds} multiple>
      <div className="relative">
        <ListboxButton className="rounded-lg border border-border px-3 py-2">
          Filters {selectedCouncilIds.length > 0 && `(${selectedCouncilIds.length})`}
        </ListboxButton>
        <ListboxOptions className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-background shadow-lg p-2 z-50">
          {isError && (
            <div className="px-2 py-2 text-sm text-red-600">
              Failed to load councils
            </div>
          )}

          {!isError && isLoading && (
            <div className="px-2 py-2 text-sm opacity-70">
              Loading councils...
            </div>
          )}

          {!isError && !isLoading && councilsData.length === 0 && (
            <div className="px-2 py-2 text-sm opacity-70">
              No councils available
            </div>
          )}
        {(!isError && !isLoading) && councilsData.map((council) => (
          <ListboxOption
            key={council.council_id}
            value={council.council_id}
            className="cursor-pointer rounded-md px-2 py-1 text-sm data-active:bg-primary/10"
          >
            {({ selected }) => (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
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