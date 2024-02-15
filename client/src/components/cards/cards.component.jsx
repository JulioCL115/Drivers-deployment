import React, { useState } from "react";
import Card from "../card/card.component";
import "../cards/cards.style.css";

function Cards({ allUsers }) {
  const usersPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Verifica si allUsers es un array y tiene elementos
  const usersList = Array.isArray(allUsers) ? allUsers : (allUsers ? [allUsers] : []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersList.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="card-list">
        {currentUsers.map((user, index) => (
          <Card key={index} user={user} />
        ))}
      </div>
  
      {/* Paginación con select */}
      {usersList.length > usersPerPage && (
        <div className="pagination">
          <button className="button" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            <span className="button-content">{"<<"}</span>
          </button>
          <select value={currentPage} onChange={(e) => paginate(parseInt(e.target.value))}>
            {Array.from({ length: Math.ceil(usersList.length / usersPerPage) }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button className="button" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(usersList.length / usersPerPage)}>
          <span className="button-content">{">>"}</span>
          </button>
        </div>
      )}
    </div>
  );
  
  
  
}

export default Cards;
