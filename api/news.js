export default async function handler(req, res) {
  const access_key = '968980777894054909ff6a1ef0031349';
  const apiUrl = `http://api.mediastack.com/v1/news?access_key=${access_key}&languages=en&limit=20`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const allNews = data.data || [];

    // Filter for news that include an image
    const newsWithImages = allNews.filter(news => news.image && news.image.trim() !== '');

    const html = newsWithImages.map(news => `
      <div class="news-card">
        <img src="${news.image}" alt="news image" style="width:100%; border-radius:10px; margin-bottom:8px;" />
        <h3>${news.title}</h3>
        <p>${news.description || 'No description available.'}</p>
        <a href="${news.url}" target="_blank">Read More</a>
      </div>
    `).join('');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html || '<p>No news with images available.</p>');
  } catch (error) {
    console.error('News fetch failed:', error);
    res.status(500).send('<p>Failed to fetch news. Try again later.</p>');
  }
                         }
