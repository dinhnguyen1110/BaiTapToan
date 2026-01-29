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
    courseData: [
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
                }
            ]
        },
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
                        },
                        {
                            id: 2,
                            topic: "Viết phương trình đường tròn",
                            question: "Đường tròn $(C)$ có tọa độ tâm $I(-2; 4)$ và bán kính $R = 4$ có phương trình là:",
                            options: [
                                { text: "$(C): (x + 2)^2 + (y - 4)^2 = 16$", correct: true },
                                { text: "$(C): (x - 2)^2 + (y + 4)^2 = 16$", correct: false },
                                { text: "$(C): (x + 2)^2 + (y - 4)^2 = 4$", correct: false },
                                { text: "$(C): (x - 2)^2 + (y + 4)^2 = 4$", correct: false }
                            ],
                            hint: "Thay $a, b, R$ vào công thức $(x-a)^2 + (y-b)^2 = R^2$.",
                            rationale: "Phương trình đường tròn tâm $I(a; b)$ bán kính $R$ là $(x-a)^2 + (y-b)^2 = R^2$.<br>Thay $I(-2; 4)$ và $R=4$:<br>$(x - (-2))^2 + (y - 4)^2 = 4^2$<br>$\\Leftrightarrow (x + 2)^2 + (y - 4)^2 = 16$."
                        },
                        {
                            id: 3,
                            topic: "Tìm tâm và bán kính",
                            question: "Bán kính $R$ của đường tròn $x^2 + y^2 - 2x + 4y + 1 = 0$ là:",
                            options: [
                                { text: "$R = 2$", correct: true },
                                { text: "$R = 4$", correct: false },
                                { text: "$R = 1$", correct: false },
                                { text: "$R = 3$", correct: false }
                            ],
                            hint: "Xác định hệ số $a, b, c$ và dùng công thức $R = \\sqrt{a^2 + b^2 - c}$.",
                            rationale: "Phương trình có dạng $x^2 + y^2 - 2ax - 2by + c = 0$.<br>Ta có: $-2a = -2 \\Rightarrow a = 1$; $-2b = 4 \\Rightarrow b = -2$; $c = 1$.<br>Bán kính $R = \\sqrt{a^2 + b^2 - c} = \\sqrt{1^2 + (-2)^2 - 1} = \\sqrt{1 + 4 - 1} = \\sqrt{4} = 2$."
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
};
