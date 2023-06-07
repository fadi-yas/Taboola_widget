const { getRecommendations, renderRecommendations } = require('./script.js');

describe('getRecommendations', () => {
  test('it should fetch data from the API and return a list of recommendations', async () => {
    // Mock successful fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          list: [
            // Mock data
            { name: 'Test Product', url: 'http://test.com', origin: 'sponsored', branding: 'Test Brand', thumbnail: [{ url: 'http://test.com/image.jpg' }] },
            // More mock data as needed...
          ],
        }),
      })
    );

    const data = await getRecommendations();

    expect(data).toHaveLength(1);
    expect(data[0].name).toBe('Test Product');
    expect(data[0].origin).toBe('sponsored');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Additional tests could include checking handling of fetch errors
});

describe('renderRecommendations', () => {
  test('it should render recommendations to the page', () => {
    document.body.innerHTML =
      `<div id="widget-container">
          <h2>Organic Recommendations</h2>
          <div id="organic-container" class="grid-container"></div>
          <h2>Sponsored Recommendations</h2>
          <div id="sponsored-container" class="grid-container"></div>
      </div>`;
      
    const recommendations = [
      { name: 'Test Product', url: 'http://test.com', origin: 'sponsored', branding: 'Test Brand', thumbnail: [{ url: 'http://test.com/image.jpg' }] },
     
    ];

    renderRecommendations(recommendations);

    expect(document.querySelector("#sponsored-container").childElementCount).toBe(1);
   
  });


});

  