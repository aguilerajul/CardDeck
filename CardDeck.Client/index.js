const socket = io("http://localhost:3000/gamePlay");

socket.on('connect', () => {
  socket.emit('request_cards');
});

socket.on('cards_updated', (cards) => {
  populateTable(cards.data);
})

socket.on('disconnect', () => {
  console.error('Ops, something went wrong');
});

function populateTable(data) {
  data.forEach(card => {
    document.querySelector('#cards-table tbody')
      .insertAdjacentHTML('afterend', createTableRow(card));
  });
}

function createTableRow(card) {
  let tRow = `
    <tr>
      <td>${card.name}</td>
      <td>${card.power}</td>
      <td>${card.specialAttack}</td>
    </tr>
  `;

  return tRow;

}