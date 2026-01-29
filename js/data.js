/**
 * APP CONFIGURATION & DATA
 */
const AppConfig = {
    firebaseConfig: {
        // Placeholder - Users should ideally replace this or I use a public demo one if needed. 
        // For this exercise, I will set up standard fields. Logic will handle "missing config" gracefully.
        apiKey: "PLACEHOLDER_API_KEY",
        authDomain: "math-quiz-demo.firebaseapp.com",
        projectId: "math-quiz-demo",
        storageBucket: "math-quiz-demo.appspot.com",
        messagingSenderId: "000000000000",
        appId: "1:000000000000:web:0000000000000000000000"
    },
    curriculum: [
        {
            id: "grade_10",
            name: "Lớp 10",
            active: true,
            chapters: [

                {
                    title: "Chương: Phương Pháp Tọa Độ Trong Mặt Phẳng",
                    topics: [
                        {
                            id: "topic_lines",
                            title: "Phương Trình Đường Thẳng",
                            icon: "fa-ruler-combined",
                            color: "from-blue-500 to-cyan-500",
                            description: "Vectơ chỉ phương, pháp tuyến, PT tham số, tổng quát, khoảng cách và góc.",
                            questions: [
                                {
                                    id: 1,
                                    topic: "Vectơ chỉ phương",
                                    type: "basic",
                                    difficulty: "basic",
                                    question: "Một vectơ chỉ phương của đường thẳng $\\begin{cases}x=2+3t\\\\ y=-3-t\\end{cases}$ là:",
                                    options: [
                                        { text: "$\\vec{u}=(2;-3)$", correct: false },
                                        { text: "$\\vec{u}=(3;-1)$", correct: true },
                                        { text: "$\\vec{u}=(3;1)$", correct: false },
                                        { text: "$\\vec{u}=(3;-3)$", correct: false }
                                    ],
                                    hint: "Với phương trình tham số $\\begin{cases}x=x_0+at\\\\ y=y_0+bt\\end{cases}$, vectơ chỉ phương là $\\vec{u}=(a;b)$.",
                                    rationale: "Phương trình đường thẳng có dạng $\\begin{cases}x=x_0+at\\\\ y=y_0+bt\\end{cases}$ với $a=3, b=-1$.<br>Do đó, vectơ chỉ phương là $\\vec{u}=(3; -1)$."
                                },
                                {
                                    id: 2,
                                    topic: "Điểm thuộc đường thẳng",
                                    difficulty: "basic",
                                    question: "Cho đường thẳng $\\Delta: \\begin{cases}x=2-5t\\\\ y=-1+3t\\end{cases}$. Trong các điểm có toạ độ dưới đây, điểm nào nằm trên đường thẳng $\\Delta$?",
                                    options: [
                                        { text: "$(-3;-2)$", correct: false },
                                        { text: "$(2;-1)$", correct: true },
                                        { text: "$(-2;1)$", correct: false },
                                        { text: "$(-5;3)$", correct: false }
                                    ],
                                    hint: "Thay tọa độ $(x;y)$ vào hệ phương trình, nếu tìm được cùng một giá trị $t$ thì điểm đó thuộc đường thẳng. Hoặc dễ thấy với $t=0$ ta có điểm nào?",
                                    rationale: "Thay $t=0$ vào phương trình tham số, ta được $x=2$ và $y=-1$.<br>Vậy điểm $(2; -1)$ thuộc đường thẳng $\\Delta$."
                                },
                                {
                                    id: 3,
                                    topic: "PT tham số",
                                    difficulty: "basic",
                                    question: "Trong mặt phẳng tọa độ $Oxy$, đường thẳng $d$ đi qua điểm $A(1;-2)$ và có vectơ chỉ phương $\\vec{u}=(3;5)$ có phương trình tham số là:",
                                    options: [
                                        { text: "$\\begin{cases}x=3+2t\\\\ y=5+t\\end{cases}$", correct: false },
                                        { text: "$\\begin{cases}x=3+t\\\\ y=5-2t\\end{cases}$", correct: false },
                                        { text: "$\\begin{cases}x=1+3t\\\\ y=-2+5t\\end{cases}$", correct: true },
                                        { text: "$\\begin{cases}x=1+5t\\\\ y=-2-3t\\end{cases}$", correct: false }
                                    ],
                                    hint: "Phương trình tham số đi qua $M(x_0; y_0)$ với vtcp $\\vec{u}=(a;b)$ là $\\begin{cases}x=x_0+at\\\\ y=y_0+bt\\end{cases}$.",
                                    rationale: "Thay tọa độ điểm đi qua $(1; -2)$ và vectơ chỉ phương $(3; 5)$ vào công thức tổng quát, ta được:<br>$\\begin{cases}x=1+3t\\\\ y=-2+5t\\end{cases}$."
                                },
                                {
                                    id: 4,
                                    topic: "Khoảng cách",
                                    difficulty: "advanced",
                                    question: "Khoảng cách từ điểm $M(4;-2)$ đến đường thẳng $\\Delta: x-2y+2=0$ bằng:",
                                    options: [
                                        { text: "$\\frac{2\\sqrt{5}}{5}$", correct: false },
                                        { text: "$2\\sqrt{5}$", correct: true },
                                        { text: "$2$", correct: false },
                                        { text: "$\\sqrt{5}$", correct: false }
                                    ],
                                    hint: "Công thức khoảng cách: $d(M, \\Delta) = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$.",
                                    rationale: "Áp dụng công thức khoảng cách:<br>$$d = \\frac{|1(4) - 2(-2) + 2|}{\\sqrt{1^2 + (-2)^2}} = \\frac{|4 + 4 + 2|}{\\sqrt{5}} = \\frac{10}{\\sqrt{5}} = 2\\sqrt{5}$$"
                                },
                                {
                                    id: 5,
                                    topic: "Góc giữa 2 đường thẳng",
                                    difficulty: "advanced",
                                    question: "Cho $\\Delta_1: x-2y+3=0$ và $\\Delta_2: -2x-y+5=0$. Số đo góc giữa hai đường thẳng này là:",
                                    options: [
                                        { text: "$30^\\circ$", correct: false },
                                        { text: "$45^\\circ$", correct: false },
                                        { text: "$90^\\circ$", correct: true },
                                        { text: "$60^\\circ$", correct: false }
                                    ],
                                    hint: "Tính tích vô hướng hai vectơ pháp tuyến $\\vec{n_1}$ và $\\vec{n_2}$. Nếu bằng 0 thì hai đường thẳng vuông góc.",
                                    rationale: "Ta có $\\vec{n_1}=(1; -2)$ và $\\vec{n_2}=(-2; -1)$.<br>Tích vô hướng: $\\vec{n_1}.\\vec{n_2} = 1.(-2) + (-2).(-1) = -2 + 2 = 0$.<br>Vì tích vô hướng bằng 0 nên hai vectơ vuông góc, suy ra góc giữa hai đường thẳng là $90^\\circ$."
                                }
                            ]
                        },
                        {
                            id: "topic_circle",
                            title: "Phương Trình Đường Tròn",
                            icon: "fa-circle-notch",
                            color: "from-emerald-500 to-teal-500",
                            description: "Tâm, bán kính, phương trình chính tắc và phương trình tổng quát.",
                            questions: [
                                {
                                    id: 1,
                                    topic: "Tìm tâm và bán kính",
                                    question: "Tìm tọa độ tâm $I$ và bán kính $R$ của đường tròn $(C): (x - 1)^2 + (y + 3)^2 = 16$ là:",
                                    options: [
                                        { text: "$I(-1; 3), R = 4$", correct: false },
                                        { text: "$I(1; -3), R = 4$", correct: true },
                                        { text: "$I(1; -3), R = 16$", correct: false },
                                        { text: "$I(-1; 3), R = 16$", correct: false }
                                    ],
                                    hint: "So sánh với phương trình chuẩn $(x-a)^2 + (y-b)^2 = R^2$.",
                                    rationale: "Phương trình đường tròn có dạng $(x-a)^2 + (y-b)^2 = R^2$ có tâm $I(a;b)$ và bán kính $R$.<br>Từ phương trình $(x - 1)^2 + (y + 3)^2 = 16$, ta có:<br> $a = 1$, $b = -3$, $R^2 = 16 \\Rightarrow R = 4$.<br>Vậy tâm $I(1; -3)$ và bán kính $R=4$."
                                }
                            ]
                        },
                        {
                            id: "topic_conic",
                            title: "Ba Đường Conic",
                            icon: "fa-infinity",
                            color: "from-amber-500 to-orange-500",
                            description: "Elip, Hypebol, Parabol và các yếu tố hình học liên quan.",
                            questions: []
                        }
                    ]
                },
                {
                    title: "Chương: Hàm Số",
                    topics: [
                        {
                            id: "topic_func_basic",
                            title: "Hàm Số",
                            icon: "fa-chart-line",
                            color: "from-violet-500 to-purple-500",
                            description: "Khái niệm, tập xác định, sự biến thiên và đồ thị.",
                            questions: []
                        },
                        {
                            id: "topic_quad",
                            title: "Hàm Số Bậc Hai",
                            icon: "fa-parabola",
                            color: "from-pink-500 to-rose-500",
                            description: "Đồ thị Parabol, đỉnh, trục đối xứng và bảng biến thiên.",
                            questions: []
                        },
                        {
                            id: "topic_quad_ineq",
                            title: "Dấu Của Tam Thức Bậc Hai",
                            icon: "fa-plus-minus",
                            color: "from-indigo-500 to-blue-600",
                            description: "Xét dấu tam thức bậc hai và giải bất phương trình bậc hai.",
                            questions: []
                        },
                        {
                            id: "topic_sqrt_eq",
                            title: "PT Chứa Căn Quy Về Bậc 2",
                            icon: "fa-square-root-variable",
                            color: "from-fuchsia-500 to-pink-600",
                            description: "Các dạng phương trình vô tỉ cơ bản và phương pháp giải.",
                            questions: []
                        }
                    ]
                }
            ]
        },
        {
            id: "grade_8",
            name: "Lớp 8",
            active: true,
            chapters: [
                {
                    title: "Chương 1: Phép nhân và phép chia các đa thức",
                    topics: [
                        { id: "topic_8_1", title: "Nhân đơn thức với đa thức", icon: "fa-calculator", color: "from-blue-400 to-indigo-500", description: "Quy tắc nhân, ví dụ vận dụng.", questions: [] },
                        { id: "topic_8_2", title: "Những hằng đẳng thức đáng nhớ", icon: "fa-superscript", color: "from-purple-400 to-pink-500", description: "Bình phương của một tổng, một hiệu...", questions: [] }
                    ]
                },
                {
                    title: "Chương: Định Lý Ta-lét & Tam Giác Đồng Dạng",
                    topics: [
                        {
                            id: "topic_thales_1",
                            title: "Định Lý Ta-lét",
                            icon: "fa-shapes",
                            color: "from-emerald-500 to-teal-500",
                            description: "Tỉ số đoạn thẳng, định lý thuận và đảo, hệ quả.",
                            questions: [
                                {
                                    id: 101,
                                    difficulty: "basic",
                                    question: "Cho $AB=16$ cm, $CD=3$ dm. Tính tỉ số $\\frac{AB}{CD}$.",
                                    options: [
                                        { text: "$\\frac{AB}{CD}=\\frac{3}{16}$", correct: false },
                                        { text: "$\\frac{AB}{CD}=\\frac{15}{8}$", correct: false },
                                        { text: "$\\frac{AB}{CD}=\\frac{8}{15}$", correct: true },
                                        { text: "$\\frac{AB}{CD}=\\frac{16}{3}$", correct: false }
                                    ],
                                    rationale: "Ta có $AB=16$ cm, $CD=3$ dm $=30$ cm. Do đó $\\frac{AB}{CD}=\\frac{16}{30}=\\frac{8}{15}$."
                                },
                                {
                                    id: 102,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Cho hình vẽ biết $AB \\parallel DE$, phát biểu nào sau đây <strong>đúng</strong>?</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=1]
                                                    \\tikzset{declare function={a=3.5;b=2.5;c=2;}}
                                                    \\pgfmathsetmacro{\\goc}{acos((a*a+c*c-b*b)/(2*a*c))}
                                                    \\draw (0,0)coordinate (D)--+(0:a)coordinate (E)--+(\\goc:c)coordinate (C)--cycle
                                                    (C)--($(E)!1.5!(C)$)coordinate (A)--($(D)!1.5!(C)$)coordinate (B)--cycle;
                                                    \\foreach \\point/\\goc in {A/170,B/80,C/0,D/190,E/-10}{
                                                        \\draw[fill=black](\\point)circle(.8pt)+(\\goc:2mm)node[scale=.8]{$\\point$};
                                                    }
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$\\frac{AC}{CD}=\\frac{BC}{CE}$", correct: false },
                                        { text: "$\\frac{AC}{AE}=\\frac{BC}{CD}$", correct: false },
                                        { text: "$\\frac{AC}{CE}=\\frac{BC}{CD}$", correct: true },
                                        { text: "$\\frac{AC}{BC}=\\frac{CD}{CE}$", correct: false }
                                    ],
                                    rationale: "Vì $AB \\parallel DE$ nên áp dụng định lí Ta-lét ta có $\\frac{AC}{CE}=\\frac{BC}{CD}$."
                                },
                                {
                                    id: 103,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Cho hình vẽ, biết $BC \\parallel DE$. Hãy chỉ ra tỉ số <strong>sai</strong>.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=1]
                                                    \\tikzset{declare function={a=3;b=2.2;c=2.5;}}
                                                    \\pgfmathsetmacro{\\goc}{acos((a*a+c*c-b*b)/(2*a*c))}
                                                    \\draw (0,0)coordinate (B)--+(0:a)coordinate (C)--+(\\goc:c)coordinate (A)--cycle
                                                    ($(A)!.4!(C)$)coordinate (D)--($(A)!.4!(B)$)coordinate (E);
                                                    \\foreach \\point/\\goc in {A/90,B/190,C/-10,D/10,E/135}{
                                                        \\draw[fill=black](\\point)circle(.8pt)+(\\goc:2mm)node[scale=.8]{$\\point$};
                                                    }
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$\\frac{AD}{DC}=\\frac{AE}{AB}$", correct: true },
                                        { text: "$\\frac{AD}{CD}=\\frac{AE}{BE}$", correct: false },
                                        { text: "$\\frac{AD}{AC}=\\frac{AE}{AB}$", correct: false },
                                        { text: "$\\frac{CD}{AC}=\\frac{EB}{AB}$", correct: false }
                                    ],
                                    rationale: "Vì $BC \\parallel DE$ nên áp dụng định lí Ta-lét ta có $\\frac{AD}{CD}=\\frac{AE}{BE}$, $\\frac{AD}{AC}=\\frac{AE}{AB}$, $\\frac{CD}{AC}=\\frac{EB}{AB}$.<br>Do đó hệ thức $\\frac{AD}{DC}=\\frac{AE}{AB}$ sai."
                                },
                                {
                                    id: 104,
                                    difficulty: "basic",
                                    question: "Cho biết $\\frac{EF}{GH}=\\frac{4}{5}$ và $GH=10$ cm. Tính độ dài của $EF$.",
                                    options: [
                                        { text: "$EF=12,5$ cm", correct: false },
                                        { text: "$EF=8$ cm", correct: true },
                                        { text: "$EF=\\frac{2}{25}$ cm", correct: false },
                                        { text: "$EF=\\frac{1}{8}$ cm", correct: false }
                                    ],
                                    rationale: "Ta có $\\frac{EF}{GH}=\\frac{4}{5}$ và $GH=10$ cm, suy ra $\\frac{EF}{10}=\\frac{4}{5} \\Rightarrow EF=\\frac{10 \\cdot 4}{5}=8$ cm."
                                },
                                {
                                    id: 105,
                                    difficulty: "basic",
                                    question: "Cho đoạn thẳng $AC=60$ cm, $B$ là điểm thuộc đoạn thẳng $AC$ sao cho $\\frac{AB}{AC}=\\frac{1}{4}$. Tính độ dài $AB$.",
                                    options: [
                                        { text: "$AB=10$ cm", correct: false },
                                        { text: "$AB=15$ cm", correct: true },
                                        { text: "$AB=240$ cm", correct: false },
                                        { text: "$AB=20$ cm", correct: false }
                                    ],
                                    rationale: "Ta có $\\frac{AB}{AC}=\\frac{1}{4}$ và $AC=60$ cm, nên $\\frac{AB}{60}=\\frac{1}{4} \\Rightarrow AB=\\frac{60 \\cdot 1}{4}=15$ cm."
                                },
                                {
                                    id: 106,
                                    difficulty: "basic",
                                    question: "Cho các đoạn thẳng $AB=6$ cm, $CD=9$ cm, $PQ=8$ cm, $EF=12$ cm. Hãy chọn phát biểu đúng trong các phát biểu sau.",
                                    options: [
                                        { text: "Đoạn thẳng $AB$ và $PQ$ tỷ lệ với hai đoạn thẳng $CD$ và $EF$", correct: true },
                                        { text: "Đoạn thẳng $AB$ và $CD$ tỷ lệ với hai đoạn thẳng $EF$ và $PQ$", correct: false },
                                        { text: "Đoạn thẳng $AB$ và $PQ$ tỷ lệ với hai đoạn thẳng $EF$ và $CD$", correct: false },
                                        { text: "Đoạn thẳng $PQ$ và $AB$ tỷ lệ với hai đoạn thẳng $CD$ và $EF$", correct: false }
                                    ],
                                    rationale: "Ta có $\\frac{AB}{PQ}=\\frac{6}{8}=\\frac{3}{4}$, $\\frac{CD}{EF}=\\frac{9}{12}=\\frac{3}{4}$.<br>Suy ra $\\frac{AB}{PQ}=\\frac{CD}{EF}$.<br>Vậy đoạn thẳng $AB$ và $PQ$ tỷ lệ với hai đoạn thẳng $CD$ và $EF$."
                                },
                                {
                                    id: 107,
                                    difficulty: "basic",
                                    question: "Cho các đoạn thẳng $AB=6$ cm, $CD=8$ cm, $MN=12$ cm, $PQ=x$. Tìm $x$ để $AB$ và $CD$ tỷ lệ với $MN$ và $PQ$.",
                                    options: [
                                        { text: "$x=16$ cm", correct: true },
                                        { text: "$x=9$ cm", correct: false },
                                        { text: "$x=4$ cm", correct: false },
                                        { text: "$x=20$ cm", correct: false }
                                    ],
                                    rationale: "Để $AB$ và $CD$ tỷ lệ với $MN$ và $PQ$ ta có $\\frac{AB}{CD}=\\frac{MN}{PQ} \\Rightarrow \\frac{6}{8}=\\frac{12}{x} \\Rightarrow x=\\frac{8 \\cdot 12}{6}=16$ cm."
                                },
                                {
                                    id: 108,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Tìm giá trị của $x$ trong hình vẽ biết $MN \\parallel BC$.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=1]
                                                    \\tikzset{declare function={a=3;b=2.2;c=2.5;}}
                                                    \\pgfmathsetmacro{\\goc}{acos((a*a+c*c-b*b)/(2*a*c))}
                                                    \\draw (0,0)coordinate (B)--+(0:a)coordinate (C)--+(\\goc:c)coordinate (A)--cycle
                                                    ($(A)!2/3!(C)$)coordinate (N)--($(A)!2/3!(B)$)coordinate (M);
                                                    \\path (A)--(M)node[midway,left,scale=.8]{$12$} (B)--(M)node[midway,left,scale=.8]{$6$} (A)--(N)node[midway,right,scale=.8]{$15$} (C)--(N)node[midway,right,scale=.8]{$x$};
                                                    \\foreach \\point/\\goc in {A/90,B/190,C/-10,N/10,M/135}{
                                                        \\draw[fill=black](\\point)circle(.8pt)+(\\goc:2mm)node[scale=.8]{$\\point$};
                                                    }
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$x=30$", correct: false },
                                        { text: "$x=7,5$", correct: true },
                                        { text: "$x=4,8$", correct: false },
                                        { text: "$x=20$", correct: false }
                                    ],
                                    rationale: "Vì $MN \\parallel BC$ (giả thiết) nên theo định lý Ta-lét ta có $\\frac{AM}{BM}=\\frac{AN}{AC} \\Rightarrow \\frac{12}{6}=\\frac{15}{x} \\Rightarrow x=\\frac{6 \\cdot 15}{12}=7,5$."
                                },
                                {
                                    id: 109,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Tính độ dài $NC$ trong hình vẽ biết $MN \\parallel BC$.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=1]
                                                    \\tikzset{declare function={a=3;b=2.5;c=2;}}
                                                    \\pgfmathsetmacro{\\goc}{acos((a*a+c*c-b*b)/(2*a*c))}
                                                    \\draw (0,0)coordinate (B)--+(0:a)coordinate (C)--+(\\goc:c)coordinate (A)--cycle
                                                    ($(A)!.6!(C)$)coordinate (N)--($(A)!.6!(B)$)coordinate (M)
                                                    ($(A)+(50:.3)$)coordinate (p) 
                                                    ($(C)+(p)-(A)$)coordinate (q);
                                                    \\path (A)--(M)node[midway,left,scale=.8]{$9$} (B)--(M)node[midway,left,scale=.8]{$6$};
                                                    \\draw[<->](p)--(q)node[midway,right,scale=.8]{$25$};
                                                    \\foreach \\point/\\goc in {A/90,B/190,C/-10,N/10,M/135}{
                                                        \\draw[fill=black](\\point)circle(.8pt)+(\\goc:2mm)node[scale=.8]{$\\point$};
                                                    }
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$NC=30$", correct: false },
                                        { text: "$NC=20$", correct: false },
                                        { text: "$NC=40$", correct: false },
                                        { text: "$NC=10$", correct: true }
                                    ],
                                    rationale: "Vì $MN \\parallel BC$ (giả thiết) nên theo định lý Ta-lét ta có $\\frac{MB}{AB}=\\frac{NC}{AC} \\Rightarrow \\frac{6}{6+9}=\\frac{NC}{25} \\Rightarrow \\frac{6}{15}=\\frac{NC}{25} \\Rightarrow NC=\\frac{6 \\cdot 25}{15}=10$."
                                },
                                {
                                    id: 110,
                                    difficulty: "basic",
                                    question: "Cho biết độ dài của $AB$ gấp $7$ lần độ dài của $CD$ và độ dài của $A'B'$ gấp $12$ lần độ dài của $CD$. Tính tỉ số của hai đoạn thẳng $AB$ và $A'B'$.",
                                    options: [
                                        { text: "$\\frac{AB}{A'B'}=\\frac{1}{12}$", correct: false },
                                        { text: "$\\frac{AB}{A'B'}=\\frac{1}{7}$", correct: false },
                                        { text: "$\\frac{AB}{A'B'}=\\frac{7}{12}$", correct: true },
                                        { text: "$\\frac{AB}{A'B'}=\\frac{12}{7}$", correct: false }
                                    ],
                                    rationale: "Ta có $AB=7CD$, $A'B'=12CD$.<br>Suy ra $\\frac{AB}{A'B'}=\\frac{7CD}{12CD}=\\frac{7}{12}$."
                                },
                                {
                                    id: 111,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Cho hình thang $ABCD$ ($AB \\parallel CD$) có $BC=18$ cm. Lấy điểm $E$ thuộc cạnh $AD$ sao cho $\\frac{AE}{AD}=\\frac{1}{3}$. Qua $E$ kẻ đường thẳng song song với $CD$ cắt $BC$ tại $F$. Tính độ dài $BF$.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=1]
                                                    \\tikzset{declare function={a=5;b=4;c=3;}}
                                                    \\pgfmathsetmacro{\\goc}{acos((a*a+c*c-b*b)/(2*a*c))}
                                                    \\path (0,0)coordinate (D)+(0:a)coordinate (C)+(\\goc:c)coordinate (A)
                                                    ($(A)+(C)-(D)$)coordinate (b)
                                                    ($(A)!.5!(b)$)coordinate (B)
                                                    ($(A)!1/3!(D)$)coordinate (E) ($(B)!1/3!(C)$)coordinate (F)
                                                    (intersection of A--C and E--F)coordinate (G);
                                                    \\foreach \\pointo/\\pointt in {A/B,B/C,C/D,D/A,E/F,A/C}{
                                                        \\draw[fill=black](\\pointo)--(\\pointt);
                                                    }
                                                    \\foreach \\point/\\goc in {A/110,B/80,F/30,C/-10,D/190,E/135,G/60}{
                                                        \\draw[fill=black](\\point)circle(.8pt)+(\\goc:2mm)node[scale=.8]{$\\point$};
                                                    }
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$BF=18$ cm", correct: false },
                                        { text: "$BF=3$ cm", correct: false },
                                        { text: "$BF=6$ cm", correct: true },
                                        { text: "$BF=54$ cm", correct: false }
                                    ],
                                    rationale: "Xét tam giác $ACD$ có $EG \\parallel CD$ (vì $EF \\parallel CD$). Áp dụng định lý Ta-lét ta có $\\frac{AE}{AD}=\\frac{AG}{AC}$ (1).<br>Xét tam giác $ABC$ có $GF \\parallel AB$ (vì $EF \\parallel CD \\Rightarrow EF \\parallel AB$). Áp dụng định lý Ta-lét ta có $\\frac{BF}{BC}=\\frac{AG}{AC}$ (2).<br>Từ (1) và (2) suy ra $\\frac{AE}{AD}=\\frac{BF}{BC} \\Rightarrow \\frac{1}{3}=\\frac{BF}{18} \\Rightarrow BF=6$ cm."
                                },
                                {
                                    id: 112,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Cho hình vẽ, biết $BD \\perp AC$, $AE \\perp AC$, $BC=6$, $AB=x$, $CD=3x$, $CE=13,5$. Tính $x$.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=1]
                                                    \\tikzset{declare function={a=4;b=3;}}
                                                    \\path 
                                                    (0,0)coordinate (A)+(0:a)coordinate (E)
                                                    +(90:b)coordinate (C)
                                                    ($(A)!1/3!(C)$)coordinate (B)($(E)!1/3!(C)$)coordinate (D)
                                                    pic[draw,angle radius=1mm]{right angle=E--A--C}
                                                    pic[draw,angle radius=1mm]{right angle=D--B--C}
                                                    ($(C)+(50:.35)$)coordinate (p)
                                                    ($(p)+(E)-(C)$)coordinate (q);
                                                    \\foreach \\pointo/\\pointt in {A/C,A/E,B/D,C/E}{
                                                        \\draw[fill=black](\\pointo)--(\\pointt);
                                                    }
                                                    \\draw[<->](p)--(q)node[midway,right,scale=.8]{$13,5$};
                                                    \\path 
                                                    (B)--(C)node[midway,left,scale=.8]{$6$}
                                                    (B)--(A)node[midway,left,scale=.8]{$x$}
                                                    (D)--(C)node[midway,right,scale=.8]{$3x$};
                                                    \\foreach \\point/\\goc in {A/-90,B/180,C/100,D/45,E/-20}{
                                                        \\draw[fill=black](\\point)circle(.8pt)+(\\goc:2mm)node[scale=.8]{$\\point$};
                                                    }
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$x=2,5$", correct: false },
                                        { text: "$x=3$", correct: true },
                                        { text: "$x=9$", correct: false },
                                        { text: "$x=4$", correct: false }
                                    ],
                                    rationale: "Vì $BD \\perp AC$, $AE \\perp AC$ nên $BD \\parallel AE$.<br>Áp dụng định lí Ta-lét ta có $\\frac{BC}{AC}=\\frac{DC}{CE} \\Rightarrow \\frac{6}{6+x}=\\frac{3x}{13,5}$.<br>$\\Rightarrow 6 \\cdot 13,5 = 3x (6+x) \\Rightarrow 81 = 18x + 3x^2 \\Rightarrow x^2 + 6x - 27 = 0$.<br>$(x-3)(x+9)=0 \\Rightarrow x=3$ (nhận) hoặc $x=-9$ (loại)."
                                }
                            ]
                        },
                        {
                            id: "topic_thales_app",
                            title: "Ứng Dụng Thực Tế Của Định Lý Ta-lét",
                            icon: "fa-tree",
                            color: "from-green-500 to-emerald-600",
                            description: "Đo chiều cao cây, khoảng cách không tới được, bóng nắng...",
                            questions: [
                                {
                                    id: 201,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Trong hình vẽ, độ dài đoạn thẳng $A'C'$ mô tả chiều cao của một cái cây, đoạn thẳng $AC$ mô tả một cái cọc (cây và cọc cùng vuông góc với đường thẳng đi qua ba điểm $A'$, $A$, $B$). Giả sử $AC=2$m, $AB=1,5$m, $A'B=4,5$m. Tính chiều cao của cây.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[scale=0.6,font=\\tiny]
                                                    \\tikzset{
                                                        treetop/.style = {decoration={random steps, segment length=0.4mm},decorate},
                                                        trunk/.style = {decoration={random steps, segment length=2mm, amplitude=0.2mm},decorate}
                                                    }
                                                    \\path (-3,-3) coordinate (B) (0,1.47) coordinate (C') (0,-3) coordinate (A')
                                                    ($(B)!1/3!(A')$) coordinate (A) ($(B)!1/3!(C')$) coordinate (C);
                                                    \\foreach \\w/\\f in {0.3/30,0.2/50,0.1/70} {
                                                        \\fill [brown!\\f!black, trunk] (0,0) ++(-\\w/2,0) rectangle +(\\w,-3);
                                                    }
                                                    \\foreach \\n/\\f in {1.4/40,1.2/50,1/60,0.8/70,0.6/80,0.4/90} {
                                                        \\fill [green!\\f!black, treetop] ellipse (\\n/1.5 and \\n);
                                                    }
                                                    \\fill[pink!70!orange] ($(C)!0.5cm!(B)$)--++(-30:0.1)--($(C)!0.5cm!(C')+(-30:0.1)$)--($(C)!0.5cm!(C')$);
                                                    \\draw[dashed] (B)--(C');
                                                    \\draw (B)--(A')--(C');
                                                    \\draw[line width=2pt,orange!35!black] (A)--(C);
                                                    \\foreach \\x/\\g in {A/-90,A'/-90,B/-90,C/130,C'/90}\\fill[black](\\x) circle (1pt) +(\\g:3mm) node {$\\x$};
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$7$ m", correct: false },
                                        { text: "$5$ m", correct: false },
                                        { text: "$6$ m", correct: true },
                                        { text: "$8$ m", correct: false }
                                    ],
                                    rationale: "Xét tam giác $BA'C'$ với $AC \\parallel A'C'$, ta có: $\\frac{AB}{A'B}=\\frac{AC}{A'C'}$ (hệ quả của định lí Ta-lét).<br>Do đó: $\\frac{1,5}{4,5}=\\frac{2}{A'C'}$. Suy ra: $A'C'=\\frac{4,5 \\cdot 2}{1,5}=6$ (m)."
                                },
                                {
                                    id: 202,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Một toà nhà cao $24$ m, đổ bóng nắng dài $36$ m trên đường như hình bên. Một người cao $1,6$ m muốn đứng trong bóng râm của toà nhà. Hỏi người đó có thể đứng cách toà nhà xa nhất bao nhiêu mét?</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[scale=0.8,>=stealth, font=\\footnotesize, line join=round, line cap=round]
                                                    \\path (12,-1) coordinate (A) (4,3) coordinate (B) (4,-1) coordinate (C) (6,3) coordinate (H);
                                                    \\coordinate (D) at ($(A)!0.3!(H)$);
                                                    \\coordinate (E) at ($(C)!(D)!(A)$);
                                                    \\draw[fill=brown!20] (B)--(6,3)--(6,-1)--(4,-1)--(B);
                                                    \\foreach \\i in {2,3,4,5}
                                                    \\draw[fill=white] 
                                                    ({4+1/3},{-1+(2/3)*(\\i-1)})--({4+1/3},{-1+(2/3)*(\\i-1)+0.5})--({4+2/3},{-1+(2/3)*(\\i-1)+0.5})--({4+2/3},{-1+(2/3)*(\\i-1)})--cycle
                                                    ({5+1/3},{-1+(2/3)*(\\i-1)})--({5+1/3},{-1+(2/3)*(\\i-1)+0.5})--({5+2/3},{-1+(2/3)*(\\i-1)+0.5})--({5+2/3},{-1+(2/3)*(\\i-1)})--cycle;
                                                    \\draw (C)--(A)--(H) (D)--(E)node[pos=0.5,left]{$1,6$ m};
                                                    \\draw [<->] ($(C)-(0.3,0)$)--($(B)-(0.3,0)$)node[pos=0.5,left]{$24$ m};
                                                    \\draw [<->] ($(6,-1)-(0,0.4)$)--($(E)-(0,0.4)$)node[pos=0.5,above]{$x$};
                                                    \\draw [<->] ($(6,-1)-(0,0.6)$)--($(A)-(0,0.6)$)node[pos=0.5,below]{$36$ m};
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$32,5$ m", correct: false },
                                        { text: "$33,6$ m", correct: true },
                                        { text: "$34$ m", correct: false },
                                        { text: "$34,5$ m", correct: false }
                                    ],
                                    rationale: "Theo định lí Ta-lét ta có $\\frac{1,6}{24}=\\frac{36-x}{36} \\Rightarrow 36-x = \\frac{1,6 \\cdot 36}{24} = 2,4 \\Rightarrow x=33,6$.<br>Vậy người đó đứng cách tòa nhà xa nhất là $33,6$ m."
                                },
                                {
                                    id: 203,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Người ta đo bóng của một cây và được các số đo như ở hình bên ($AB=0,9$m, $AM=1,5$m, $MN=2$m). Giả sử rằng các tia nắng song song với nhau, hãy tính độ cao $x$ ($BC$).</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[scale=1, font=\\footnotesize, line join=round, line cap=round,>=stealth]
                                                    \\tikzset{lacay/.style ={decoration={random steps, segment length=0.4mm},decorate},
                                                        thancay/.style = {decoration={random steps, segment length=2mm, amplitude=0.2mm},decorate}}
                                                    \\tikzset{caicay/.pic={%
                                                            \\foreach \\w/\\f in {0.3/30,0.2/50,0.1/70} {	
                                                                \\fill [brown!\\f!black, thancay] (0,3) ++(-\\w/2,0) rectangle +(\\w,-3);
                                                                \\foreach \\n/\\f in {1.4/40,1.2/50,1/60,0.8/70,0.6/80,0.4/90} {
                                                                    \\fill [green!\\f!black, lacay] (0,3)ellipse (\\n/1.5 and \\n);}}}}
                                                    \\coordinate (A) at (0,0);
                                                    \\coordinate (C) at (90:4.4);
                                                    \\coordinate (B) at ($(A)+0.37*(C)-0.37*(A)$);
                                                    \\coordinate (N) at (0:6);
                                                    \\coordinate (M) at ($(A)+0.37*(N)-0.37*(A)$);
                                                    \\path (A) pic[rotate=0,scale=1]{caicay};
                                                    \\draw(A)--(C)--(N)--cycle (B)--(M);
                                                    \\draw[>=stealth,|<->|,transform canvas={shift={(180:1.2)}}] (A)--(B) node[fill=white,inner sep=2pt,font=\\scriptsize,midway,sloped]{$0,9\\,\\mathrm{m}$};
                                                    \\draw[>=stealth,|<->|,transform canvas={shift={(180:1.2)}}] (B)--(C) node[fill=white,inner sep=2pt,font=\\scriptsize,midway,sloped]{$x\\,\\mathrm{m}$};
                                                    \\draw[>=stealth,|<->|,transform canvas={shift={(-90:0.5)}}] (A)--(M) node[fill=white,inner sep=2pt,font=\\scriptsize,midway,sloped]{$1,5\\,\\mathrm{m}$};
                                                    \\draw[>=stealth,|<->|,transform canvas={shift={(-90:0.5)}}] (M)--(N) node[fill=white,inner sep=2pt,font=\\scriptsize,midway,sloped]{$2\\,\\mathrm{m}$};
                                                    \\fill (0,-0.5) node[white]{$a$};
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$1,2$ m", correct: true },
                                        { text: "$1,5$ m", correct: false },
                                        { text: "$2,2$ m", correct: false },
                                        { text: "$1,7$ m", correct: false }
                                    ],
                                    rationale: "Xét tam giác $ACN$ có $BM \\parallel CN$ (cùng vuông góc mặt đất hoặc do tia nắng song song tạo nên tỉ lệ).<br>Theo định lí Ta-lét: $\\frac{AB}{BC}=\\frac{AM}{MN} \\Rightarrow \\frac{0,9}{x}=\\frac{1,5}{2} \\Rightarrow x=\\frac{0,9 \\cdot 2}{1,5}=1,2$ (m)."
                                },
                                {
                                    id: 204,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Để đo khoảng cách giữa hai vị trí $B$ và $C$ không thể đo trực tiếp, người ta chọn $A$, đo $AB, AC$, lấy $M, N$ sao cho $\\frac{AM}{AB}=\\frac{AN}{AC}=\\frac{1}{5}$. Tính $BC$ biết $MN=20$ m.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=1]
                                                    \\path (0,0) coordinate (B) (0:5) coordinate (C) (70:3) coordinate (A)
                                                    ($(A)!0.2!(B)$) coordinate (M) ($(A)!0.2!(C)$) coordinate (N);
                                                    \\fill[cyan,opacity=0.2] (60:1) .. controls +(-90:0.5) and +(160:1) .. (2,-1).. controls +(10:0.5) and +(-80:1) ..(4,0.5).. controls +(180:1) and +(0:1) ..(2,1.5).. controls +(-120:1) and +(-10:1) .. cycle;	
                                                    \\draw[cyan] (60:1) .. controls +(-90:0.5) and +(160:1) .. (2,-1).. controls +(10:0.5) and +(-80:1) ..(4,0.5).. controls +(180:1) and +(0:1) ..(2,1.5).. controls +(-120:1) and +(-10:1) .. cycle;
                                                    \\draw ($(B)!0.16!(C)$)--(B)--(A)--(C)--($(C)!0.22!(B)$) (M)--(N);
                                                    \\draw[dashed] (B)--(C);
                                                    \\foreach \\x/\\g in {B/-135,C/-45,A/90,M/180,N/30}\\fill[black](\\x) circle (1pt) +(\\g:3mm) node {$\\x$};
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$100$ m", correct: true },
                                        { text: "$90$ m", correct: false },
                                        { text: "$110$ m", correct: false },
                                        { text: "$120$ m", correct: false }
                                    ],
                                    rationale: "Vì $\\frac{AM}{AB}=\\frac{AN}{AC}$ nên $MN \\parallel BC$.<br>Suy ra $\\frac{MN}{BC}=\\frac{AM}{AB}=\\frac{1}{5}$.<br>$\\Rightarrow BC = 5 \\cdot MN = 5 \\cdot 20 = 100$ (m)."
                                },
                                {
                                    id: 205,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Để đo khoảng cách $AB$ ($B$ không tới được), người ta đo $AC=50$ m, $CD=20$ m, $DE=18$ m (như hình vẽ, $AB \\perp AC$, $DE \\perp AC$). Tính $AB$.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[scale=1, font=\\footnotesize,>=stealth]
                                                    \\coordinate (A) at (0,0); \\coordinate (B) at (3,0); \\coordinate (C) at (0,-4);
                                                    \\coordinate (D) at ($(C)+0.3*(A)-0.3*(C)$); \\coordinate (E) at ($(C)+0.3*(B)-0.3*(C)$);
                                                    \\draw [cyan,fill=cyan,fill opacity=0.2](B) ellipse(2 cm and 1.5 cm);
                                                    \\draw (A)--(B)--(C)--cycle (D)--(E);
                                                    \\draw pic[draw, angle radius=2mm, angle eccentricity=1.5]{right angle = B--A--C};
                                                    \\draw pic[draw, angle radius=2mm, angle eccentricity=1.5]{right angle = C--D--E};
                                                    \\foreach \\x/\\y in {A/135,B/0,C/-90,D/180,E/0}{\\fill (\\x)circle (1pt) ($(\\x)+(\\y:0.3cm)$) node{$\\x$};}
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$50$ m", correct: false },
                                        { text: "$45$ m", correct: true },
                                        { text: "$40$ m", correct: false },
                                        { text: "$55$ m", correct: false }
                                    ],
                                    rationale: "Vì $AB \\perp AC$ và $DE \\perp AC$ nên $AB \\parallel DE$.<br>Suy ra $\\frac{ED}{AB}=\\frac{CD}{CA} \\Rightarrow \\frac{18}{AB}=\\frac{20}{50} \\Rightarrow AB=\\frac{18 \\cdot 50}{20}=45$ (m)."
                                },
                                {
                                    id: 206,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Ước lượng chiều cao cột cờ. Cọc cao $2$m đặt xa chân cột cờ $15$m. Người (mắt cách chân $1,6$m) lùi ra xa cách cọc $0,8$m thì thấy đầu cọc và đỉnh cột cờ thẳng hàng. Tính chiều cao cột cờ.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[scale=1, font=\\footnotesize,>=stealth]
                                                    \\def\\canhAB{1};\\def\\canhCA{10};
                                                    \\coordinate (A) at (0,0);
                                                    \\coordinate (B) at (90:\\canhAB);
                                                    \\coordinate (C) at (0:\\canhCA);
                                                    \\coordinate (D) at ($(C)!0.6!-90:(A)$);
                                                    \\coordinate (E) at ($(A)+0.1*(C)-0.1*(A)$);
                                                    \\coordinate (F) at ($(B)+0.1*(D)-0.1*(B)$);
                                                    \\coordinate (I) at (intersection of B--C and E--F);
                                                    \\draw (A)--(B)--(C)--cycle (B)--(D)--(C) (F)--(E);
                                                    \\draw pic[draw, angle radius=2mm, angle eccentricity=1.5]{right angle = B--A--C};
                                                    \\draw pic[draw, angle radius=2mm, angle eccentricity=1.5]{right angle = D--C--A};
                                                    \\draw pic[draw, angle radius=2mm, angle eccentricity=1.5]{right angle = C--E--F};
                                                    \\foreach \\x/\\y in {A/180,B/90,C/0,D/90,I/-45,F/90,E/-90}{\\fill (\\x)circle (1pt) ($(\\x)+(\\y:0.3cm)$) node{$\\x$};}
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$10$ m", correct: false },
                                        { text: "$10,5$ m", correct: false },
                                        { text: "$9$ m", correct: false },
                                        { text: "$9,5$ m", correct: true }
                                    ],
                                    rationale: "Theo tính toán từ các cặp tam giác đồng dạng (người-cọc và người-cột cờ):<br>Chiều cao cột cờ là $9,5$ m."
                                }
                            ]
                        }
                    ]
                },

            ]
        },
        {
            id: "grade_9",
            name: "Lớp 9",
            active: true,
            chapters: [
                {
                    title: "Chương 1: Căn bậc hai. Căn bậc ba",
                    topics: [
                        { id: "topic_9_1", title: "Căn bậc hai", icon: "fa-square-root-variable", color: "from-emerald-400 to-teal-500", description: "Khái niệm căn bậc hai số học.", questions: [] },
                    ]
                }
            ]
        },
        {
            id: "grade_11",
            name: "Lớp 11",
            active: false,
            chapters: []
        },
        {
            id: "grade_12",
            name: "Lớp 12",
            active: true,
            chapters: [
                {
                    title: "Chương 3: Nguyên Hàm - Tích Phân và Ứng Dụng",
                    topics: [
                        {
                            id: "topic_integral_app",
                            title: "Ứng Dụng Hình Học Của Tích Phân",
                            icon: "fa-draw-polygon",
                            color: "from-purple-500 to-indigo-600",
                            description: "Diện tích hình phẳng, thể tích khối tròn xoay, bài toán thực tế.",
                            questions: [
                                {
                                    id: 1201,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Diện tích hình phẳng (phần gạch sọc) trong hình vẽ bằng</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz" data-tikz-libraries="patterns">
                                                \\begin{tikzpicture}[scale=0.8, line join=round, line cap=round, >=stealth,yscale=0.8]
                                                    \\tikzset{every node/.style={scale=1}}
                                                    \\def\\xmin{-1.5}\\def\\xmax{5}\\def\\ymin{-1.5}\\def\\ymax{6}
                                                    \\draw[->] (\\xmin-0.2,0)--(\\xmax+0.2,0) node[below]{$x$};
                                                    \\draw[->] (0,\\ymin-0.2)--(0,\\ymax+0.2) node[left]{$y$};
                                                    \\draw (0,0) node[below right]{$O$};
                                                    \\foreach \\x in {3}\\draw (\\x,0.1)--(\\x,-0.1) node[below]{$\\x$};
                                                    \\foreach \\x in {-1}\\draw (\\x,0.1)--(\\x,-0.1) node[above left]{$\\x$};
                                                    \\foreach \\y in {3}\\draw (0.1,\\y)--(-0.1,\\y) node[left]{$\\y$};
                                                    \\foreach \\y in {-1}\\draw (0.1,\\y)--(-0.1,\\y) node[right]{$\\y$};
                                                    %	\\clip (\\xmin,\\ymin) rectangle (\\xmax,\\ymax);
                                                    \\draw[thick,smooth,samples=200,domain=-1.1:4.1] plot (\\x,{-1*((\\x)^2)+3*\\x+3});
                                                    \\draw(0.2,5.5) node[right]{$y=-x^2+3x+3$};
                                                    \\draw[thick,smooth,samples=200,domain=\\xmin:\\xmax] plot (\\x,{1*(\\x)+0});
                                                    \\draw(3.8,4) node[below right]{$y=x$};
                                                    \\fill[pattern=north east lines] plot[domain=-1:3] (\\x,{-1*((\\x)^2)+3*\\x+3}) -- plot[domain=2:-1] (\\x,{1*(\\x)+0})--cycle;
                                                    \\draw[dashed] (-1,0)--(-1,-1)--(0,-1);\\fill (-1,-1)circle(1.5pt);
                                                    \\draw[dashed] (3,0)--(3,3)--(0,3);\\fill (3,3)circle(1.5pt);
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$S=\\displaystyle\\int\\limits_{-1}^{3} \\left(-x^2+2x+3\\right)\\mathrm{\\,d}x$", correct: true },
                                        { text: "$S=\\displaystyle\\int\\limits_{-1}^{3} \\left(x^2-2x-3\\right)\\mathrm{\\,d}x$", correct: false },
                                        { text: "$S=\\displaystyle\\int\\limits_{-1}^{3} \\left(-x^2+4x+3\\right)\\mathrm{\\,d}x$", correct: false },
                                        { text: "$S=\\displaystyle\\int\\limits_{-1}^{3} \\left(-x^2+2x+3\\right)\\mathrm{\\,d}x$", correct: false }
                                    ],
                                    rationale: "Ta có $S=\\displaystyle\\int\\limits_{-1}^{3} \\left(-x^2+3x+3-x\\right)\\mathrm{\\,d}x= \\displaystyle\\int\\limits_{-1}^{3} \\left(-x^2+2x+3\\right)\\mathrm{\\,d}x$."
                                },
                                {
                                    id: 1202,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Cho hàm số $y=f(x)$ như hình vẽ sau đây. Biết rằng $\\displaystyle\\int\\limits_{-2}^1f(x)\\mathrm{\\,d}x=a$ và $\\displaystyle\\int\\limits_1^2f(x)\\mathrm{\\,d}x=b$. Tính diện tích $S$ của hình phẳng được tô đậm.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz" data-tikz-libraries="patterns">
                                                \\begin{tikzpicture}[scale=1, font=\\footnotesize, line join=round, line cap=round, >=stealth]
                                                    \\tikzset{label style/.style={font=\\footnotesize}}
                                                    %Nhập giới hạn đồ thị và hàm số cần vẽ
                                                    \\def \\xmin{-2.5}
                                                    \\def \\xmax{3}
                                                    \\def \\ymin{-3}
                                                    \\def \\ymax{1.5}
                                                    \\def \\hamso{sin((2*(\\x))*180/pi)}
                                                    %\\def \\tiemcanxien{\\x+1}
                                                    %Tự động
                                                    \\draw[->] (\\xmin,0)--(\\xmax,0) node[below left] {$x$};
                                                    \\draw[->] (0,\\ymin)--(0,\\ymax) node[below left] {$y$};
                                                    \\fill (0,0) circle(1pt) node [above left] {$O$};
                                                    %Vẽ các điểm trên 2 hệ trục
                                                    \\foreach \\x in {1,2}
                                                    \\fill (\\x,0) circle(1pt) node [below] {$\\x$};
                                                    \\draw (-2,0) circle(1pt) node[shift=(40:0.3)]{$-2$};
                                                    %Tự động
                                                    \\begin{scope}
                                                        \\clip (\\xmin+0.01,\\ymin+0.01) rectangle (\\xmax-0.01,\\ymax-0.01);
                                                        \\draw[samples=350,domain=\\xmin+0.01:\\xmax-0.01,smooth,variable=\\x] plot (\\x,{-0.5*(\\x+2)*(\\x-1)*(\\x-2)});
                                                    \\end{scope}
                                                    \\draw[pattern = north east lines] (-2,0)--plot[domain=-2:2] (\\x,{-0.5*(\\x+2)*(\\x-1)*(\\x-2)});
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$S=-a-b$", correct: false },
                                        { text: "$S=a+b$", correct: false },
                                        { text: "$S=b-a$", correct: true },
                                        { text: "$S=a-b$", correct: false }
                                    ],
                                    rationale: "Ta có $S=\\displaystyle\\int\\limits_{-2}^1\\big|f(x)\\big|\\mathrm{d}x+\\displaystyle\\int\\limits_1^2\\big|f(x)\\big|\\mathrm{d}x=-\\displaystyle\\int\\limits_{-2}^1f(x)\\mathrm{\\,d}x+\\displaystyle\\int\\limits_1^2f(x)\\mathrm{\\,d}x=-a+b$."
                                },
                                {
                                    id: 1203,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Hình thang cong $ABCD$ ở hình vẽ có diện tích bằng:</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz" data-tikz-libraries="patterns">
                                                \\begin{tikzpicture}[scale=1, font=\\footnotesize, line join=round, line cap=round, >=stealth]
                                                    
                                                    \\def\\xmin{-1} \\def\\xmax{4}
                                                    \\def\\ymin{-2.5} \\def\\ymax{4} 
                                                    \\draw[->] (\\xmin,0)--(\\xmax,0) node [below]{$x$};
                                                    \\draw[->] (0,\\ymin)--(0,\\ymax) node [left]{$y$};
                                                    \\draw (1,1)--(1,3) (3,-1)--(3,1)
                                                    (3,-2)node{$y=-x+2$}
                                                    (2.1,2)node{$y=\\dfrac{3}{x}$}
                                                    ;
                                                    \\clip (\\xmin+0.1,\\ymin+0.1) rectangle (\\xmax-0.1,\\ymax-0.1);
                                                    \\draw[smooth,samples=300,domain=0.5:4] plot(\\x,{3/(\\x)});
                                                    \\draw[smooth,samples=300,domain=-0.5:4] plot(\\x,{-(\\x)+2});
                                                    \\fill (0,0)circle (1pt)node[below left]{$O$};
                                                    \\foreach \\x/\\g in {1/below,3/below right}  \\draw[thin] (\\x,1pt)--(\\x,-1pt) node[\\g]{$\\x$};
                                                    \\foreach \\y/\\g in {-1/left,1/left,3/left} \\draw[thin] (1pt,\\y)--(-1pt,\\y) node[\\g]{$\\y$};
                                                    \\fill[pattern=north east lines,smooth] (1,1) --
                                                    plot[domain=1:3](\\x,{3/(\\x)})
                                                    -- (3,-1) -- cycle;
                                                    \\draw[dashed] (1,0)--(1,1)--(0,1) (3,0)--(3,-1)--(0,-1) (1,3)--(0,3);
                                                    \\fill (1,3)circle(1pt)node[above right]{$B$}
                                                    (1,1)circle(1pt)node[below left]{$A$}
                                                    (3,1)circle(1pt)node[above]{$C$}
                                                    (3,-1)circle(1pt)node[below]{$D$}
                                                    ;
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$\\int_{1}^{3} (\\frac{3}{x}-x+2) \\,dx$", correct: false },
                                        { text: "$\\int_{1}^{3} (\\frac{3}{x}-x-2) \\,dx$", correct: false },
                                        { text: "$\\int_{1}^{3} (\\frac{3}{x}+x+2) \\,dx$", correct: false },
                                        { text: "$\\int_{1}^{3} (\\frac{3}{x}+x-2) \\,dx$", correct: true }
                                    ],
                                    rationale: "Diện tích hình thang cong $ABCD$ là $S=\\int_{1}^{3} (\\frac{3}{x} - (-x+2)) \\,dx = \\int_{1}^{3} (\\frac{3}{x}+x-2) \\,dx$."
                                },
                                {
                                    id: 1204,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Cho các hàm số $y=f(x)$, $y=g(x)$ liên tục trên đoạn $[a; b]$. Diện tích hình phẳng giới hạn bởi đồ thị các hàm số $y=f(x)$, $y=g(x)$ và hai đường thẳng $x=a$, $x=b$ là:</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[scale=0.7, font=\\footnotesize, line join=round, line cap=round, >=stealth]
                                                    \\definecolor{PatternColor}{RGB}{255, 204, 153}
                                                    \\path 
                                                    (0,0)coordinate (O)node[below left]{$O$}
                                                    (0.3,0.7)coordinate (A)
                                                    (1.5,4)coordinate (M)
                                                    (5,1.5)coordinate (B)
                                                    (0.2,-0.4)coordinate (C)
                                                    (2,-2)coordinate (N)
                                                    (5,2)coordinate (D)
                                                    (0.5,0)node[above left]{$a$}
                                                    %(2,-1.7)node{Hình 4.16}
                                                    (2,2.7)node{$y=f(x)$}
                                                    (2.7,-0.9)node{$y=g(x)$}
                                                    ;
                                                    \\def\\hsf{(A)..controls (M) and (B)..(B)}
                                                    \\def\\hsg{(C)..controls (N) and (D)..(D)}
                                                    \\draw[->](-0.5,0)--(5.3,0) node[below]{$x$};
                                                    \\draw[->](0,-1)--(0,3.5)node[right]{$y$};
                                                    \\draw[name path=cong1,color=black](A)..controls (M) and (B)..(B);
                                                    \\draw[name path=cong2, color=black](C)..controls (N) and (D)..(D);
                                                    \\path [name path=dth1] (0.5,-1)--(0.5,1.5);
                                                    \\path [name path=dth2] (4,0)node[below]{$b$}--(4,3);
                                                    \\path[name intersections={of=cong1 and dth1, by={A1}}];
                                                    \\path[name intersections={of=cong2 and dth1, by={C1}}];
                                                    \\path[name intersections={of=cong1 and dth2, by={B1}}];
                                                    \\path[name intersections={of=cong2 and dth2, by={D1}}];
                                                    \\draw (A1)--(C1) (4,0)--(B1);
                                                    \\begin{scope}
                                                        \\clip (0.5,-2) rectangle (4,4);	
                                                        \\fill[gray, opacity = .7]
                                                        (A1)--\\hsf--(B1)--(D1)
                                                        (A1)--(C1)--\\hsg--(D1)
                                                        ;
                                                    \\end{scope}
                                                    \\path (2.2,1)node{$S$};
                                                    %			\\path (0,0) node{\\hypersetup{hidelinks}\\href{V6jK0Pp}{ }};
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$S=\\int_b^a|f(x)-g(x)|\\,dx$", correct: false },
                                        { text: "$S=\\int_a^b|f(x)-g(x)|\\,dx$", correct: true },
                                        { text: "$S=\\int_b^a[f(x)-g(x)] \\,dx$", correct: false },
                                        { text: "$S=\\int_a^b[g(x)-f(x)] \\,dx$", correct: false }
                                    ],
                                    rationale: "Công thức tổng quát: $S=\\int_a^b|f(x)-g(x)|\\,dx$."
                                },
                                {
                                    id: 1205,
                                    difficulty: "basic",
                                    question: "Tính diện tích $S$ hình phẳng giới hạn bởi các đường $y=x^2+1$, $x=-1$, $x=2$ và trục hoành.",
                                    options: [
                                        { text: "$S=6$", correct: true },
                                        { text: "$S=16$", correct: false },
                                        { text: "$S=13/6$", correct: false },
                                        { text: "$S=13$", correct: false }
                                    ],
                                    rationale: "Ta có $S=\\int_{-1}^2|x^2+1|dx=\\int_{-1}^2(x^2+1)dx = [x^3/3 + x]_{-1}^2 = (8/3+2) - (-1/3-1) = 14/3 + 4/3 = 6$."
                                },
                                {
                                    id: 1206,
                                    difficulty: "basic",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Cho $S$ là diện tích phần hình phẳng được tô màu. Biểu thức tính diện tích $S$ là:</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[scale=1, font=\\footnotesize, line join=round, line cap=round, >=stealth]
                                                    %hidden: VM034
                                                    \\draw[->] (-1.5,0) -- (5,0) node[below] {$x$};
                                                    \\draw[->] (0,-0.75) -- (0,3.5) node[left] {$y$};
                                                    \\node at (0, 0) [below left]{$O$};
                                                    \\fill[green,smooth] (0.5,0)--plot[domain=0.5:2.1536](\\x,{2^(\\x-1)})--(2.1536,0)--cycle;
                                                    \\fill[green,smooth] (2.1536,0)--plot[domain=2.1536:3.8072](\\x,{(0.5)^(\\x)+2})--(3.8072,0)--cycle;
                                                    \\draw[domain=0:2.5, samples=100] plot(\\x,{2^(\\x-1)})node[right]{$y=f(x)$};
                                                    \\draw[domain=0.75:4, samples=100] plot(\\x,{(0.5)^(\\x)+2})node[right]{$y=g(x)$};
                                                    \\draw[dashed] (0,2.2246) node[left]{$n$}--(2.1536,2.2246)--(2.1536,0) node[below]{$m$};
                                                    \\fill (2.1536,2.2246) circle (1.2pt); 
                                                    \\draw[dashed] (0.5,0) node [below]{$a$}--(0.5,0.707); 
                                                    \\draw[dashed] (3.8072,0)node [below]{$b$}--(3.8072,2.071);
                                                    \\node at (0,0){\\href{5B0Z8J}{\\tiny \\phantom{5B0Z8J}}};
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "$S=\\int_a^b |f-g| dx$", correct: false },
                                        { text: "$S=\\int_a^m |f-g| dx+\\int_m^b |g-f| dx$", correct: false },
                                        { text: "$S=\\int_a^m|f| dx+\\int_m^b|g| dx$", correct: true },
                                        { text: "$S=\\int_a^m |g| dx+\\int_m^b|f| dx$", correct: false }
                                    ],
                                    rationale: "Diện tích được tính bằng tổng hai phần: từ $a$ đến $m$ dưới hàm $f$, và từ $m$ đến $b$ dưới hàm $g$."
                                },
                                {
                                    id: 1207,
                                    difficulty: "basic",
                                    question: "Gọi $(H)$ là hình phẳng giới hạn bởi các đường $y = 2025^x$, $y = 0$, $x = 1$ và $x = 2$. Thể tích của khối tròn xoay tạo thành khi quay $(H)$ quanh trục $Ox$ là:",
                                    options: [
                                        { text: "$\\int_{1}^{2}|2025^x| \\,dx$", correct: false },
                                        { text: "$\\pi \\int_{1}^{2}2025^x \\,dx$", correct: false },
                                        { text: "$\\int_{1}^{2}(2025^x)^2 \\,dx$", correct: false },
                                        { text: "$\\pi \\int_{1}^{2}(2025^x)^2 \\,dx$", correct: true }
                                    ],
                                    rationale: "Công thức tính thể tích khối tròn xoay: $V = \\pi \\int_a^b [f(x)]^2 dx$."
                                },
                                {
                                    id: 1208,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Ông Duy có một mảnh vườn hình vuông cạnh bằng $8$ m. Ông dự định xây một cái bể bơi đặc biệt (phần kẻ sọc trong hình vẽ bên). Biết $AM = \\dfrac{AB}{4}$, phần đường cong đi qua các điểm $C$, $M$, $N$ là một phần của đường Parabol có trục đối xứng là $MP$ ($MP \\parallel AD$) và chi phí để làm bể bơi là $5$ triệu đồng/m$^2$. Số tiền ông Duy phải trả để xây cái bể bơi đó là bao nhiêu triệu đồng? \\textit{(làm tròn kết quả đến hàng đơn vị)}.</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz" data-tikz-libraries="patterns">
                                                \\begin{tikzpicture}[scale=0.6]
                                                    \\draw[thick] (0,0) rectangle (8,8);
                                                    \\coordinate (A) at (0,8);
                                                    \\coordinate (B) at (8,8);
                                                    \\coordinate (C) at (8,0);
                                                    \\coordinate (D) at (0,0);
                                                    \\coordinate (M) at (2,8);
                                                    \\coordinate (P) at (2,0);
                                                    \\coordinate (N) at (0,64/9);
                                                    \\draw[dashed] (M) -- (P);
                                                    \\fill[pattern=north west lines]
                                                    plot[domain=0:8, samples=100, variable=\\x]
                                                    ({\\x}, {-2/9*\\x*\\x + 8/9*\\x + 64/9})
                                                    -- plot[domain=8:0, samples=100, variable=\\x]
                                                    ({\\x}, {64/9 - 8/9*\\x})
                                                    -- cycle;
                                                    \\draw[domain=0:8, samples=100, variable=\\x]
                                                    plot ({\\x}, {-2/9*\\x*\\x + 8/9*\\x + 64/9});
                                                    \\draw (0,64/9) -- (8,0);
                                                    \\node[above left] at (A) {$A$};
                                                    \\node[above right] at (B) {$B$};
                                                    \\node[below right] at (C) {$C$};
                                                    \\node[below left] at (D) {$D$};
                                                    \\node[above] at (M) {$M$};
                                                    \\node[below] at (P) {$P$};
                                                    \\node[left] at (N) {$N$};
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "95", correct: true },
                                        { text: "90", correct: false },
                                        { text: "100", correct: false },
                                        { text: "85", correct: false }
                                    ],
                                    rationale: `Gán hệ trục $Oxy$ như hình vẽ bên.<br>
                                    Gọi phương trình parabol đi qua ba điểm $C$, $M$, $N$ là $y=ax^2+bx+c$ với $(a\\neq 0)$.<br>
                                    Trục đối xứng của parabol là đường thẳng $x=2$. Khi đó $-\\dfrac{b}{2a}=2 \\Leftrightarrow 4a+b=0$. $(1)$.<br>
                                    Parabol đi qua các điểm $M(2;8)$, $C(8;0)$ nên ta có hệ phương trình $\\begin{cases}4a+2b+c=8\\\\64a+8b+c=0.\\end{cases}$ $(2)$<br>
                                    Từ $(1)$ và $(2)$, ta có hệ phương trình
                                    $\\begin{cases}4a+2b+c=8\\\\64a+8b+c=0\\\\4a+b=0\\end{cases} \\Leftrightarrow \\begin{cases}a=-\\dfrac{2}{9}\\\\b=\\dfrac{8}{9}\\\\c=\\dfrac{64}{9}.\\end{cases}$<br>
                                    Vậy phương trình của parabol là $y=-\\dfrac{2}{9}x^2+\\dfrac{8}{9}x+\\dfrac{64}{9}$.
                                    <div class="my-4 flex justify-center">
                                        <script type="text/tikz" data-tikz-libraries="patterns">
                                        \\begin{tikzpicture}[font=\\footnotesize, line join=round, line cap=round, >=stealth, scale=0.6]
                                            \\draw[->] (-1,0) -- (9,0) node[below right] {$x$};
                                            \\draw[->] (0,-1) -- (0,9) node[above left] {$y$};
                                            \\coordinate (O) at (0,0);  
                                            \\coordinate (A) at (0,8);
                                            \\coordinate (B) at (8,8);
                                            \\coordinate (C) at (8,0);
                                            \\coordinate (M) at (2,8);     
                                            \\coordinate (P) at (2,0);     
                                            \\coordinate (N) at (0,64/9);   
                                            \\draw (O) -- (A) -- (B) -- (C) -- cycle;
                                            \\draw[dashed] (M) -- (P);
                                            \\fill[pattern=north west lines]
                                            plot[domain=0:8, samples=100, variable=\\x]
                                            ({\\x}, {-2/9*\\x*\\x + 8/9*\\x + 64/9})
                                            -- plot[domain=8:0, samples=100, variable=\\x]
                                            ({\\x}, {64/9 - 8/9*\\x})
                                            -- cycle;
                                            \\draw[thick] plot[domain=0:8, samples=100, variable=\\x]
                                            ({\\x}, {-2/9*\\x*\\x + 8/9*\\x + 64/9});
                                            \\draw[thick] (0,64/9) -- (8,0);
                                            \\node[left] at (A) {$A$};
                                            \\node[right] at (B) {$B$};
                                            \\node[below right] at (C) {$C$};
                                            \\node[below left] at (O) {$O$};
                                            \\node[above] at (M) {$M$};
                                            \\node[below] at (P) {$P$};
                                            \\node[left] at (N) {$N$};
                                        \\end{tikzpicture}
                                        </script>
                                    </div>
                                    Ta có $y(0)=\\dfrac{64}{9}$, khi đó đường thẳng $d$ đi qua điểm $C(8;0)$ và $N\\left(0;\\dfrac{64}{9}\\right)$ là
                                    $\\dfrac{x}{8}+\\dfrac{y}{\\dfrac{64}{9}} = 1 \\Leftrightarrow y=\\dfrac{64}{9}-\\dfrac{8}{9}x.$<br>
                                    Suy ra diện tích bể bơi là
                                    $\\displaystyle \\int \\limits_{0}^8 \\left[-\\dfrac{2}{9}x^2+\\dfrac{8}{9}x+\\dfrac{64}{9}-\\left(\\dfrac{64}{9}-\\dfrac{8}{9}x\\right)\\right]\\mathrm{\\,d}x = \\displaystyle \\int \\limits_0^8 \\left(-\\dfrac{2}{9}x^2 + \\dfrac{16}{9}x\\right)\\mathrm{\\,d}x = \\dfrac{512}{27}.$<br>
                                    Vậy số tiền cần trả để xây bể bơi là $T=5\\cdot \\dfrac{512}{27}\\approx 95$ triệu đồng.`
                                },
                                {
                                    id: 1209,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Tranh tường 3D: Lục giác đều cạnh 30cm. Cánh hoa parabol đỉnh cách cạnh 30cm. Giá 500k/m$^2$. Tổng tiền (làm tròn nghìn đồng)?</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[>=stealth,scale=0.7, line join=round, line cap=round,font=\\footnotesize]
                                                    % Màu sắc
                                                    \\definecolor{redpetal}{RGB}{220,40,30}
                                                    \\definecolor{bluepetal}{RGB}{0,120,220}
                                                    \\definecolor{centerYellow}{RGB}{255,200,0}
                                                    
                                                    \\def\\a{2}
                                                    \\def\\b{sqrt(3)/2}
                                                    \\begin{scope}[rotate=30]
                                                        \\path 
                                                        ($(120:\\a)$) coordinate (A)
                                                        ($(60:\\a)$) coordinate (B)
                                                        ($(0:\\a)$) coordinate (C)
                                                        ($(-60:\\a)$) coordinate (D)
                                                        ($(-120:\\a)$) coordinate (E)
                                                        ($(180:\\a)$) coordinate (F)
                                                        ($(0,0)$) coordinate (I)
                                                        ;
                                                        \\path[draw,fill=bluepetal,line width=1.5,samples=100,domain=-1:1,smooth,variable=\\x] plot (\\x,{-4/\\a*(\\x)^2+\\a+\\b*\\a});
                                                        \\begin{scope}[rotate around={60:(I)}]
                                                            \\path[draw,fill=redpetal, line width=1.5,samples=100,domain=-1:1,smooth,variable=\\x] plot (\\x,{-4/\\a*(\\x)^2+\\a+\\b*\\a});
                                                        \\end{scope}
                                                        \\begin{scope}[rotate around={120:(I)}]
                                                            \\path[draw,fill=bluepetal,line width=1.5,samples=100,domain=-1:1,smooth,variable=\\x] plot (\\x,{-4/\\a*(\\x)^2+\\a+\\b*\\a});
                                                        \\end{scope}
                                                        \\begin{scope}[rotate around={180:(I)}]
                                                            \\path[draw,fill=redpetal,line width=1.5,samples=100,domain=-1:1,smooth,variable=\\x] plot (\\x,{-4/\\a*(\\x)^2+\\a+\\b*\\a});
                                                        \\end{scope}
                                                        \\begin{scope}[rotate around={240:(I)}]
                                                            \\path[draw,fill=bluepetal,line width=1.5,samples=100,domain=-1:1,smooth,variable=\\x] plot (\\x,{-4/\\a*(\\x)^2+\\a+\\b*\\a});
                                                        \\end{scope}
                                                        \\begin{scope}[rotate around={300:(I)}]
                                                            \\path[draw,fill=redpetal,line width=1.5,samples=100,domain=-1:1,smooth,variable=\\x] plot (\\x,{-4/\\a*(\\x)^2+\\a+\\b*\\a});
                                                        \\end{scope}
                                                        \\path[draw,fill=centerYellow,line width=1.5] (A)--(B)--(C)--(D)--(E)--(F)--cycle;
                                                    \\end{scope}
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "297.000 đồng", correct: true },
                                        { text: "300.000 đồng", correct: false },
                                        { text: "250.000 đồng", correct: false },
                                        { text: "350.000 đồng", correct: false }
                                    ],
                                    rationale: "Diện tích 1 cánh hoa: 600 cm$^2$. Tổng 6 cánh: 3600 cm$^2$.<br>Diện tích lục giác: $1350\\sqrt{3}$ cm$^2$.<br>Tổng diện tích $\\approx 0.59$ m$^2$.<br>Tiền $\\approx 297.000$ đồng."
                                },
                                {
                                    id: 1210,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Khối bê tông cao 2m. Thiết diện cắt bởi mặt phẳng ngang cách đáy $x$ (m) là hình chữ nhật 10m x $(0.5)^x$m. Thể tích khối bê tông là:</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz" data-tikz-libraries="patterns">
                                                \\begin{tikzpicture}[line join=round,line cap=round,>=stealth,font=\\footnotesize,scale=.8]
                                                    \\path
                                                    (1.46,6.34) coordinate (A)
                                                    (2.3,6.97) coordinate (B)
                                                    (6.87,5.6) coordinate (C) node[right]{$2$}
                                                    (6.87,6.6) coordinate (C'') node[right]{$x$}
                                                    (6,5) coordinate (D)
                                                    (6.85,3.28) coordinate (A') node[right]{$x$}
                                                    (5.53,2.52) coordinate (B')
                                                    (0.99,3.86) coordinate (C')
                                                    (2.31,4.66) coordinate (D')
                                                    (0.19,1.66) coordinate (K)
                                                    (2.3,2.91) coordinate (L)
                                                    (6.85,1.55) coordinate (M) node[right]{$O$}
                                                    (4.68,0.23) coordinate (N)
                                                    
                                                    (7.77,6.14) coordinate (P)
                                                    (7.77,3.87) coordinate (Q)
                                                    (7.77,2.11) coordinate (S)
                                                    (7.44,5.95) coordinate (R)
                                                    (7.44,1.89) coordinate (T)
                                                    
                                                    ($(D')!0.48!(A')$)node[above]{$10$}
                                                    ($(B')!0.48!(A')$)node[below,rotate={atan(0.5)}]{$(0{,}5)^x$}
                                                    ;
                                                    \\fill[pattern=north east lines, pattern color=black] (D')--(A')--(B')--(C')--cycle
                                                    ;
                                                    \\draw[->] (C)--(C'');
                                                    \\draw [dashed, semithick, black] (B)--(L) (M)--(L)--(K) (A')--(D')--(C');
                                                    \\draw [semithick, black] (A)--(B)--(C)--(D)--cycle (A')--(B')--(C') (K)--(N)--(M) (M)--(C);
                                                    
                                                    \\foreach \\p/\\r in {C/0,A'/0,M/0}
                                                    \\fill (\\p) circle (1.7pt);
                                                    \\draw[] (D) to [out=-95,in=75] (B') (B') to [out=-105,in=70] (N);
                                                    \\draw[] (A) to [out=-95,in=75] (C') (C') to [out=-105,in=70] (K);
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "10,8 m$^3$", correct: true },
                                        { text: "10,0 m$^3$", correct: false },
                                        { text: "11,5 m$^3$", correct: false },
                                        { text: "12,0 m$^3$", correct: false }
                                    ],
                                    rationale: "$V=\\int_0^2 10 \\cdot (0.5)^x dx = 10.8$ m$^3$."
                                },
                                {
                                    id: 1211,
                                    difficulty: "advanced",
                                    question: `<div class="flex flex-col md:flex-row gap-4">
                                        <div class="flex-1">Một bình chứa nước. Khi nước cao $x$ (dm) ($0\\le x\\le 4$), mặt nước là hình vuông cạnh $\\sqrt{2+x^2/4}$. Dung tích bình là:</div>
                                        <div class="text-sm flex justify-center md:justify-end">
                                            <script type="text/tikz">
                                                \\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.8]
                                                    \\path 
                                                    (0,0) coordinate (A)	
                                                    (2,0) coordinate (B)
                                                    (3,1) coordinate (C)
                                                    (1,1) coordinate (D)
                                                    (6,0.5) coordinate (E)
                                                    (1.5,0.5) coordinate (F)
                                                    (1.5,4.5) coordinate (G)
                                                    (6,4.5) coordinate (H)
                                                    (4,2.5) coordinate (K)
                                                    (1.5,2.5) coordinate (I)
                                                    ;
                                                    \\draw (B) arc (180:165:8) coordinate (B1);
                                                    \\draw (C) arc (180:165:8) coordinate (C1);
                                                    \\draw (A) arc (0:15:8) coordinate (A1);
                                                    \\draw[dashed] (D) arc (0:15:8)coordinate (D1);
                                                    \\draw (A1)--(B1)--(C1);
                                                    \\draw (B) arc (180:150:8) coordinate (B2);
                                                    \\draw (C) arc (180:150:8) coordinate (C2);
                                                    \\draw (A) arc (0:30:8) coordinate (A2);
                                                    \\draw[dashed] (D1) arc (15:30:8)coordinate (D2);
                                                    \\draw (A2)--(B2)--(C2)--(D2)--(A2);
                                                    \\draw (A)--(B)--(C);
                                                    \\draw [dashed](C)--(D)--(A) (C1)--(D1)--(A1);
                                                    \\fill[color=green!40,opacity=0.2] (A)--(B)--(C)--(D);
                                                    \\fill[color=green!40,opacity=0.2] (A1)--(B1)--(C1)--(D1);
                                                    \\draw [<->] (6,0.5)--(6,4.5)node[midway, right]{$4$ dm};
                                                    \\draw [dashed](E)--(F)--(G)--(H) (K)--(I);
                                                    \\draw [<->] (4,0.5)--(4,2.5)node[midway, right]{$x$ dm};
                                                    \\draw (-1,1) node [left] {$\\sqrt{2+\\dfrac{x^2}{4}}$};
                                                    \\draw[->] (-1,1)--(0.5,2);
                                                    \\draw pic[draw=black, angle radius=0.25cm]{right angle=H--G--I}; 
                                                    \\draw pic[draw=black, angle radius=0.25cm]{right angle=K--I--F}; 
                                                    \\draw pic[draw=black, angle radius=0.25cm]{right angle=I--F--E}; 
                                                \\end{tikzpicture}
                                            </script>
                                        </div>
                                    </div>`,
                                    options: [
                                        { text: "13,3 dm$^3$", correct: true },
                                        { text: "13,0 dm$^3$", correct: false },
                                        { text: "14,5 dm$^3$", correct: false },
                                        { text: "12,8 dm$^3$", correct: false }
                                    ],
                                    rationale: "Diện tích mặt cắt $S(x)=2+x^2/4$.<br>Dung tích $V=\\int_0^4 (2+x^2/4) dx = 13,3$."
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
