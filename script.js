
async function loadScrapedData() {
    const url = "data/daily_stats.json";
    const container = document.getElementById("container");

    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error('Data file not found. Wait for the first scraper run!');
        }
        const stats = await response.json();

        container.innerHTML = '';

        stats.reverse().forEach(element => {
            const row = document.createElement('div');
            row.className = "data-row";
            row.innerHTML = `
                <p>${element.title}</p>
                <p>${element.description}</p>
                <img src=${element.link} alt="image of the day" style="max-height: 2rem; max-width: 2rem; width:auto; height: auto;">
            `;
            container.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:, error');
        container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }

}   

window.onload = loadScrapedData;