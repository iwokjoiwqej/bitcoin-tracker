let previousPrice = null;

async function fetchBTC() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await res.json();
    const currentPrice = data.bitcoin.usd;
    const priceElement = document.getElementById('price');

    priceElement.textContent = `$${currentPrice.toLocaleString()}`;

    if (previousPrice !== null) {
      if (currentPrice > previousPrice) {
        priceElement.style.color = 'green';
      } else if (currentPrice < previousPrice) {
        priceElement.style.color = 'red';
      } else {
        priceElement.style.color = 'black';
      }
    }

    previousPrice = currentPrice;
  } catch (err) {
    priceElement.textContent = '가격 불러오기 오류';
    console.error(err);
  }
}

fetchBTC();
setInterval(fetchBTC, 1000);
