const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const menuBtn = document.getElementById('menu-btn');
const ticketCountInput = document.getElementById('ticket-count');
const lottoTicketsContainer = document.querySelector('.lotto-tickets');
const themeSwitch = document.getElementById('checkbox');
let generatedTickets = [];

const lunchMenus = [
    'Kimchi Stew', 'Bibimbap', 'Bulgogi', 'Pork Cutlet', 'Pasta', 
    'Pizza', 'Burger', 'Sushi', 'Ramen', 'Tteokbokki', 
    'Sandwich', 'Salad', 'Fried Rice', 'Gimbap', 'Udon'
];

menuBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * lunchMenus.length);
    const recommendedMenu = lunchMenus[randomIndex];
    alert(`How about ${recommendedMenu} for lunch today? 😋`);
});

function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        themeSwitch.checked = false;
        localStorage.setItem('theme', 'light');
    }
}

themeSwitch.addEventListener('change', () => {
    setDarkMode(themeSwitch.checked);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
});

generateBtn.addEventListener('click', () => {
    const ticketCount = parseInt(ticketCountInput.value, 10);
    generatedTickets = generateLottoTickets(ticketCount);
    displayLottoTickets(generatedTickets);
});

copyBtn.addEventListener('click', () => {
    if (generatedTickets.length === 0) {
        alert('Please generate numbers first!');
        return;
    }

    const numbersString = generatedTickets.map(ticket => ticket.join(', ')).join('\n');
    navigator.clipboard.writeText(numbersString)
        .then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy numbers: ', err);
            alert('Failed to copy numbers. Please try again.');
        });
});

shareBtn.addEventListener('click', () => {
    if (generatedTickets.length === 0) {
        alert('Please generate numbers first!');
        return;
    }

    if (navigator.share) {
        const numbersString = generatedTickets.map(ticket => ticket.join(', ')).join('\n');
        navigator.share({
            title: 'My Lotto Numbers',
            text: `Check out my lucky numbers:\n${numbersString}`,
            url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        alert('Web Share API is not supported in your browser.');
    }
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function generateLottoTickets(count) {
    const tickets = [];
    for (let i = 0; i < count; i++) {
        tickets.push(generateLottoNumbers());
    }
    return tickets;
}

function displayLottoTickets(tickets) {
    lottoTicketsContainer.innerHTML = '';
    tickets.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.classList.add('lotto-ticket');
        ticket.forEach(number => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('lotto-number');
            numberDiv.textContent = number;
            
            if (number <= 10) {
                numberDiv.style.backgroundColor = '#FFC107'; // Yellow
            } else if (number <= 20) {
                numberDiv.style.backgroundColor = '#2196F3'; // Blue
            } else if (number <= 30) {
                numberDiv.style.backgroundColor = '#FF5722'; // Orange
            } else if (number <= 40) {
                numberDiv.style.backgroundColor = '#9C27B0'; // Purple
            } else {
                numberDiv.style.backgroundColor = '#4CAF50'; // Green
            }

            ticketDiv.appendChild(numberDiv);
        });
        lottoTicketsContainer.appendChild(ticketDiv);
    });
}
