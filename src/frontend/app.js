let currentDates = [];

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
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
        
        currentDates = dates;
        renderCalendar(dates);
    } catch (error) {
        console.error('Error fetching dates:', error);
    }
}

function showDateDetails(id) {
    const date = currentDates.find(d => d.id === id);
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    
    const formattedDate = new Date(date.date).toLocaleDateString('pt-PT');
    const formattedPaymentDate = new Date(date.paymentDate).toLocaleDateString('pt-PT');
    
    modalTitle.textContent = date.title;
    modalDetails.innerHTML = `
        <p><strong>Data de Declaração:</strong> ${formattedDate}</p>
        <p>${date.description}</p>
        <div class="payment-info">
            <h3>Informação de Pagamento</h3>
            <p><strong>Data Limite:</strong> <span class="payment-date">${formattedPaymentDate}</span></p>
            <p>${date.paymentInfo}</p>
        </div>
    `;
    
    modal.style.display = "block";
}

function renderCalendar(dates) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    dates.forEach(date => {
        const card = document.createElement('div');
        card.className = 'date-card';
        card.onclick = () => showDateDetails(date.id);
        
        const formattedDate = new Date(date.date).toLocaleDateString('pt-PT');
        
        card.innerHTML = `
            <div class="date">${formattedDate}</div>
            <div class="title">${date.title}</div>
            <div class="description">${date.description}</div>
            <div class="category">${date.category}</div>
        `;
        
        calendar.appendChild(card);
    });
}