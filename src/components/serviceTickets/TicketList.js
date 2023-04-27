import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isStaff } from "../../utils/isStaff"
import { TicketCard } from "./TicketCard"
import { getAllTickets, getTicketBySearchTerm, searchTicketsByStatus } from "../../managers/TicketManager"
import "./Tickets.css"
import { TicketSearch } from "./TicketSearch"

export const TicketList = () => {
  const [active, setActive] = useState("")
  const [tickets, setTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    if (searchTerm.length > 1) {
      getTicketBySearchTerm(searchTerm).then((data) => setTickets(data))
    } else {
      getAllTickets().then((res) => setTickets(res))
    }
  }, [searchTerm])

  const onSearchTermChange = (value) => {
    setSearchTerm(value)
  }
  useEffect(() => {
    getAllTickets().then((res) => setTickets(res))
  }, [])

  useEffect(() => {
    const activeTicketCount = tickets.filter(t => t.date_completed === null).length
    if (isStaff()) {
      setActive(`There are ${activeTicketCount} open tickets`)
    }
    else {
      setActive(`You have ${activeTicketCount} open tickets`)
    }
  }, [tickets])

  const toShowOrNotToShowTheButton = () => {
    if (isStaff()) {
      return ""
    }
    else {
      return <button className="actions__create"
        onClick={() => navigate("/tickets/create")}>Create Ticket</button>
    }
  }

  const filterTickets = (status) => {
    searchTicketsByStatus(status).then((res) => setTickets(res))
  }

  return <>
  <TicketSearch onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
    <div>
      <button onClick={() => filterTickets("unclaimed")}>Show Unclaimed</button>
      <button onClick={() => filterTickets("inprogress")}>Show In Progress</button>
      <button onClick={() => filterTickets("done")}>Show Done</button>
      <button onClick={() => filterTickets("all")}>Show All</button>
    </div>
    <div className="actions">{toShowOrNotToShowTheButton()}</div>
    <div className="activeTickets">{active}</div>
    <article className="tickets">
      {
        tickets.map(ticket => (
          <TicketCard key={`ticket--${ticket.id}`} ticket={ticket} />
        ))
      }
    </article>
  </>
}
