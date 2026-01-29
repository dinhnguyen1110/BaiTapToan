/**
 * CLASS: Certificate Generator
 * Handles generation of the certificate HTML and printing.
 */
class CertificateGenerator {
    constructor() {
        this.template = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giấy Khen - Certificate of Merit</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto+Slab:wght@300;400;700&family=Pinyon+Script&family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap" rel="stylesheet">
    <style>
        body { background-color: #555; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Noto Serif', serif; }
        .certificate-container { width: 297mm; height: 210mm; background-color: #fffdf0; position: relative; box-shadow: 0 0 20px rgba(0,0,0,0.5); padding: 15px; box-sizing: border-box; }
        .border-outer { width: 100%; height: 100%; border: 5px solid #b8860b; padding: 5px; box-sizing: border-box; position: relative; }
        .border-inner { width: 100%; height: 100%; border: 2px solid #daa520; position: relative; display: flex; flex-direction: column; align-items: center; background-image: radial-gradient(#d4af37 1px, transparent 1px); background-size: 30px 30px; padding: 20px 40px; box-sizing: border-box; }
        .corner { position: absolute; width: 80px; height: 80px; border: 5px double #b8860b; box-sizing: border-box; }
        .top-left { top: 10px; left: 10px; border-right: none; border-bottom: none; }
        .top-right { top: 10px; right: 10px; border-left: none; border-bottom: none; }
        .bottom-left { bottom: 10px; left: 10px; border-right: none; border-top: none; }
        .bottom-right { bottom: 10px; right: 10px; border-left: none; border-top: none; }
        .corner::after { content: ''; position: absolute; width: 60%; height: 60%; border: 2px solid #daa520; }
        .top-left::after { top: 5px; left: 5px; border-right: none; border-bottom: none; }
        .top-right::after { top: 5px; right: 5px; border-left: none; border-bottom: none; }
        .bottom-left::after { bottom: 5px; left: 5px; border-right: none; border-top: none; }
        .bottom-right::after { bottom: 5px; right: 5px; border-left: none; border-top: none; }
        .header-text { text-align: center; margin-top: 20px; color: #333; }
        .nation { text-transform: uppercase; font-weight: bold; font-size: 16pt; margin-bottom: 5px; }
        .motto { font-weight: bold; font-size: 14pt; position: relative; display: inline-block; }
        .motto::after { content: ''; display: block; width: 60%; height: 2px; background: #333; margin: 5px auto 0; }
        .logo-placeholder { margin-top: 15px; color: #daa520; font-size: 24px; }
        h1.title { font-family: 'Playfair Display', serif; color: #cc0000; font-size: 52pt; margin: 10px 0 5px 0; text-shadow: 2px 2px 0px rgba(0,0,0,0.1); letter-spacing: 5px; text-transform: uppercase; }
        .subtitle { font-size: 14pt; margin-bottom: 10px; font-style: italic; color: #555; }
        .content-body { width: 100%; text-align: center; flex-grow: 1; }
        .recipient-name { font-family: 'Pinyon Script', cursive; font-size: 50pt; color: #b8860b; margin: 0; line-height: 1.2; min-height: 70px; outline: none; cursor: text; }
        .recipient-class { font-size: 16pt; font-weight: bold; margin-bottom: 20px; color: #333; }
        .award-for { font-size: 14pt; font-weight: normal; margin-bottom: 5px; font-style: italic; }
        .award-reason { font-family: 'Roboto Slab', serif; font-size: 20pt; color: #cc0000; font-weight: bold; width: 90%; margin: 0 auto; border-bottom: 1px dashed #ccc; padding-bottom: 5px; outline: none; cursor: text; }
        .footer { width: 100%; display: flex; justify-content: flex-end; margin-top: 30px; margin-bottom: 40px; padding: 0 80px; box-sizing: border-box; }
        .footer-right { text-align: center; width: 300px; }
        .date-line { font-style: italic; font-size: 13pt; margin-bottom: 15px; outline: none; }
        .signer-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; }
        .signature-hand { font-family: 'Great Vibes', cursive; font-size: 40pt; color: #000080; margin: 10px 0; transform: rotate(-5deg); }
        .signer-name { font-size: 15pt; font-weight: bold; outline: none; }
        .badge-left { position: absolute; bottom: 50px; left: 80px; width: 130px; height: 130px; z-index: 10; transform: rotate(-15deg); }
        .stamp-placeholder { position: absolute; width: 110px; height: 110px; border: 3px solid rgba(204, 0, 0, 0.6); border-radius: 50%; right: 210px; bottom: 90px; pointer-events: none; display: flex; align-items: center; justify-content: center; color: rgba(204, 0, 0, 0.6); font-weight: bold; font-size: 14px; transform: rotate(-15deg); opacity: 0.4; z-index: 1; }
        @media print { body { background: none; margin: 0; } .certificate-container { box-shadow: none; margin: 0; width: 100%; height: 100%; page-break-after: always; } @page { size: A4 landscape; margin: 0; } [contenteditable]:empty::before { content: "" !important; } }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="border-outer">
            <div class="border-inner">
                <div class="corner top-left"></div><div class="corner top-right"></div><div class="corner bottom-left"></div><div class="corner bottom-right"></div>
                <div class="header-text">
                    <div class="nation">Cộng hòa Xã hội Chủ nghĩa Việt Nam</div>
                    <div class="motto">Độc lập - Tự do - Hạnh phúc</div>
                </div>
                <div class="logo-placeholder"><svg width="40" height="40" viewBox="0 0 24 24" fill="#d4af37"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
                <h1 class="title">GIẤY KHEN</h1>
                <div class="subtitle">Trân trọng trao tặng cho em</div>
                <div class="content-body">
                    <div class="recipient-name" contenteditable="true">%%NAME%%</div>
                    <div class="recipient-class" contenteditable="true">%%CLASS%%</div>
                    <div class="award-for">Đã đạt thành tích xuất sắc:</div>
                    <div class="award-reason" contenteditable="true">%%REASON%% (%%SCORE%% điểm)</div>
                </div>
                <div class="footer">
                    <div class="footer-right">
                        <div class="date-line" id="date-placeholder" contenteditable="true">%%DATE%%</div>
                        <div class="signer-title">GIÁO VIÊN BỘ MÔN</div>
                        <div class="signature-hand">Nguyên</div>
                        <div class="signer-name" contenteditable="true">Nguyễn Đình Nguyên</div>
                    </div>
                </div>
                <div class="badge-left">
                    <svg width="100%" height="100%" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="56" stroke="#d98d2b" stroke-width="4" fill="#fffdf0" />
                        <circle cx="60" cy="60" r="48" stroke="#d98d2b" stroke-width="1.5" stroke-dasharray="3,2" fill="none" />
                        <text x="60" y="62" font-family="'Roboto Slab', serif" font-weight="bold" font-size="38" fill="#c47815" text-anchor="middle" dominant-baseline="middle">A+</text>
                        <text x="60" y="38" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="#c47815" text-anchor="middle" letter-spacing="1">CHỨNG NHẬN</text>
                        <text x="60" y="86" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="#c47815" text-anchor="middle" letter-spacing="1">XUẤT SẮC</text>
                    </svg>
                </div>
                <div class="stamp-placeholder">(Xác nhận)</div>
            </div>
        </div>
    </div>
</body>
</html>
        `;
    }

    generate(name, className, reason, score) {
        // Now forwards to image generation
        this.generateImage(name, className, reason, score);
    }

    async generateImage(name, className, reason, score) {
        const now = new Date();
        const dateStr = `Đắk Lắk, ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;

        // 1. Get Template Content
        let htmlContent = this.template
            .replace('%%NAME%%', name || "Học sinh xuất sắc")
            .replace('%%CLASS%%', className || "Lớp 10")
            .replace('%%REASON%%', reason || "Hoàn thành xuất sắc bài kiểm tra")
            .replace('%%SCORE%%', score)
            .replace('%%DATE%%', dateStr);

        // 2. Extract CSS and Body
        // We need to inject styles into the render container so html2canvas sees them.
        const linkMatch = htmlContent.match(/<link[^>]+>/g); // Google Fonts
        const styleMatch = htmlContent.match(/<style>([\s\S]*)<\/style>/);
        const bodyMatch = htmlContent.match(/<body>([\s\S]*)<\/body>/);

        const links = linkMatch ? linkMatch.join('') : '';
        const styles = styleMatch ? styleMatch[0] : '';
        const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent; // Fallback

        // 3. Inject into hidden container
        const container = document.getElementById('certificate-render-area');
        if (!container) return;

        // IMPORTANT: Inject fonts/styles + body content
        container.innerHTML = links + styles + bodyContent;

        // 4. Wait for fonts to load
        await new Promise(r => setTimeout(r, 1000));

        // 5. Render with html2canvas
        if (window.html2canvas) {
            try {
                const captureNode = container.querySelector('.certificate-container');
                if (!captureNode) {
                    throw new Error("Không tìm thấy nội dung giấy khen để chụp.");
                }

                // Temporary make it distinct to debug
                // captureNode.style.transform = 'none'; 

                const canvas = await window.html2canvas(captureNode, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#fffdf0',
                    logging: true, // Enable logging to see errors in console
                    onclone: (clonedDoc) => {
                        // Ensure cloned node is visible
                        const clonedNode = clonedDoc.querySelector('.certificate-container');
                        if (clonedNode) {
                            clonedNode.style.display = 'block';
                            clonedNode.style.visibility = 'visible';
                        }
                    }
                });

                const dataUrl = canvas.toDataURL("image/png");

                if (dataUrl.length < 100) {
                    throw new Error("Ảnh tạo ra bị lỗi (trống).");
                }

                // 6. Call callback
                if (window.app && window.app.showCertificatePreview) {
                    window.app.showCertificatePreview(dataUrl);
                }

            } catch (err) {
                console.error("Certificate Generation Error:", err);
                alert("Không thể tạo ảnh giấy khen: " + err.message + "\nBạn hãy thử lại hoặc báo cho admin.");
            }
        } else {
            alert("Thư viện ảnh chưa sẵn sàng. Vui lòng tải lại trang!");
        }
    }
}

window.certificateGenerator = new CertificateGenerator();
