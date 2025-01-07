export async function getRandomGif(): Promise<string> {
  const giphy = {
    baseURL: 'https://api.giphy.com/v1/gifs/',
    apiKey: '0UTRbFtkMxAplrohufYco5IY74U8hOes',
    tag: 'fail',
    type: 'random',
    rating: 'pg-13',
  };

  const giphyURL = encodeURI(
    `${giphy.baseURL}${giphy.type}?api_key=${giphy.apiKey}&tag=${giphy.tag}&rating=${giphy.rating}`,
  );

  const response = await fetch(giphyURL);

  if (!response.ok) {
    throw new Error('Не удалось получить gif');
  }

  const json = await response.json();

  return json.data.images.original.url;
}
