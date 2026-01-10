const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const menuBtn = document.getElementById('menu-btn');
const ticketCountInput = document.getElementById('ticket-count');
const lottoTicketsContainer = document.querySelector('.lotto-tickets');
const themeSwitch = document.getElementById('checkbox');
const languageSelector = document.getElementById('language-selector');
let generatedTickets = [];

const translations = {
    en: {
        title: 'Lotto Ticket Generator',
        generateBtn: 'Generate Numbers',
        copyBtn: 'Copy Numbers',
        shareBtn: 'Share Numbers',
        menuBtn: 'Lunch Menu',
        alertGenerate: 'Please generate numbers first!',
        alertCopy: 'Copied!',
        alertCopyFail: 'Failed to copy numbers. Please try again.',
        shareTitle: 'My Lotto Numbers',
        shareText: 'Check out my lucky numbers:\n',
        shareSuccess: 'Successful share',
        shareError: 'Error sharing',
        shareUnsupported: 'Web Share API is not supported in your browser.',
        lunchMenus: [
            'Kimchi Stew', 'Bibimbap', 'Bulgogi', 'Pork Cutlet', 'Pasta', 
            'Pizza', 'Burger', 'Sushi', 'Ramen', 'Tteokbokki', 
            'Sandwich', 'Salad', 'Fried Rice', 'Gimbap', 'Udon'
        ],
        lunchAlert: 'How about {menu} for lunch today? 😋'
    },
    ko: {
        title: '로또 번호 생성기',
        generateBtn: '번호 생성',
        copyBtn: '번호 복사',
        shareBtn: '공유하기',
        menuBtn: '점심 메뉴 추천',
        alertGenerate: '먼저 번호를 생성해주세요!',
        alertCopy: '복사되었습니다!',
        alertCopyFail: '복사에 실패했습니다. 다시 시도해주세요.',
        shareTitle: '나의 로또 번호',
        shareText: '행운의 번호를 확인하세요:\n',
        shareSuccess: '공유 성공',
        shareError: '공유 실패',
        shareUnsupported: '이 브라우저에서는 웹 공유 API를 지원하지 않습니다.',
        lunchMenus: [
            '김치찌개', '비빔밥', '불고기', '돈까스', '파스타', 
            '피자', '햄버거', '초밥', '라면', '떡볶이', 
            '샌드위치', '샐러드', '볶음밥', '김밥', '우동'
        ],
        lunchAlert: '오늘 점심으로 {menu} 어떠세요? 😋'
    }
};

let currentLang = 'en';

function updateLanguage(lang) {
    currentLang = lang;
    languageSelector.value = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[lang][key];
    });
}

languageSelector.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

menuBtn.addEventListener('click', () => {
    const menus = translations[currentLang].lunchMenus;
    const randomIndex = Math.floor(Math.random() * menus.length);
    const recommendedMenu = menus[randomIndex];
    const message = translations[currentLang].lunchAlert.replace('{menu}', recommendedMenu);
    alert(message);
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

    const savedLang = localStorage.getItem('language') || 'en';
    updateLanguage(savedLang);
});

generateBtn.addEventListener('click', () => {
    const ticketCount = parseInt(ticketCountInput.value, 10);
    generatedTickets = generateLottoTickets(ticketCount);
    displayLottoTickets(generatedTickets);
});

copyBtn.addEventListener('click', () => {
    if (generatedTickets.length === 0) {
        alert(translations[currentLang].alertGenerate);
        return;
    }

    const numbersString = generatedTickets.map(ticket => ticket.join(', ')).join('\n');
    navigator.clipboard.writeText(numbersString)
        .then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = translations[currentLang].alertCopy;
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy numbers: ', err);
            alert(translations[currentLang].alertCopyFail);
        });
});

shareBtn.addEventListener('click', () => {
    if (generatedTickets.length === 0) {
        alert(translations[currentLang].alertGenerate);
        return;
    }

    if (navigator.share) {
        const numbersString = generatedTickets.map(ticket => ticket.join(', ')).join('\n');
        navigator.share({
            title: translations[currentLang].shareTitle,
            text: `${translations[currentLang].shareText}${numbersString}`,
            url: window.location.href
        })
        .then(() => console.log(translations[currentLang].shareSuccess))
        .catch((error) => console.log(translations[currentLang].shareError, error));
    } else {
        alert(translations[currentLang].shareUnsupported);
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
