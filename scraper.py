import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime

def scrape_data():
    url = "www.nasa.org"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Logic to extract what you need
    value = soup.find('div', class_='hds-image-of-the-day')
    if value:
        outer_container = value.find('div', class_='grid-container')
        second_outer_contaier = outer_container.find('div', class_="grid_row")
        inner_container = second_outer_contaier.find('div', class_="grid-col-12")
        title = inner_container.find("p")
        title_value = title.text.strip()
        description = title.find_next_sibling("p").text.strip()
        outer_image_contianer = inner_container.find_next_sibiling('div', class_="grid-col-12") 
        inner_image_container = outer_container.find('div', class_="hds-image-download-wrapper")
        link = inner_container.find('a')["href"]
        
    else:
        title_value = "N/A"
        description = "N/A"
        link = "N/A"
    return {
        "title" : title_value,
        "description" : description,
        "link" : link 
    }

def update_jason(new_entry):
    file_path = 'data/daily_stats.json'

    os.makedirs('data', exist_ok=True)

    # Load existing data
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            data = json.load(f)
    else:
        data = []

    # Backend check: Prevent duplicate dates
    if not any(item['data'] == new_entry['data'] for item in data):
        data.append(new_entry)

        # Keep only the last 30 days to save space
        data = data[-30:]

        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)
        print("Data updated")
    else:
        print("Data was not updated already exsts for today")
if __name__ == "__main__":
    entry = scrape_data()
    update_jason(entry)