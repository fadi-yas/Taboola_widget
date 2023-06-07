// Fetch recommendations from the API
async function getRecommendations() {
    const url = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=4&source.type=video&source.id=214321562187&source.url=http://www.site.com/videos/214321562187.html";
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.list;
    } catch (error) {
        console.error('Error:', error);
    }
 }
 

// Render recommendations to the page
function renderRecommendations(recommendations) {
    let organicContainer = document.querySelector("#organic-container");
    let sponsoredContainer = document.querySelector("#sponsored-container");
    
    for (let recommendation of recommendations) {
        // Check if the thumbnail URL is null
        let imageUrl = recommendation.thumbnail && recommendation.thumbnail[0] ? recommendation.thumbnail[0].url : 'default-image.jpg';

        let productDiv = `
        <div class="product">
            <a href="${recommendation.url}" ${recommendation.origin === 'sponsored' ? 'target="_blank"' : ''}>
                <img src="${imageUrl}" onerror="this.style.display='none'">
                <p>${recommendation.name}</p>
                ${recommendation.origin === "sponsored" ? `<p>${recommendation.branding}</p>` : ''}
            </a>
        </div>
    `;
    console.log(recommendation.url)
    
        if (recommendation.origin === "sponsored") {
            sponsoredContainer.innerHTML += productDiv;
        } else {
            organicContainer.innerHTML += productDiv;
        }
    }
 }

 
 // Fetch and render recommendations when the page loads
 document.addEventListener("DOMContentLoaded", async () => {
    const recommendations = await getRecommendations();
    renderRecommendations(recommendations);
 });
