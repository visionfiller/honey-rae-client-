export const TicketSearch = ({ searchTerms, onSearchTermChange }) => {
    return (
      <>
        <div>Search for a ticket</div>
        <input type="text" className=""
          value={searchTerms}
          onChange={
            (changeEvent) => {
              onSearchTermChange(changeEvent.target.value)
            }
          }
          placeholder="Enter search string here..." />
      </>
    )
  }