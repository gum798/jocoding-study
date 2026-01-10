// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const lunchDecideBtn = document.getElementById('lunch-decide-btn'); // Renamed
const contactBtn = document.getElementById('contact-btn');
const ticketCountInput = document.getElementById('ticket-count');
const lottoTicketsContainer = document.querySelector('.lotto-tickets');
const themeSwitch = document.getElementById('checkbox');
const languageSelector = document.getElementById('language-selector');
const contactModal = document.getElementById('contact-modal');
const closeBtn = document.querySelector('.close-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const lunchResult = document.getElementById('lunch-result');

let generatedTickets = [];

// Translations
const translations = {
    en: {
        title: 'LottoGen',
        navGenerator: 'Generator',
        navLunch: 'Lunch',
        navAI: 'AI Check',
        navAbout: 'About',
        generateBtn: 'Generate Numbers',
        copyBtn: 'Copy',
        shareBtn: 'Share',
        menuBtn: 'Recommend Menu',
        contactBtn: 'Partnership',
        contactTitle: 'Partnership Inquiry',
        contactName: 'Name',
        contactEmail: 'Email',
        contactMessage: 'Message',
        contactSubmit: 'Send',
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
        lunchAlert: 'How about {menu} for lunch today? 😋',
        aiTitle: 'AI Posture Check',
        aiStartBtn: 'Start Camera',
        aboutTitle: 'About This Lotto Generator',
        aboutText1: 'Welcome to the ultimate Lotto Ticket Generator! Our tool is designed to help you randomly select numbers for your next lottery ticket. Unlike simple random number pickers, we provide a clean, easy-to-use interface that mimics the feeling of a real lottery draw.',
        howItWorksTitle: 'How It Works',
        howItWorksText: 'We use advanced cryptographic algorithms to ensure that every number generated is truly random and unbiased. Whether you need 6 numbers or more, our system handles the complexity for you. Simply enter the number of tickets you want, click generate, and let luck take its course!',
        funFactsTitle: 'Lotto Fun Facts',
        funFactsText: 'Did you know? The word "lottery" comes from the Dutch word "lot", meaning "fate". Lotteries have been around for centuries, with the first recorded signs of a lottery being keno slips from the Chinese Han Dynasty between 205 and 187 BC. These lotteries are believed to have helped finance major government projects like the Great Wall of China!',
        responsibleTitle: 'Responsible Gaming',
        responsibleText: 'Please remember that lottery games are a form of entertainment. We encourage all our users to play responsibly. Never spend more than you can afford to lose. This tool is for amusement purposes and does not guarantee a win.'
    },
    ko: {
        title: '로또젠',
        navGenerator: '생성기',
        navLunch: '점심메뉴',
        navAI: 'AI 체크',
        navAbout: '소개',
        generateBtn: '번호 생성',
        copyBtn: '복사',
        shareBtn: '공유',
        menuBtn: '메뉴 추천',
        contactBtn: '제휴 문의',
        contactTitle: '제휴 문의',
        contactName: '이름',
        contactEmail: '이메일',
        contactMessage: '메시지',
        contactSubmit: '보내기',
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
        lunchAlert: '오늘 점심으로 {menu} 어떠세요? 😋',
        aiTitle: 'AI 자세 확인',
        aiStartBtn: '카메라 시작',
        aboutTitle: '로또 번호 생성기 소개',
        aboutText1: '최고의 로또 번호 생성기에 오신 것을 환영합니다! 저희 도구는 다음 로또 티켓을 위해 무작위로 번호를 선택하는 것을 돕기 위해 설계되었습니다. 단순한 난수 생성기와 달리, 실제 로또 추첨의 느낌을 주는 깔끔하고 사용하기 쉬운 인터페이스를 제공합니다.',
        howItWorksTitle: '작동 원리',
        howItWorksText: '저희는 모든 생성된 번호가 진정으로 무작위이고 편향되지 않도록 고급 암호화 알고리즘을 사용합니다. 6개의 번호가 필요하든 그 이상이든, 저희 시스템이 복잡한 과정을 처리해 드립니다. 원하는 티켓 수를 입력하고 생성 버튼을 클릭하기만 하면 행운이 따를 것입니다!',
        funFactsTitle: '로또 재미있는 사실',
        funFactsText: '알고 계셨나요? "로또"라는 단어는 "운명"을 뜻하는 네덜란드어 "lot"에서 유래했습니다. 로또는 수세기 동안 존재해 왔으며, 최초의 기록은 기원전 205년에서 187년 사이 중국 한나라의 키노 전표입니다. 이 복권들은 만리장성과 같은 주요 정부 프로젝트의 자금을 조달하는 데 도움이 된 것으로 여겨집니다!',
        responsibleTitle: '책임감 있는 게임',
        responsibleText: '로또 게임은 오락의 일종임을 기억해 주세요. 모든 사용자가 책임감 있게 게임을 즐기시기를 권장합니다. 감당할 수 있는 범위 내에서만 지출하세요. 이 도구는 재미를 위한 것이며 당첨을 보장하지 않습니다.'
    }
};

let currentLang = 'en';

// --- Functions ---

function updateLanguage(lang) {
    currentLang = lang;
    languageSelector.value = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

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

// Tab Switching
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        navBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});


// --- Event Listeners ---

languageSelector.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

themeSwitch.addEventListener('change', () => {
    setDarkMode(themeSwitch.checked);
});

// Modal
contactBtn.addEventListener('click', () => {
    contactModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == contactModal) {
        contactModal.style.display = 'none';
    }
});

// Lunch Menu
lunchDecideBtn.addEventListener('click', () => {
    const menus = translations[currentLang].lunchMenus;
    const randomIndex = Math.floor(Math.random() * menus.length);
    const recommendedMenu = menus[randomIndex];
    const message = translations[currentLang].lunchAlert.replace('{menu}', recommendedMenu);
    
    // Update the text in the UI instead of alert
    lunchResult.textContent = recommendedMenu;
    lunchResult.style.color = 'var(--primary-color)';
});

// Generator
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
                numberDiv.style.backgroundColor = '#f1c40f'; 
            } else if (number <= 20) {
                numberDiv.style.backgroundColor = '#3498db'; 
            } else if (number <= 30) {
                numberDiv.style.backgroundColor = '#e67e22'; 
            } else if (number <= 40) {
                numberDiv.style.backgroundColor = '#9b59b6'; 
            } else {
                numberDiv.style.backgroundColor = '#2ecc71'; 
            }

            ticketDiv.appendChild(numberDiv);
        });
        lottoTicketsContainer.appendChild(ticketDiv);
    });
}

// Teachable Machine Pose Logic
const URL = "https://teachablemachine.withgoogle.com/models/2JtG9CQd-/";
let model, webcam, ctx, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Show the container
    document.getElementById('ai-container').style.display = 'flex';
    document.getElementById('start-ai-btn').style.display = 'none'; 

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const size = 200;
    const flip = true; 
    webcam = new tmPose.Webcam(size, size, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ''; 
    for (let i = 0; i < maxPredictions; i++) { 
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop(timestamp) {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

document.getElementById('start-ai-btn').addEventListener('click', () => {
    init();
});

// Initialization
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