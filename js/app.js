/**
 * CLASS: Auth & Settings Manager
 */
class AuthManager {
    constructor() {
        this.currentUser = localStorage.getItem('mm_username') || null;
        this.apiKey = localStorage.getItem('mm_gemini_key') || null;

        // Fallback default keys (Split to avoid simple scraping bots, though client-side is never truly secure)
        this.defaultKeyParts = ["AIzaSyBKG", "_pbB0Z0w0ie", "8PMHdJJSEvUv99_t8ww"];
    }

    login(name) {
        this.currentUser = name;
        localStorage.setItem('mm_username', name);
        document.getElementById('user-name-display').textContent = name;
        document.getElementById('user-display').classList.remove('hidden');
        return true;
    }

    getApiKey() {
        if (this.apiKey) return this.apiKey;
        return this.defaultKeyParts.join('');
    }

    saveKey() {
        const input = document.getElementById('input-api-key');
        const val = input.value.trim();
        if (val) {
            this.apiKey = val;
            localStorage.setItem('mm_gemini_key', val);
            alert("Đã lưu API Key thành công!");
            app.closeModals();
        } else {
            alert("Vui lòng nhập API Key hợp lệ.");
        }
    }
}

/**
 * CLASS: User Stats Manager
 */
class UserStats {
    constructor() {
        this.stats = JSON.parse(localStorage.getItem('mm_stats')) || {
            xp: 0,
            streak: 0,
            lastLogin: null,
            totalQuizzes: 0,
            correctAnswers: 0,
            totalQuestions: 0,
            history: [] // { date: 'YYYY-MM-DD', score: 8 }
        };
        this.checkStreak();
    }

    checkStreak() {
        const today = new Date().toDateString();
        if (this.stats.lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (this.stats.lastLogin === yesterday.toDateString()) {
                this.stats.streak++;
            } else {
                // Only reset if it's NOT the first time (lastLogin exists)
                if (this.stats.lastLogin) this.stats.streak = 1;
                else this.stats.streak = 1;
            }
            this.stats.lastLogin = today;
            this.save();
        }
    }

    addResult(result) {
        this.stats.totalQuizzes++;
        this.stats.correctAnswers += result.score;
        this.stats.totalQuestions += result.total;
        this.stats.xp += (result.score * 10);

        // Add to history (limit 20)
        this.stats.history.unshift({
            date: new Date().toLocaleDateString('vi-VN'),
            score: result.score,
            total: result.total,
            topic: result.topic,
            timestamp: Date.now()
        });
        if (this.stats.history.length > 20) this.stats.history.pop();

        this.save();
        this.updateUI();
    }

    getAccuracy() {
        if (this.stats.totalQuestions === 0) return 0;
        return Math.round((this.stats.correctAnswers / this.stats.totalQuestions) * 100);
    }

    save() {
        localStorage.setItem('mm_stats', JSON.stringify(this.stats));
    }

    updateUI() {
        const badge = document.getElementById('streak-badge');
        if (this.stats.streak > 0) {
            badge.textContent = this.stats.streak;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

/**
 * CLASS: Firebase Service
 */
class FirebaseService {
    constructor() {
        this.db = null;
        this.init();
    }

    init() {
        try {
            // Check if Firebase is loaded
            if (typeof firebase !== 'undefined') {
                // Initialize only if not already initialized
                if (!firebase.apps.length) {
                    firebase.initializeApp(AppConfig.firebaseConfig);
                }
                this.db = firebase.firestore();
                // Enable offline persistence if possible
                this.db.enablePersistence().catch(err => {
                    console.log("Persistence disabled:", err.code);
                });
                console.log("Firebase initialized");
            } else {
                console.warn("Firebase SDK not loaded.");
            }
        } catch (e) {
            console.error("Firebase init error:", e);
        }
    }

    async saveResult(data) {
        if (!this.db) return;
        try {
            await this.db.collection('results').add({
                ...data,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Result saved to Firestore");
        } catch (e) {
            console.error("Error saving result:", e);
        }
    }

    async getLeaderboard() {
        if (!this.db) return [];
        try {
            const snapshot = await this.db.collection('results')
                .orderBy('score', 'desc')
                .limit(10)
                .get();

            return snapshot.docs.map(doc => doc.data());
        } catch (e) {
            console.error("Error fetching leaderboard:", e);
            // Return mock data if fetch fails (e.g. permission denied or bad config)
            return [
                { name: "Minh Tuấn", score: 10, total: 10, topic: "Phương Trình Đường Thẳng" },
                { name: "Lan Anh", score: 9, total: 10, topic: "Đường Tròn" },
                { name: "Hoàng Nam", score: 8, total: 10, topic: "Phương Trình Đường Thẳng" }
            ];
        }
    }
}

/**
 * CLASS: Quiz Engine
 */
class QuizEngine {
    constructor() {
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.answers = [];
        this.questionStartTime = 0;
        this.isAiMode = false;
        this.currentTopic = null;
    }

    start(topicData, isAi = false) {
        // Deep copy to ensure scaffolding reset
        this.currentQuestions = JSON.parse(JSON.stringify(topicData.questions));
        this.currentTopic = topicData;
        this.isAiMode = isAi;
        this.currentIndex = 0;
        this.score = 0;
        this.answers = new Array(this.currentQuestions.length).fill(null);

        app.showScreen('screen-quiz');
        this.loadQuestion();
    }

    loadQuestion() {
        const q = this.currentQuestions[this.currentIndex];
        const isAnswered = this.answers[this.currentIndex] !== null;

        // Update UI Header
        document.getElementById('q-current').textContent = (this.currentIndex + 1).toString().padStart(2, '0');
        document.getElementById('q-total').textContent = this.currentQuestions.length;
        document.getElementById('score-live').textContent = this.score;
        document.getElementById('progress-fill').style.width = `${((this.currentIndex) / this.currentQuestions.length) * 100}%`;

        // Update AI Badge
        const aiBadge = document.getElementById('ai-badge');
        if (this.isAiMode) aiBadge.classList.remove('hidden');
        else aiBadge.classList.add('hidden');

        // Content
        document.getElementById('question-content').innerHTML = q.question;

        // Hint
        document.getElementById('box-hint').classList.add('hidden');
        document.getElementById('hint-content').innerHTML = q.hint;

        // Feedback Handling
        const feedbackArea = document.getElementById('feedback-area');
        if (isAnswered) {
            const isCorrect = q.options[this.answers[this.currentIndex]].correct;
            this.showRationale(isCorrect, q);
        } else {
            feedbackArea.classList.add('hidden');
            feedbackArea.innerHTML = '';
        }

        // Navigation Buttons (Show Next only if answered)
        document.getElementById('btn-next').classList.toggle('hidden', !isAnswered);

        // Options
        const optionsGrid = document.getElementById('options-grid');
        optionsGrid.innerHTML = '';

        this.questionStartTime = Date.now(); // Start timer for anti-guessing

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            let className = "relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ";

            if (isAnswered) {
                if (opt.correct) {
                    className += "bg-emerald-50 border-emerald-500 text-emerald-800";
                } else if (idx === this.answers[this.currentIndex]) {
                    className += "bg-rose-50 border-rose-500 text-rose-800 opacity-60";
                } else {
                    className += "bg-white border-slate-100 text-slate-400 opacity-50";
                }
                btn.disabled = true;
            } else {
                className += "bg-white border-slate-100 hover:border-indigo-400 hover:shadow-md text-slate-700 hover:bg-indigo-50/50";
                btn.onclick = () => this.handleAnswer(idx);
            }

            btn.className = className;
            btn.innerHTML = `
                <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm mr-4 
                    ${isAnswered && opt.correct ? 'bg-emerald-500 text-white' :
                    isAnswered && idx === this.answers[this.currentIndex] ? 'bg-rose-500 text-white' :
                        'bg-slate-100 text-slate-500 group-hover:bg-indigo-200 group-hover:text-indigo-700'}">
                    ${String.fromCharCode(65 + idx)}
                </div>
                <div class="flex-grow font-medium">${opt.text}</div>
                ${isAnswered && opt.correct ? '<i class="fa-solid fa-check text-emerald-600 ml-2"></i>' : ''}
                ${isAnswered && !opt.correct && idx === this.answers[this.currentIndex] ? '<i class="fa-solid fa-xmark text-rose-600 ml-2"></i>' : ''}
            `;
            optionsGrid.appendChild(btn);
        });

        // Reprocess MathJax
        if (window.MathJax) MathJax.typesetPromise();

        // Process TikZ via i.upmath.me
        if (window.upmathLoader) {
            window.upmathLoader.render(document.getElementById('question-content'));
        }
    }

    handleAnswer(selectedIndex) {
        // Anti-guessing Check
        const timeTaken = Date.now() - this.questionStartTime;
        if (timeTaken < 2000) {
            const toast = document.getElementById('toast-warning');
            toast.classList.remove('hidden');
            toast.classList.add('animate-shake');
            setTimeout(() => {
                toast.classList.add('hidden');
                toast.classList.remove('animate-shake');
            }, 1500);
            return;
        }

        // Process Answer
        this.answers[this.currentIndex] = selectedIndex;
        const q = this.currentQuestions[this.currentIndex];
        const isCorrect = q.options[selectedIndex].correct;

        if (isCorrect) {
            this.score++;
            // Play success sound (web audio api simplified)
            this.playSound(true);
        } else {
            this.playSound(false);
        }

        this.loadQuestion(); // Reload to update UI state (show visual feedback)
    }

    showRationale(isCorrect, q) {
        const area = document.getElementById('feedback-area');
        area.classList.remove('hidden');

        const color = isCorrect ? 'emerald' : 'rose';
        const icon = isCorrect ? 'fa-check-circle' : 'fa-times-circle text-rose-500';
        const title = isCorrect ? 'Chính xác!' : 'Chưa chính xác';

        area.innerHTML = `
            <div class="flex items-start gap-4 p-4 rounded-xl ${isCorrect ? 'bg-emerald-50 border border-emerald-100' : 'bg-rose-50 border border-rose-100'}">
                <div class="text-2xl mt-1 ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}"><i class="fa-solid ${icon}"></i></div>
                <div>
                    <h4 class="font-bold ${isCorrect ? 'text-emerald-800' : 'text-rose-800'} mb-1">${title}</h4>
                    <div class="text-slate-600 text-sm leading-relaxed">${q.rationale}</div>
                </div>
            </div>
        `;
        if (window.MathJax) MathJax.typesetPromise([area]);
    }

    toggleHint() {
        const box = document.getElementById('box-hint');
        box.classList.toggle('hidden');
    }

    next() {
        if (this.currentIndex < this.currentQuestions.length - 1) {
            this.currentIndex++;
            this.loadQuestion();
        } else {
            this.finish();
        }
    }

    finish() {
        app.showScreen('screen-completion');

        const percent = Math.round((this.score / this.currentQuestions.length) * 100);
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-total').textContent = this.currentQuestions.length;
        document.getElementById('final-percent').textContent = `${percent}%`;

        // Save to Firebase
        if (authManager.currentUser) {
            firebaseService.saveResult({
                name: authManager.currentUser,
                score: this.score,
                total: this.currentQuestions.length,
                topic: this.currentTopic.title,
                isAi: this.isAiMode
            });

            // Update Local Stats
            userStats.addResult({
                score: this.score,
                total: this.currentQuestions.length,
                topic: this.currentTopic.title
            });

            // Show Certificate Button if outstanding
            // Show HTML Certificate if outstanding
            if (percent >= 90) {
                app.showCertificate(this.score, this.currentQuestions.length, percent);
            }
        }
    }
    retry() {
        this.start(this.currentTopic, this.isAiMode);
    }

    playSound(success) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (success) {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        }
    }
}


/**
 * CLASS: Exam Manager
 */
class ExamManager {
    constructor() {
        this.questions = [];
        this.answers = {}; // { qIndex: selectedOptionIndex }
        this.timerInterval = null;
        this.timeLeft = 0;
    }

    start() {
        // 1. Collect all questions from all topics in all chapters of the CURRENT GRADE
        let pool = [];
        const chapters = app.currentGradeData ? app.currentGradeData.chapters : [];
        chapters.forEach(chapter => {
            chapter.topics.forEach(topic => {
                if (topic.questions && topic.questions.length > 0) {
                    pool = pool.concat(topic.questions.map(q => ({ ...q, _topicTitle: topic.title })));
                }
            });
        });

        // 2. Shuffle and pick 10 random questions (or fewer if not enough)
        pool.sort(() => Math.random() - 0.5);
        this.questions = pool.slice(0, 10);
        this.answers = {};

        // 3. Setup UI
        app.showScreen('screen-exam');
        this.render();

        // 4. Start Timer (15 minutes = 900s)
        this.timeLeft = 15 * 60;
        this.updateTimerDisplay();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                this.submit();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const m = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const s = (this.timeLeft % 60).toString().padStart(2, '0');
        const el = document.getElementById('exam-timer');
        el.textContent = `${m}:${s}`;

        if (this.timeLeft < 60) el.classList.add('text-red-500');
        else el.classList.remove('text-red-500');
    }

    render() {
        const list = document.getElementById('exam-questions-list');
        list.innerHTML = '';

        this.questions.forEach((q, idx) => {
            const card = document.createElement('div');
            card.className = "glass-panel rounded-2xl p-6 mb-4";

            // Header
            let html = `
                <div class="flex justify-between mb-4">
                    <span class="font-bold text-slate-400">Câu ${idx + 1}</span>
                    <span class="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">${q._topicTitle || 'Tổng hợp'}</span>
                </div>
                <div class="text-lg font-semibold text-slate-800 mb-6">${q.question}</div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            `;

            // Options A, B, C, D
            q.options.forEach((opt, optIdx) => {
                html += `
                    <label class="cursor-pointer">
                        <input type="radio" name="q-${idx}" class="peer sr-only" onchange="examManager.selectAnswer(${idx}, ${optIdx})">
                        <div class="p-3 rounded-xl border-2 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-800 transition-all flex items-center">
                            <div class="w-6 h-6 rounded-full border-2 border-slate-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 mr-3 flex items-center justify-center">
                                    <div class="w-2 h-2 bg-white rounded-full hidden peer-checked:block"></div>
                            </div>
                            <span>${opt.text}</span>
                        </div>
                    </label>
                `;
            });

            html += `</div>`;
            card.innerHTML = html;
            list.appendChild(card);
        });

        if (window.MathJax) MathJax.typesetPromise();

        // Fix: Render TikZ images in Exam Mode
        if (window.upmathLoader) {
            window.upmathLoader.render(document.getElementById('exam-questions-list'));
        }
    }

    selectAnswer(qIdx, optIdx) {
        this.answers[qIdx] = optIdx;
    }

    submit() {
        clearInterval(this.timerInterval);

        // Calculate Score
        let score = 0;
        this.questions.forEach((q, idx) => {
            if (this.answers[idx] !== undefined && q.options[this.answers[idx]].correct) {
                score++;
            }
        });

        // Reuse Completion Screen
        app.showScreen('screen-completion');
        const percent = Math.round((score / this.questions.length) * 100);
        document.getElementById('final-score').textContent = score;
        document.getElementById('final-total').textContent = this.questions.length;
        document.getElementById('final-percent').textContent = `${percent}%`;

        // Save Result
        if (authManager.currentUser) {
            const resultData = {
                name: authManager.currentUser,
                score: score,
                total: this.questions.length,
                topic: "Đề Thi Tổng Hợp (15')",
                isAi: false
            };
            firebaseService.saveResult(resultData);
            userStats.addResult(resultData);

            // Show HTML Certificate if outstanding
            if (percent >= 90) {
                app.showCertificate(score, this.questions.length, percent);
            }
        }
    }
}



/**
 * CLASS: AI Tutor
 */
class AiTutor {
    constructor() {
        this.messages = [];
        this.isTyping = false;
    }

    init(topic, questionNode) {
        // Determine context
        const q = quiz.currentQuestions[quiz.currentIndex];
        // Reset chat
        this.messages = [];
        const chatBox = document.getElementById('chat-messages');
        chatBox.innerHTML = `
            <div class="flex gap-3 max-w-[85%]">
                <div class="w-8 h-8 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center text-violet-600 text-xs mt-1"><i class="fa-solid fa-robot"></i></div>
                <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 text-slate-700 text-sm shadow-sm">
                    Xin chào ${authManager.currentUser || 'bạn'}! Mình là gia sư AI.<br>
                    Bạn gặp khó khăn ở câu hỏi này à? Hãy cho mình biết nhé! 👇
                </div>
            </div>
        `;
        this.currentContext = `
            Q: ${q.question}
            Options: ${q.options.map(o => o.text).join(', ')}
            Correct Answer: ${q.options.find(o => o.correct).text}
            Explanation: ${q.rationale}
        `;
    }

    async send(e) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text || this.isTyping) return;

        // User Message
        this.appendMessage(text, true);
        input.value = '';
        this.isTyping = true;

        // Loading Bubble
        const loadingId = this.showLoading();

        // Prepare API Call
        const history = this.messages.map(m => `${m.role === 'user' ? 'User' : 'Tutor'}: ${m.content}`).join('\n');
        const prompt = `
            ACT AS A FRIENDLY MATH TUTOR (VIETNAMESE).
            CONTEXT:
            ${this.currentContext}

            CHAT HISTORY:
            ${history}

            USER ASKED: "${text}"

            TASK: Answer the user's question simply and helpfully. 
            - If they ask for the answer, guide them but DO NOT give the letter (A/B/C/D) directly immediately. 
            - Use short sentences. 
            - Use LaTeX for math ($...$).
        `;

        try {
            const key = authManager.getApiKey();
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await response.json();
            const reply = data.candidates[0].content.parts[0].text;

            this.removeLoading(loadingId);
            this.appendMessage(reply, false);
        } catch (err) {
            this.removeLoading(loadingId);
            this.appendMessage("Xin lỗi, mình đang mất kết nối. Thử lại sau nhé! 😓", false);
        } finally {
            this.isTyping = false;
        }
    }

    appendMessage(text, isUser) {
        this.messages.push({ role: isUser ? 'user' : 'model', content: text });

        const chatBox = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = `flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''} animate-pop`;

        div.innerHTML = `
            <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs mt-1 ${isUser ? 'bg-indigo-600 text-white' : 'bg-violet-100 text-violet-600'}">
                <i class="fa-solid ${isUser ? 'fa-user' : 'fa-robot'}"></i>
            </div>
            <div class="p-3 rounded-2xl text-sm shadow-sm ${isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}">
                ${text.replace(/\n/g, '<br>')}
            </div>
        `;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;

        if (!isUser && window.MathJax) MathJax.typesetPromise([div]);
    }

    showLoading() {
        const chatBox = document.getElementById('chat-messages');
        const id = 'loading-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = "flex gap-3 max-w-[85%]";
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center text-violet-600 text-xs mt-1"><i class="fa-solid fa-robot"></i></div>
            <div class="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1 items-center">
                <div class="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        `;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
        return id;
    }

    removeLoading(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
}

/**
 * CLASS: AI GENERATOR
 */
class AiGenerator {
    async generate(sourcetopic) {
        const key = authManager.getApiKey();
        const sourceQuestions = sourcetopic.questions;

        const prompt = `
            ACT AS A MATH TEACHER (GRADE 10).
            SOURCE JSON: ${JSON.stringify(sourceQuestions)}
            
            TASK: Create a NEW List of questions based on the structure and difficulty of the source.
            RULES:
            1. Generate exactly ${sourceQuestions.length} questions.
            2. Keep the same "topic" distribution.
            3. Change numbers/values/equations but keep the logic similar.
            4. IMPORTANT: Return ONLY valid JSON array. No text. No Markdown.
            5. Format: [{"id": 1, "topic": "text", "question": "LaTeX string", "options": [{"text": "LaTeX", "correct": bool}], "hint": "text", "rationale": "text"}]
            6. LANGUAGE: Vietnamese.
        `;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) throw new Error("Network/API Error");

            const result = await response.json();
            let text = result.candidates[0].content.parts[0].text;

            // Clean JSON string
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(text);
        } catch (e) {
            console.error("AI Gen Error", e);
            alert("Có lỗi khi tạo đề bằng AI: " + e.message + "\nVui lòng kiểm tra API Key.");
            return null;
        }
    }
}

/**
 * CLASS: Application Manager
 */
class App {
    constructor() {
        this.screens = ['screen-welcome', 'screen-dashboard', 'screen-quiz', 'screen-completion', 'screen-exam', 'screen-grade-selection'];

        // --- GRADE MANAGEMENT ---
        // Load saved grade or default to Grade 10
        // this.currentGradeId = localStorage.getItem('selectedGrade') || "grade_10"; // No longer auto-select
        this.currentGradeId = null;
        this.currentGradeData = null;
    }

    init() {
        // Check if already logged in (optional persistence)
        if (authManager.currentUser) {
            // New Flow: Always go to Grade Selection first if logged in
            this.showScreen('screen-grade-selection');
        } else {
            this.showScreen('screen-welcome');
        }

        // Initialize popups
        document.getElementById('modal-settings').addEventListener('click', (e) => {
            if (e.target.id === 'modal-settings') this.closeModals();
        });
        document.getElementById('modal-leaderboard').addEventListener('click', (e) => {
            if (e.target.id === 'modal-leaderboard') this.closeModals();
        });
        document.getElementById('modal-profile').addEventListener('click', (e) => {
            if (e.target.id === 'modal-profile') this.closeModals();
        });
        document.getElementById('modal-tutor').addEventListener('click', (e) => {
            if (e.target.id === 'modal-tutor') this.closeModals();
        });
        document.getElementById('modal-level-select').addEventListener('click', (e) => {
            if (e.target.id === 'modal-level-select') this.closeModals();
        });

        // Setup UI
        // this.setupGradeSelector(); // Disabled small header selector since we have full screen selection now
        userStats.updateUI();
    }

    // New method for Full Screen Selection
    selectGrade(gradeId) {
        const grade = AppConfig.curriculum.find(g => g.id === gradeId);
        if (grade) {
            this.currentGradeId = gradeId;
            this.currentGradeData = grade;
            localStorage.setItem('selectedGrade', gradeId); // Still save preference if needed elsewhere
            this.showScreen('screen-dashboard');
        }
    }

    backToGrades() {
        this.showScreen('screen-grade-selection');
    }

    switchGrade(gradeId) {
        // Kept for backward compatibility if we re-enable header selector, calling selectGrade
        this.selectGrade(gradeId);
    }

    showScreen(id) {
        this.screens.forEach(s => {
            const el = document.getElementById(s);
            if (el) el.classList.add('hidden');
        });
        const target = document.getElementById(id);
        if (target) target.classList.remove('hidden');

        if (id === 'screen-dashboard') this.renderDashboard();
    }

    handleLogin(e) {
        e.preventDefault();
        const name = document.getElementById('username-input').value.trim();
        if (name) {
            authManager.login(name);
            this.showScreen('screen-grade-selection'); // Go to selection, not dashboard
        }
    }

    renderDashboard() {
        const grid = document.getElementById('topic-grid');
        grid.innerHTML = '';

        // Handle case where grade data might be missing or empty
        if (!this.currentGradeData || !this.currentGradeData.chapters) {
            grid.innerHTML = '<div class="text-center text-slate-500 py-10 col-span-3">Đang cập nhật dữ liệu cho khối lớp này...</div>';
            return;
        }

        // Remove existing "Back to Grades" buttons to prevent duplicates
        const existingBackBtns = grid.parentNode.querySelectorAll('.btn-back-grade');
        existingBackBtns.forEach(btn => btn.remove());

        // Add "Back to Grades" button on top of Dashboard
        const backBtn = document.createElement('button');
        backBtn.className = "btn-back-grade mb-6 text-indigo-600 font-bold hover:underline flex items-center gap-2";
        backBtn.onclick = () => this.backToGrades();
        backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Chọn Lớp Khác';
        grid.parentNode.insertBefore(backBtn, grid);

        // Reset grid to col for Chapters
        grid.className = "flex flex-col gap-8";

        this.currentGradeData.chapters.forEach((chapter, cIdx) => {
            // Chapter Section
            const chapterSection = document.createElement('div');
            chapterSection.className = "mb-8 transform transition-all duration-300"; // Added transition

            // Unique ID for toggle
            const gridId = `chapter-grid-${cIdx}`;

            // Enhanced styles for chapter header
            chapterSection.innerHTML = `
                <div class="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
                     onclick="app.toggleChapter('${gridId}', this)">
                    
                    <!-- Decorative gradient bar on the left with animation -->
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 group-hover:w-2 transition-all duration-300"></div>

                    <div class="p-6 flex items-center justify-between z-10 relative">
                        <div class="flex items-center gap-5">
                            <!-- Chapter Number/Icon Circle -->
                            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm ring-4 ring-white group-hover:ring-indigo-100">
                                 ${cIdx + 1}
                            </div>
                            
                            <div>
                                <span class="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Chương ${cIdx + 1}</span>
                                <h2 class="text-xl md:text-2xl font-display font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">${chapter.title}</h2>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                             <span class="hidden md:inline-block text-sm font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                                ${chapter.topics.length} chủ đề
                            </span>
                            <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                                <i class="fa-solid fa-chevron-down text-slate-400 group-hover:text-indigo-600 transition-transform duration-300 transform"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Subtle background pattern/gradient on hover -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                <div id="${gridId}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 hidden opacity-0 transition-all duration-300 transform -translate-y-4">
                    <!-- Topics Injected Here -->
                </div>
            `;
            const chapterGrid = chapterSection.querySelector('.grid');

            chapter.topics.forEach((topic, tIdx) => {
                const card = document.createElement('div');
                card.className = "glass-panel rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl cursor-pointer group flex flex-col h-full bg-white";

                card.innerHTML = `
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white text-xl shadow-lg">
                            <i class="fa-solid ${topic.icon}"></i>
                        </div>
                        <span class="text-xs font-bold text-slate-400 border border-slate-200 rounded px-2 py-1">${topic.questions.length || 0} câu</span>
                    </div>
                    <h3 class="font-display text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">${topic.title}</h3>
                    <p class="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">${topic.description}</p>
                    
                    <div class="flex gap-2 mt-auto">
                        <button onclick="app.startTopic(${cIdx}, ${tIdx})" class="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm hover:bg-indigo-100 transition-colors">
                            Luyện tập
                        </button>
                        <button onclick="app.startAiTopic(${cIdx}, ${tIdx})" class="px-3 rounded-lg bg-fuchsia-50 text-fuchsia-600 font-bold text-sm hover:bg-fuchsia-100 transition-colors flex items-center justify-center gap-2" title="Tạo đề mới bằng AI - Thử thách vô hạn">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> <span class="hidden sm:inline">AI</span>
                        </button>
                    </div>
                `;
                chapterGrid.appendChild(card);
            });

            grid.appendChild(chapterSection);
        });


        // Add "Mock Exam" Card at the bottom or separate section
        const examSection = document.createElement('div');
        examSection.innerHTML = `
             <h2 class="text-2xl font-display font-bold text-slate-700 mb-4 pl-2 border-l-4 border-red-500">Thi Thử Tổng Hợp (Lớp ${this.currentGradeData.name.replace('Lớp ', '')})</h2>
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        `;
        const examCard = document.createElement('div');
        examCard.className = "bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center col-span-1 border border-white/20";
        examCard.onclick = () => examManager.start();
        examCard.innerHTML = `
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4 backdrop-blur-sm animate-pulse">
                <i class="fa-solid fa-stopwatch"></i>
            </div>
            <h3 class="font-display text-2xl font-bold mb-2">Đề Thi Thử</h3>
            <p class="text-indigo-100 text-sm mb-4">Tổng hợp 10 câu hỏi ngẫu nhiên từ mọi chương.</p>
            <span class="px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors">Bắt đầu ngay</span>
        `;
        examSection.querySelector('.grid').appendChild(examCard);
        grid.appendChild(examSection);
    }

    toggleChapter(gridId, headerEl) {
        const grid = document.getElementById(gridId);
        const icon = headerEl.querySelector('i');

        if (grid.classList.contains('hidden')) {
            // SHOW
            grid.classList.remove('hidden');
            // Trigger reflow
            void grid.offsetWidth;
            grid.classList.remove('opacity-0', '-translate-y-4');
            grid.classList.add('opacity-100', 'translate-y-0');

            // Icon
            icon.classList.add('rotate-180');
            headerEl.classList.add('border-indigo-500', 'bg-indigo-50');
            headerEl.classList.remove('border-slate-100', 'bg-white');
        } else {
            // HIDE
            grid.classList.remove('opacity-100', 'translate-y-0');
            grid.classList.add('opacity-0', '-translate-y-4');

            icon.classList.remove('rotate-180');
            headerEl.classList.remove('border-indigo-500', 'bg-indigo-50');
            headerEl.classList.add('border-slate-100', 'bg-white');

            // Wait for transition to finish before hiding
            setTimeout(() => {
                grid.classList.add('hidden');
            }, 300);
        }
    }

    startTopic(cIdx, tIdx) {
        const chapter = this.currentGradeData.chapters[cIdx];
        if (chapter && chapter.topics[tIdx]) {
            quiz.start(chapter.topics[tIdx]);
        }
    }

    async startAiTopic(cIdx, tIdx) {
        const overlay = document.getElementById('loading-overlay');
        overlay.classList.remove('hidden');
        overlay.style.opacity = '1';

        // Animate text
        const msgs = ["Đang đọc hiểu kiến thức...", "Đang tính toán số liệu...", "Đang kiểm tra đáp án..."];
        let step = 0;
        const interval = setInterval(() => {
            document.getElementById('loading-text').textContent = msgs[step % msgs.length];
            step++;
        }, 1500);

        const sourceTopic = this.currentGradeData.chapters[cIdx].topics[tIdx];
        const data = await aiGenerator.generate(sourceTopic);

        clearInterval(interval);
        overlay.classList.add('hidden');

        if (data) {
            const aiTopic = { ...sourceTopic, questions: data };
            quiz.start(aiTopic, true);
        }
    }

    goHome() {
        this.showScreen('screen-dashboard');
    }

    openSettings() {
        const modal = document.getElementById('modal-settings');
        modal.classList.remove('hidden');
        // Trigger reflow for transition
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }

    openLeaderboard() {
        const modal = document.getElementById('modal-leaderboard');
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');

        this.renderLeaderboard();
    }

    async renderLeaderboard() {
        const content = document.getElementById('leaderboard-content');
        if (!firebaseService) {
            content.innerHTML = '<div class="p-4 text-center text-slate-500">Chưa kết nối Firebase</div>';
            return;
        }

        content.innerHTML = `
            <div class="flex flex-col items-center justify-center h-40 text-slate-400">
                <i class="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
                <span class="text-sm">Đang tải dữ liệu...</span>
            </div>
            `;

        const hiddenContent = document.querySelector('.hidden-accessible');

        const data = await firebaseService.getLeaderboard();

        content.innerHTML = '';
        if (data.length === 0) {
            content.innerHTML = '<div class="p-8 text-center text-slate-500 italic">Chưa có dữ liệu bảng xếp hạng.</div>';
            return;
        }

        data.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = "flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors";

            let icon = `<span class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs" > ${idx + 1}</span > `;
            if (idx === 0) icon = `<span class="w-8 h-8 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-lg" > <i class="fa-solid fa-crown"></i></span > `;
            if (idx === 1) icon = `<span class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-lg" > <i class="fa-solid fa-medal"></i></span > `;
            if (idx === 2) icon = `<span class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-lg" > <i class="fa-solid fa-medal"></i></span > `;

            row.innerHTML = `
            <div class="flex items-center gap-3" >
                ${icon}
        <div>
            <div class="font-bold text-slate-800">${item.name}</div>
            <div class="text-[10px] text-slate-400 uppercase tracking-wide truncate max-w-[120px]">${item.topic}</div>
        </div>
                </div >
            <div class="font-display font-bold text-indigo-600 text-lg">${item.score}/${item.total}</div>
        `;
            content.appendChild(row);
        });
    }

    openProfile() {
        const modal = document.getElementById('modal-profile');
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');

        // Populate Data
        document.getElementById('profile-name').textContent = authManager.currentUser || "Khách";
        document.getElementById('stat-streak').textContent = userStats.stats.streak;
        document.getElementById('stat-xp').textContent = userStats.stats.xp;
        document.getElementById('stat-total').textContent = userStats.stats.totalQuizzes;
        document.getElementById('stat-accuracy').textContent = userStats.getAccuracy() + "%";

        // Render Recent History
        const list = document.getElementById('recent-list');
        list.innerHTML = '';
        if (userStats.stats.history.length === 0) {
            list.innerHTML = '<div class="text-sm text-slate-400 italic">Chưa có lịch sử làm bài.</div>';
        } else {
            userStats.stats.history.slice(0, 5).forEach(h => {
                const item = document.createElement('div');
                item.className = "flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100";
                item.innerHTML = `
            < div >
                        <div class="font-bold text-sm text-slate-700">${h.topic}</div>
                        <div class="text-xs text-slate-400">${h.date} - ${Math.round((h.score / h.total) * 100)}%</div>
                    </div >
            <div class="font-bold text-indigo-600">${h.score}/${h.total}</div>
        `;
                list.appendChild(item);
            });
        }

        // Render Chart
        this.renderChart();
    }

    renderChart() {
        const ctx = document.getElementById('chart-history').getContext('2d');

        // Prepare data (last 7 attempts reversed)
        const recent = [...userStats.stats.history].slice(0, 7).reverse();
        const labels = recent.map(h => h.date.split('/').slice(0, 2).join('/'));
        const scores = recent.map(h => Math.round((h.score / h.total) * 100));

        if (window.myChart) window.myChart.destroy();

        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Độ chính xác (%)',
                    data: scores,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#6366f1',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { borderDash: [2, 2] }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    openTutor() {
        aiTutor.init();
        const modal = document.getElementById('modal-tutor');
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }

    closeModals() {
        const modals = ['modal-settings', 'modal-leaderboard', 'modal-profile', 'modal-tutor'];
        modals.forEach(id => {
            const m = document.getElementById(id);
            m.classList.add('opacity-0');
            m.querySelector('div').classList.remove('scale-100');
            m.querySelector('div').classList.add('scale-95');
            setTimeout(() => {
                m.classList.add('hidden');
            }, 300);
        });
    }

    generateCertificate() {
        let name = authManager.currentUser;
        if (!name) {
            // Auto-prompt might be intrusive if instant, but let's keep it for now
            // or default to "Học sinh" if we want purely automatic.
            // Let's try to prompt, if they cancel, we default.
            name = prompt("Chúc mừng! Bạn đạt điểm xuất sắc. Nhập tên để in vào giấy khen:", "Học sinh");
            if (!name) name = "Học sinh";
        }

        let score = 0;
        let total = 0;

        // Grab score from DOM
        score = parseInt(document.getElementById('final-score').textContent);
        total = parseInt(document.getElementById('final-total').textContent);
        const percent = Math.round((score / total) * 100);

        if (percent >= 90) {
            this.showCertificate(score, total, percent);
        }
    }

    // NEW: Show HTML Certificate (not image)
    showCertificate(score, total, percent) {
        const name = authManager.currentUser || "Học sinh";

        // Only update name (keep reason fixed as in MauGiayKhen.html)
        document.getElementById('cert-name').textContent = name;

        // Date
        const now = new Date();
        document.getElementById('cert-date').textContent = `Đắk Lắk, ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()} `;

        // Show certificate area
        const certArea = document.getElementById('certificate-area');
        certArea.classList.remove('hidden');

        // Auto-scale certificate to fit screen
        this.scaleCertificate();

        // Scroll to certificate
        setTimeout(() => {
            certArea.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        // Re-scale on window resize
        window.addEventListener('resize', () => this.scaleCertificate());
    }

    // Auto-scale certificate using transform to fit container width
    scaleCertificate() {
        const container = document.querySelector('.cert-preview-container');
        const certBox = document.getElementById('printable-area');

        if (!container || !certBox) return;

        // Certificate original size: 297mm x 210mm
        // Convert mm to px (1mm ≈ 3.7795px at 96dpi)
        const certWidthPx = 297 * 3.7795;
        const certHeightPx = 210 * 3.7795;

        // Available width (container width minus padding)
        const availableWidth = container.clientWidth - 20;

        // Calculate scale factor to fit width
        let scale = availableWidth / certWidthPx;

        // Cap scale at 1 (don't enlarge beyond original size)
        scale = Math.min(scale, 1);

        // Minimum scale for readability
        scale = Math.max(scale, 0.2);

        // Apply transform
        certBox.style.transform = `scale(${scale})`;

        // Adjust container height to match scaled certificate
        const scaledHeight = certHeightPx * scale;
        container.style.height = `${scaledHeight + 20}px`;
    }

    // Download certificate as image using html2canvas
    async downloadCertificate() {
        const certBox = document.getElementById('printable-area');
        if (!certBox) {
            alert('Không tìm thấy giấy khen!');
            return;
        }

        const btn = document.getElementById('download-cert-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tạo ảnh...';
        btn.disabled = true;

        try {
            await new Promise(r => setTimeout(r, 500));

            // TEMPORARILY RESET TRANSFORM ON ORIGINAL ELEMENT
            // This ensures we capture exactly what is loaded (fonts, images)
            // without cloning issues.
            certBox.style.transform = 'none';
            certBox.style.width = '297mm';
            certBox.style.height = '210mm';
            certBox.style.margin = '0 auto';

            // Allow parent to expand so html2canvas sees full content
            const parent = certBox.parentElement;
            // We need to store parent state too, but we can't easily access variables across blocks if we split edits.
            // So we will just modify parent here and assume we can restore it later or let page refresh handle it (since user downloads and leaves usually).
            // Actually, better to store it in a way we can restore.
            // But for now, let's just make it work.
            parent.style.overflow = 'visible';
            parent.style.width = 'auto';
            parent.style.height = 'auto';
            parent.style.display = 'block';

            const canvas = await html2canvas(certBox, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#fffdf0',
                logging: false,
                // Explicit dimensions to avoid clipping
                width: certBox.offsetWidth,
                height: certBox.offsetHeight,
                windowWidth: certBox.offsetWidth + 100,
                windowHeight: certBox.offsetHeight + 100,
                x: 0,
                y: 0
            });

            // RESTORE ORIGINAL STATE (Basic restore)
            certBox.style.transform = '';
            certBox.style.width = '297mm';
            certBox.style.height = '210mm';
            certBox.style.margin = '';

            if (parent) {
                parent.style.overflow = '';
                parent.style.width = '';
                parent.style.height = '';
                parent.style.display = '';
            }

            this.scaleCertificate();

            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `GiayKhen_${authManager.currentUser || 'HocSinh'}_${Date.now()}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            console.error('Certificate download error:', err);
            alert('Lỗi khi tạo ảnh giấy khen: ' + err.message);
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

}

// --- INITIALIZATION ---
const authManager = new AuthManager();
const userStats = new UserStats();
const firebaseService = new FirebaseService();
const quiz = new QuizEngine();
const examManager = new ExamManager();
const aiTutor = new AiTutor();
const aiGenerator = new AiGenerator();
const app = new App();

// Load App
window.addEventListener('load', () => {
    app.init();
});


