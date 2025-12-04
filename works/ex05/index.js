const navMenu = document.getElementById('nav-menu');
const pageDashboard = document.getElementById('page-dashboard');
const pageCalculators = document.getElementById('page-calculators');
const pageAiAnalysis = document.getElementById('page-ai-analysis');

const pages = {
    'dashboard': pageDashboard,
    'calculators': pageCalculators,
    'ai-analysis': pageAiAnalysis,
};

let currentPage = 'dashboard';

const switchPage = (pageId) => {
    if (currentPage === pageId) return;

    Object.values(pages).forEach(page => page.classList.add('hidden'));
    pages[pageId].classList.remove('hidden');

    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-button[data-page="${pageId}"]`).classList.add('active');

    currentPage = pageId;
};

const setupNavListeners = () => {
    navMenu.addEventListener('click', (event) => {
        const target = event.target.closest('.nav-button');
        if (target) {
            const pageId = target.dataset.page;
            switchPage(pageId);
        }
    });
};

const quizList = [
    { q: "금리와 채권 가격은 일반적으로 서로 반비례 관계이다.", a: "O", result: "금리 상승 시, 기존 채권의 가치는 하락합니다." },
    { q: "기업의 주당순이익(EPS)이 증가하면 일반적으로 주가에는 긍정적인 영향을 준다.", a: "O", result: "EPS는 기업의 순이익을 주식 수로 나눈 값으로, 이익 증가를 의미해 주가에 긍정적입니다." },
    { q: "주식 시장에서 '매도호가'는 매수자가 사려고 부르는 가격을 의미한다.", a: "X", result: "매도호가는 판매자가 팔려고 부르는 가격입니다. 매수호가는 사려고 부르는 가격입니다." },
    { q: "ROE(자기자본이익률)는 기업이 자기자본을 활용해 얼마나 이익을 냈는지 나타내는 지표이다.", a: "O", result: "ROE는 순이익을 자기자본으로 나눈 값으로, 경영 효율성을 나타냅니다." },
    { q: "배당락일은 배당금을 받기 위해 주식을 반드시 매수해야 하는 날이다.", a: "X", result: "배당락일은 배당금을 받을 권리가 사라지는 날입니다. 그 전날까지 매수해야 합니다." },
    { q: "선물(Futures) 거래는 정해진 미래 시점에 특정 자산을 현재 가격으로 사고파는 계약이다.", a: "X", result: "선물은 정해진 미래 시점에 특정 자산을 현재 '정해진 가격'으로 사고파는 계약입니다." },
    { q: "주식 분할(액면 분할)은 기업의 시가총액을 변화시키지 않는다.", a: "O", result: "주식 수만 늘어나고 주당 가격이 낮아질 뿐, 기업의 전체 가치인 시가총액은 변하지 않습니다." }
];

let currentQuizIndex = 0;
const quizText = document.getElementById('quiz-text');
const quizResult = document.getElementById('quiz-result');

const loadQuiz = () => {
    currentQuizIndex = Math.floor(Math.random() * quizList.length);
    const currentQuiz = quizList[currentQuizIndex];
    
    quizText.textContent = `Q. ${currentQuiz.q}`;
    quizResult.textContent = 'O 또는 X를 선택해 보세요.';
    quizResult.classList.remove('text-red-600', 'text-green-600');

    document.getElementById('quiz-o').disabled = false;
    document.getElementById('quiz-x').disabled = false;
};

const checkQuiz = (answer) => {
    const currentQuiz = quizList[currentQuizIndex];
    const isCorrect = currentQuiz.a === answer;

    document.getElementById('quiz-o').disabled = true;
    document.getElementById('quiz-x').disabled = true;

    if (isCorrect) {
        quizResult.textContent = `정답! ✅ ${currentQuiz.result}`;
        quizResult.className = 'mt-3 font-semibold text-lg text-green-600';
    } else {
        quizResult.textContent = `오답! ❌ 정답은 ${currentQuiz.a} 입니다. (${currentQuiz.result})`;
        quizResult.className = 'mt-3 font-semibold text-lg text-red-600';
    }
};

const setupQuizListeners = () => {
    document.getElementById('quiz-o').addEventListener('click', () => checkQuiz('O'));
    document.getElementById('quiz-x').addEventListener('click', () => checkQuiz('X'));
    document.getElementById('quiz-reset').addEventListener('click', loadQuiz);
};

const testQuestions = [
    { id: 1, q: "투자 손실이 발생할 경우, 손실분을 만회하기 위해 더 위험한 투자를 시도하는 경향이 있습니까?", score: 5, options: ["예", "아니오"] },
    { id: 2, q: "원금 손실 위험이 있더라도 높은 수익률을 추구하는 편입니까?", score: 4, options: ["예", "아니오"] },
    { id: 3, q: "투자 결정 시, 주변의 조언이나 뉴스 기사에 쉽게 영향을 받는 편입니까?", score: 3, options: ["예", "아니오"] },
    { id: 4, q: "1년 내에 원금 손실이 20% 이상 발생할 경우에도 투자를 유지할 수 있습니까?", score: 5, options: ["예", "아니오"] },
    { id: 5, q: "예금 이자보다 높은 수익을 얻기 위해 어느 정도의 위험을 감수할 의향이 있습니까?", score: 2, options: ["예", "아니오"] },
    { id: 6, q: "다른 사람보다 더 빨리 부자가 되고 싶다는 강한 열망이 있습니까?", score: 4, options: ["예", "아니오"] },
    { id: 7, q: "투자할 때 주로 신기술이나 혁신 기업 등 급변하는 시장에 관심이 많습니까?", score: 3, options: ["예", "아니오"] },
];

let currentQIndex = 0;
let totalScore = 0;
const testQuestionArea = document.getElementById('test-question-area');
const testResultArea = document.getElementById('test-result-area');
const finalTypeSpan = document.getElementById('final-type');

const loadQuestion = () => {
    if (currentQIndex < testQuestions.length) {
        const qData = testQuestions[currentQIndex];
        
        const questionHtml = `
            <div class="question-item p-3 border-b border-blue-200">
                <p class="text-md font-semibold mb-3">Q${currentQIndex + 1}. ${qData.q}</p>
                <div class="flex space-x-4">
                    <button class="test-option-btn bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md" data-answer="yes" data-score="${qData.score}">예</button>
                    <button class="test-option-btn bg-gray-400 hover:bg-gray-500 text-white font-medium py-1 px-3 rounded-md" data-answer="no" data-score="0">아니오</button>
                </div>
            </div>
        `;
        testQuestionArea.innerHTML = questionHtml;
    } else {
        showTestResult();
    }
};

const showTestResult = () => {
    let resultType = '';
    
    if (totalScore >= 20) {
        resultType = '공격 투자형 (High-Risk/High-Return)';
    } else if (totalScore >= 15) {
        resultType = '적극 투자형 (Aggressive Growth)';
    } else if (totalScore >= 10) {
        resultType = '성장 추구형 (Moderate Growth)';
    } else if (totalScore >= 5) {
        resultType = '안정 추구형 (Conservative)';
    } else {
        resultType = '안정형 (Safety First)';
    }

    testQuestionArea.classList.add('hidden');
    testResultArea.classList.remove('hidden');
    finalTypeSpan.textContent = resultType;
};

const setupTestListeners = () => {
    testQuestionArea.addEventListener('click', (event) => {
        const target = event.target.closest('.test-option-btn');
        if (target) {
            const scoreToAdd = parseInt(target.dataset.score);
            totalScore += scoreToAdd;
            currentQIndex++;
            loadQuestion();
        }
    });
};

const calculateReturn = () => {
    const principalInput = document.getElementById('return-principal');
    const currentInput = document.getElementById('return-current');
    const resultSpan = document.getElementById('return-result');

    const principal = parseFloat(principalInput.value);
    const current = parseFloat(currentInput.value);

    if (isNaN(principal) || isNaN(current) || principal <= 0) {
        resultSpan.textContent = '유효한 값을 입력해 주세요.';
        return;
    }

    const returnRate = ((current - principal) / principal) * 100;
    resultSpan.textContent = `${returnRate.toFixed(2)}%`;
    resultSpan.classList.toggle('text-red-600', returnRate < 0);
    resultSpan.classList.toggle('text-blue-600', returnRate >= 0);
};

const calculateAveraging = () => {
    const price1 = parseFloat(document.getElementById('avg-price1').value);
    const qty1 = parseFloat(document.getElementById('avg-qty1').value);
    const price2 = parseFloat(document.getElementById('avg-price2').value);
    const qty2 = parseFloat(document.getElementById('avg-qty2').value);
    const resultSpan = document.getElementById('averaging-result');

    if (isNaN(price1) || isNaN(qty1) || isNaN(price2) || isNaN(qty2) || qty1 + qty2 <= 0) {
        resultSpan.textContent = '유효한 값을 입력해 주세요.';
        return;
    }

    const totalCost = (price1 * qty1) + (price2 * qty2);
    const totalQty = qty1 + qty2;
    const newAvgPrice = totalCost / totalQty;

    resultSpan.textContent = `${newAvgPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
};

const calculateCompound = () => {
    const principal = parseFloat(document.getElementById('compound-principal').value);
    const annualRate = parseFloat(document.getElementById('compound-rate').value) / 100;
    const years = parseFloat(document.getElementById('compound-years').value);
    const frequency = document.getElementById('compound-frequency').value;
    const resultSpan = document.getElementById('compound-result');

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0) {
        resultSpan.textContent = '유효한 값을 입력해 주세요.';
        return;
    }

    let finalAmount = principal;
    let n = 1;
    let periods = years;

    if (frequency === 'monthly') {
        n = 12;
        periods = years;
    } else if (frequency === 'daily') {
        n = 365;
        periods = years;
    }
    
    finalAmount = principal * Math.pow((1 + annualRate / n), (n * periods));

    resultSpan.textContent = `${finalAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
};

const calculateDeposit = () => {
    const type = document.getElementById('deposit-type').value;
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    const months = parseInt(document.getElementById('deposit-months').value);
    const annualRate = parseFloat(document.getElementById('deposit-rate').value) / 100;
    const interestSpan = document.getElementById('deposit-interest');
    const totalSpan = document.getElementById('deposit-total');

    if (isNaN(amount) || isNaN(months) || isNaN(annualRate) || months <= 0 || amount <= 0) {
        interestSpan.textContent = '유효한 값을 입력해 주세요.';
        totalSpan.textContent = '0원';
        return;
    }
    
    const taxRate = 0.154;

    let totalPrincipal = 0;
    let totalInterest = 0;

    if (type === 'lump') {
        totalPrincipal = amount;
        totalInterest = totalPrincipal * annualRate * (months / 12);
    } else {
        const monthlyRate = annualRate / 12;
        totalPrincipal = amount * months;
        
        totalInterest = amount * monthlyRate * (months * (months + 1) / 2);
    }

    const afterTaxInterest = totalInterest * (1 - taxRate);
    const totalAmount = totalPrincipal + afterTaxInterest;

    interestSpan.textContent = `${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 (세전)`;
    totalSpan.textContent = `${totalAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
};

const calculateForex = () => {
    const krwInvest = parseFloat(document.getElementById('forex-krw-invest').value);
    const buyRate = parseFloat(document.getElementById('forex-buy-rate').value);
    const sellRate = parseFloat(document.getElementById('forex-sell-rate').value);
    const resultSpan = document.getElementById('forex-result');

    if (isNaN(krwInvest) || isNaN(buyRate) || isNaN(sellRate) || krwInvest <= 0 || buyRate <= 0) {
        resultSpan.textContent = '유효한 값을 입력해 주세요.';
        return;
    }

    const usdAmount = krwInvest / buyRate;

    const krwCurrentValue = usdAmount * sellRate;

    const forexGain = krwCurrentValue - krwInvest;

    resultSpan.textContent = `${forexGain.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
    resultSpan.classList.toggle('text-red-600', forexGain < 0);
    resultSpan.classList.toggle('text-blue-600', forexGain >= 0);
};

const setupCalcListeners = () => {
    const calcButtons = document.querySelectorAll('.calculate-btn');
    
    calcButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const calcType = btn.dataset.calc;
            
            switch(calcType) {
                case 'return':
                    calculateReturn();
                    break;
                case 'averaging':
                    calculateAveraging();
                    break;
                case 'compound':
                    calculateCompound();
                    break;
                case 'deposit':
                    calculateDeposit();
                    break;
                case 'forex':
                    calculateForex();
                    break;
            }
        });
    });
};

const initializeApp = () => {
    setupNavListeners();
    setupQuizListeners();
    setupTestListeners();
    setupCalcListeners();
    
    loadQuiz();
    loadQuestion();
};

window.addEventListener('DOMContentLoaded', initializeApp);