document.getElementById('current-year').textContent = new Date().getFullYear();

async function fetchDeadlines() {
    try {
        const response = await fetch('http://localhost:8080/api/deadlines');
        const data = await response.json();
        displayDeadlines(data.paymentDeadlines);
    } catch (error) {
        console.error('Error fetching deadlines:', error);
        showError('Failed to load deadlines. Please try again later.');
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatMonth(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
}

function displayDeadlines(deadlines) {
    const container = document.getElementById('deadlines-container');
    container.innerHTML = '';

    deadlines.forEach(deadline => {
        const card = document.createElement('div');
        card.className = 'deadline-card';
        card.innerHTML = `
            <div class="deadline-header">
                <h2>Due Date: ${formatDate(deadline.deadline)}</h2>
            </div>
            <div class="deadline-content">
                <div class="period-block">
                    <h3>Period Coverage</h3>
                    <p>${formatMonth(deadline.period.startMonth)} - ${formatMonth(deadline.period.endMonth)}</p>
                </div>
                <div class="period-block">
                    <h3>Included Months</h3>
                    <ul class="months-list">
                        ${deadline.period.monthsIncluded
                            .map(month => `<li class="month-item">${formatMonth(month)}</li>`)
                            .join('')}
                    </ul>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function showError(message) {
    const container = document.getElementById('deadlines-container');
    container.innerHTML = `<div class="error-message">${message}</div>`;
}

// Load deadlines when the page loads
document.addEventListener('DOMContentLoaded', fetchDeadlines);