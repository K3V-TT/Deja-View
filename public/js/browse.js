/* browse.js */
document.getElementById('filterBtn').addEventListener('click', () => {
    const min = document.getElementById('minPrice').value;
    const max = document.getElementById('maxPrice').value;
    fetch(`https://www.cheapshark.com/api/1.0/deals?lowerPrice=${min}&upperPrice=${max}`)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('deal-list');
        container.innerHTML = '';
        data.forEach(deal => {
          const div = document.createElement('div');
          div.className = 'deal-card';
          div.innerHTML = `<h3>${deal.title}</h3>
            <img src="${deal.thumb}" alt="${deal.title}" style="width:120px">
            <p>Normal Price: $${deal.normalPrice}</p>
            <p>Sale Price: $${deal.salePrice}</p>
            <a class="view-button" href="game.html?gameID=${deal.gameID}">View Details</a>`;
  
          // Append bookmark button
          const bookmarkBtn = createBookmarkButton(deal.gameID, deal.title, deal.thumb);
          div.appendChild(bookmarkBtn);
  
          container.appendChild(div);
        });
      });
  });
  
  // Bookmark button function
  function createBookmarkButton(gameID, title, thumb) {
    const btn = document.createElement('button');
    btn.textContent = 'Bookmark';
    btn.className = 'bookmark-button';
    btn.onclick = () => {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      if (!bookmarks.some(b => b.gameID === gameID)) {
        bookmarks.push({ gameID, title, thumb });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('Game bookmarked!');
      } else {
        alert('Already bookmarked.');
      }
    };
    return btn;
  }
  