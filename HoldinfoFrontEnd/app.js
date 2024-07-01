document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/getData');
    const data = await response.json();
  
    const tableBody = document.getElementById('data-table');
    const centerTitle = document.getElementById('center-title');
    const centerPrice = document.getElementById('center-price');
    const leftLast = document.getElementById('left-last');
    const leftBuy = document.getElementById('left-buy');
    const rightSell = document.getElementById('right-sell');
    const rightVolume = document.getElementById('right-volume');
  
    data.forEach((item, index) => {
      const last = parseFloat(item.last);
      const buy = parseFloat(item.buy);
      const sell = parseFloat(item.sell);
      const volume = parseFloat(item.volume);
  
      if (index === 0) {
        centerTitle.textContent = item.name;
        centerPrice.textContent = `₹ ${last.toFixed(2)}`;
        leftLast.textContent = `Last: ₹ ${last.toFixed(2)}`;
        leftBuy.textContent = `Buy: ₹ ${buy.toFixed(2)}`;
        rightSell.textContent = `Sell: ₹ ${sell.toFixed(2)}`;
        rightVolume.textContent = `Volume: ${volume.toFixed(2)}`;
      }
  
      const difference = ((sell - buy) / buy) * 100;
      const savings = difference * 1000;
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>₹ ${last.toFixed(2)}</td>
        <td>₹ ${buy.toFixed(2)} / ₹ ${sell.toFixed(2)}</td>
        <td>${difference.toFixed(2)}%</td>
        <td>₹ ${savings.toFixed(2)}</td>
      `;
  
      tableBody.appendChild(row);
    });
  });
  