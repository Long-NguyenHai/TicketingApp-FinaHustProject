import { useState } from 'react';
import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const itemsPerRow = 3;
  const rowsPerPage = 2;
  const totalRows = Math.ceil(tickets.length / itemsPerRow);
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pagination = [];
    const canGoBack = currentPage > 1;
    const canGoForward = currentPage < totalPages;

    if (canGoBack) {
      pagination.push(
        <li key="prev" className="page-item">
          <a className="page-link" onClick={() => handlePageChange(currentPage - 1)} style={{cursor: 'pointer'}}>
            &laquo;
          </a>
        </li>
      );
    }

    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <a className="page-link" onClick={() => handlePageChange(i)} style={{cursor: 'pointer'}}>
            {i}
          </a>
        </li>
      );
    }

    if (canGoForward) {
      pagination.push(
        <li key="next" className="page-item">
          <a className="page-link" onClick={() => handlePageChange(currentPage + 1)} style={{cursor: 'pointer'}}>
            &raquo;
          </a>
        </li>
      );
    }

    return pagination;
  };

  const startIdx = (currentPage - 1) * rowsPerPage * itemsPerRow;
  const endIdx = Math.min(startIdx + rowsPerPage * itemsPerRow, tickets.length);
  const ticketRows = [];

  for (let i = startIdx; i < endIdx; i += itemsPerRow) {
    ticketRows.push(
      <div key={i} className="row mb-3">
        {tickets.slice(i, i + itemsPerRow).map((ticket) => (
          <div key={ticket.id} className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{ticket.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">${ticket.price}</h6>
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} passHref legacyBehavior>
                  <a className="btn btn-primary">View</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Tickets</h1>
      {ticketRows}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-4">
          {renderPagination()}
        </ul>
      </nav>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
