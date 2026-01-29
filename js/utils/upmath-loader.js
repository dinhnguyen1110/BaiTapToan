/**
 * UpmathLoader
 * Manages the rendering of TikZ/LaTeX diagrams using the i.upmath.me API.
 * Converts <script type="text/tikz"> blocks into <img> tags.
 */
class UpmathLoader {
    constructor() {
        this.baseUrl = "https://i.upmath.me/svg/";
    }

    /**
     * Scan the DOM element for text/tikz scripts and render them.
     */
    render(container) {
        if (!container) return;

        const scripts = container.querySelectorAll('script[type="text/tikz"]');
        if (scripts.length === 0) return;

        console.log(`[UpmathLoader] Found ${scripts.length} diagrams to render.`);

        scripts.forEach(script => {
            const tikzCode = script.textContent.trim();
            if (!tikzCode) return;

            // Inject necessary libraries for coordinate calculations and advanced geometry
            const libraries = "\\usetikzlibrary{calc,angles,intersections,quotes,backgrounds} ";
            const fullTexCode = libraries + tikzCode;

            // Encode the TikZ code for URL
            const encodedCode = encodeURIComponent(fullTexCode);
            const imageUrl = `${this.baseUrl}${encodedCode}`;

            // Create image element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "TikZ Diagram";
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.display = "block";

            // Handle loading errors
            img.onerror = () => {
                console.error("Failed to load image from upmath.me");
                img.style.display = 'none'; // distinct error handling could go here
                // Maybe replace with text?
                const errorText = document.createElement('div');
                errorText.className = "text-red-500 text-sm italic";
                errorText.innerText = "(Lỗi tải hình ảnh)";
                script.parentNode.insertBefore(errorText, script);
            };

            // Replace script with image
            // We use insertBefore + remove to swap them
            if (script.parentNode) {
                script.parentNode.insertBefore(img, script);
                // We don't remove the script strictly speaking, but hiding it or removing it is fine.
                // Removing cleaning up the DOM.
                script.remove();
            }
        });
    }
}

// Export global instance
window.upmathLoader = new UpmathLoader();
