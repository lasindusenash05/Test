export default async function handler(req, res) {
  const access_key = '968980777894054909ff6a1ef0031349';
  const apiUrl = `http://api.mediastack.com/v1/news?access_key=${access_key}&languages=en&limit=10`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const news_items = data.data || [];

    const html = news_items.map(news => `
      <div class="news-card">
        <h3>${news.title}</h3>
        <p>${news.description || 'No description available.'}</p>
        <a href="${news.url}" target="_blank">Read More</a>
      </div>
    `).join('');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('<p>Failed to fetch news. Try again later.</p>');
  }
}
