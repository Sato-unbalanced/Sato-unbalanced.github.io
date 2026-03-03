
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
            row.className = "result-card";
            const card_bar = document.createElement('div');
            card_bar.className = "card-bar";
            card_bar.innerHTML = `
                <div class="card-bar-left"${element.title}</div>
                <div class="card-bar-right"${element.date}</div>
            `;
            row.appendChild(card_bar);
            const card_body = document.createElement('div');
            card_body.className = "card-body"
            card_body.innerHTML = `
                <div class="feild-row">
                    <div class="feild-key">Description</div>
                    <div class="feild-val"><p>${element.description}</p></div>
                </div>
                <div class="feild-row">
                    <div class="feild-key">Image</div>
                    <div class="feild-val">
                        <img src=${element.link} alt="image of the day" style="max-height: 500px; max-width: 500px; width:auto; height: auto;">
                    </div>
                </div>
            `;
            row.appendChild(card_body);
            container.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:, error');
        container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }

}   

window.onload = loadScrapedData;