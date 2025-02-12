document.addEventListener('DOMContentLoaded', () => {
    fetchFiscalDates();
    
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        fetchFiscalDates(e.target.value);
    });
});

async function fetchFiscalDates(category = '') {
    try {
        const response = await fetch('http://localhost:8080/api/fiscal-dates');
        let dates = await response.json();
        
        if (category) {
            dates = dates.filter(date => date.category === category);
        }
        
        renderCalendar(dates);
    } catch (error) {
        console.error('Error fetching dates:', error);
    }
}

function renderCalendar(dates) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    dates.forEach(date => {
        const card = document.createElement('div');
        card.className = 'date-card';
        
        const formattedDate = new Date(date.date).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        card.innerHTML = `
            <div class="date">${formattedDate}</div>
            <div class="title">${date.title}</div>
            <div class="description">${date.description}</div>
            <div class="category">${date.category}</div>
        `;
        
        calendar.appendChild(card);
    });
}