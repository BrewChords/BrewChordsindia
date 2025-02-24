// Initialize Particle.js
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js loaded!');
});

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([loadEvents(), loadPosters()])
        .catch(error => console.error("Error loading data:", error));
});

// Load events from events.json
async function loadEvents() {
    try {
        const response = await fetch('events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        renderEvents(events);
    } catch (error) {
        console.error("Error loading events:", error);
        const eventGrid = document.querySelector('.event-grid');
        eventGrid.innerHTML = `<p class="error-message">Error loading events. Please try again later.</p>`;
    }
}

// Load posters from posters.json
async function loadPosters() {
    try {
        const response = await fetch('posters.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posters = await response.json();
        renderPosters(posters);
    } catch (error) {
        console.error("Error loading posters:", error);
        const posterGrid = document.querySelector('.poster-grid');
        posterGrid.innerHTML = `<p class="error-message">Error loading posters. Please try again later.</p>`;
    }
}

// Render events in the event grid
function renderEvents(events) {
    const eventGrid = document.querySelector('.event-grid');

    if (events.length === 1 && events[0].title === "No Events Scheduled") {
        eventGrid.innerHTML = `
            <div class="event no-events">
                <img src="${events[0].image || 'assets/dow.png'}" alt="${events[0].title}" loading="lazy" decoding="async">
                <h3>${events[0].title}</h3>
                <p>${events[0].message}</p>
            </div>`;
        return;
    } else if (events.length === 0) {
        eventGrid.innerHTML = `
            <div class="event no-events">
                <img src="assets/dow.png" alt="No Events Scheduled" loading="lazy" decoding="async">
                <h3>No Events Scheduled</h3>
                <p>No live events are currently scheduled. Please check back soon!</p>
            </div>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.innerHTML = `
            <img src="${event.image || 'assets/dow.png'}" alt="${event.title} Poster" loading="lazy" decoding="async">
            <h3>${event.title}</h3>
            <p class="event-date">${event.date || ''} ${event.time ? `- ${event.time}` : ''}</p>
            <p class="event-location">${event.location || ''}</p>
            <p class="event-description">${event.description || ''}</p>
        `;
        fragment.appendChild(eventDiv);
    });
    eventGrid.appendChild(fragment);
}

// Render posters in the poster grid
function renderPosters(posters) {
    const posterGrid = document.querySelector('.poster-grid');

    if (posters.length === 0) {
        posterGrid.innerHTML = `<p class="no-posters">No posters available at this time.</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    posters.forEach(poster => {
        const posterDiv = document.createElement('div');
        posterDiv.className = 'poster';
        posterDiv.innerHTML = `
            <img src="${poster.image || 'assets/dow.png'}" alt="${poster.title}" loading="lazy" decoding="async">
            <h3>${poster.title}</h3>
            <p>${poster.description || ''}</p>
        `;
        fragment.appendChild(posterDiv);
    });
    posterGrid.appendChild(fragment);
}