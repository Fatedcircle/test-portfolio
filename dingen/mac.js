// Voorbeeld van je JavaScript-objecten
const items = [
    {
        title: 'Hoofditem 1',
        description: 'Beschrijving van hoofditem 1',
        subitems: [
            { name: 'Subitem 1a', detail: 'Details over subitem 1a' },
            { name: 'Subitem 1b', detail: 'Details over subitem 1b' }
        ]
    },
    {
        title: 'Hoofditem 2',
        description: 'Beschrijving van hoofditem 2',
        subitems: [
            { name: 'Subitem 2a', detail: 'Details over subitem 2a' },
            { name: 'Subitem 2b', detail: 'Details over subitem 2b' }
        ]
    }
];

// Functie om de kaarten dynamisch in te laden
function loadItems() {
    const container = document.getElementById('cards-container');

    items.forEach((item, index) => {
        // Maak de card voor elk hoofditem
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.style.maxWidth = '18rem';

        // Maak de card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Titel van het hoofditem
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = item.title;
        cardBody.appendChild(cardTitle);

        // Beschrijving van het hoofditem
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = item.description;
        cardBody.appendChild(cardText);

        // Maak een knop die de subitems toont of verbergt
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('btn', 'btn-primary', 'mt-3');
        toggleButton.textContent = 'Toon subitems';
        
        // Maak een container voor de subitems die we willen verbergen of tonen
        const subitemContainer = document.createElement('div');
        subitemContainer.classList.add('subitem-container', 'collapse');

        // Voeg de subitems toe aan de subitem-container
        if (item.subitems && item.subitems.length > 0) {
            const subitemList = document.createElement('ul');
            subitemList.classList.add('list-group', 'list-group-flush');

            item.subitems.forEach(subitem => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');

                const subitemTitle = document.createElement('strong');
                subitemTitle.textContent = subitem.name;
                listItem.appendChild(subitemTitle);

                const subitemDetail = document.createElement('p');
                subitemDetail.textContent = subitem.detail;
                listItem.appendChild(subitemDetail);

                subitemList.appendChild(listItem);
            });

            subitemContainer.appendChild(subitemList);
        }

        // Voeg de event listener toe om de subitems in te klappen/uit te klappen
        toggleButton.addEventListener('click', () => {
            const isCollapsed = subitemContainer.classList.contains('collapse');
            if (isCollapsed) {
                subitemContainer.classList.remove('collapse');
                toggleButton.textContent = 'Verberg subitems';
            } else {
                subitemContainer.classList.add('collapse');
                toggleButton.textContent = 'Toon subitems';
            }
        });

        // Voeg de knop en de subitem-container toe aan de card body
        cardBody.appendChild(toggleButton);
        cardBody.appendChild(subitemContainer);

        // Voeg de card body toe aan de card
        card.appendChild(cardBody);

        // Voeg de card toe aan de container
        container.appendChild(card);
    });
}

// Laad de items wanneer de pagina is geladen
window.onload = loadItems;
