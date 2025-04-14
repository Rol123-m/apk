/* filepath: /workspaces/apk/script.js */
const container = document.getElementById("animation-container");
const reloadButton = document.getElementById("reload-button");
const backgroundMusic = document.getElementById("background-music");

// Create the pause button
const pauseButton = document.createElement("button");
pauseButton.id = "pause-button";
pauseButton.textContent = "Pausar";
document.body.appendChild(pauseButton);

let isPaused = false;
let currentSlide = 0;
let timeoutId;

const slides = [
    {
        text: "Curso de Griego del ministerio:<br><span class='highlight'>Vivos para Servir</span>, <span class='highlight'>Tips, semana 2</span> y <span>. ",
        animation: "fadeIn"
    },
    {
        text: "Los sustantivos griegos tienen tres géneros:<br><span class='highlight'>Masculino</span>, <span class='highlight'>Femenino</span> y <span class='highlight'>Neutro</span>.",
        animation: "fadeIn"
    },
    {
        text: "Tienen dos números:<br><span class='highlight'>Singular</span> y <span class='highlight'>Plural</span>.",
        animation: "fadeIn"
    },
    {
        text: "Y cuatro casos principales:<br><span class='highlight'>Nominativo</span>, <span class='highlight'>Genitivo</span>, <span class='highlight'>Dativo</span> y <span class='highlight'>Acusativo</span>.",
        animation: "fadeIn"
    },
    {
        text: `
            <h3>3.1. Nominativo</h3>
            <p><strong>Función:</strong> Sujeto de la oración.</p>
            <p><strong>Ejemplo:</strong><br>"Ὁ λόγος σὰρξ ἐγένετο" (Juan 1:14).<br>(El Verbo se hizo carne).</p>
            <p>En este ejemplo, <span class='highlight'>λόγος</span> cumple la función de sujeto, ya que su desinencia indica que está en caso nominativo.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.2. Genitivo (Parte 1)</h3>
            <p><strong>Función:</strong> Posesión, relación ("de").</p>
            <p><strong>Ejemplo:</strong><br>"ἡ ἀγάπη τοῦ θεοῦ" (1 Juan 4:9).<br>(El amor de Dios).</p>
            <p>En este caso <span class='highlight'>θεοῦ</span> se encuentra en caso genitivo, por tanto su función es posesiva, o de relación.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.2. Genitivo (Parte 2)</h3>
            <p>El genitivo se traduce con la palabra especial <span class='highlight'>de</span>, e indica las siguientes funciones:</p>
            <ul>
                <li>Posesión: El libro de Rolando.</li>
                <li>Relación familiar: El hijo de Dios.</li>
                <li>Contenido: Una taza de café.</li>
                <li>Material: Una taza de cerámica.</li>
            </ul>
            <p>Por ahora, es suficiente con traducirla con la palabra <span class='highlight'>de</span>, el contexto determina la función.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.3. Dativo</h3>
            <p><strong>Función:</strong> Objeto indirecto ("a, para, por, con").</p>
            <p><strong>Ejemplo:</strong><br>"ἐὰν ὑμεῖς μείνητε ἐν τῷ λόγῳ τῷ ἐμῷ" (Juan 8:31).<br>(Si ustedes permanecen en mis palabras).</p>
            <p>En este ejemplo podemos ver a <span class='highlight'>λόγῳ</span> en caso dativo. Deben notar la iota subscrita debajo de la omega, ya que esa es la pista de este caso.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.4. Acusativo (Parte 1)</h3>
            <p><strong>Función:</strong> Objeto directo.</p>
            <p><strong>Ejemplo:</strong><br>"ἠγάπησεν ὁ θεὸς τὸν κόσμον" (Juan 3:16).<br>(Dios amó al mundo).</p>
            <p>En este caso, la palabra <span class='highlight'>κόσμον</span> se encuentra en caso acusativo.</p>
        `,
        animation: "typewriter"
    },
    {
        text: `
            <h3>3.4. Acusativo (Parte 2)</h3>
            <p>Responde al complemento directo del verbo. La pregunta sería, ¿Qué es lo amado? El complemento directo responde a esa pregunta.</p>
        `,
        animation: "typewriter"
    },
    {
        text: `
            <p><strong>Nota importante:</strong> Las terminaciones son las que indican los casos.</p>
        `,
        animation: "fadeIn"
    }
];

function createSlide(content, animation) {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = content;

    container.appendChild(slide);

    if (animation === "fadeIn") {
        gsap.to(slide, { opacity: 1, duration: 1.5, onComplete: () => {
            if (!isPaused) {
                timeoutId = setTimeout(nextSlide, 7000); // Adjusted time for reading
            }
        } });
    } else if (animation === "progressive") {
        const elements = slide.querySelectorAll("p, h3, ul, li");
        gsap.to(slide, { opacity: 1, duration: 0.5 });
        elements.forEach((el, index) => {
            gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: index * 0.5 });
        });
        setTimeout(() => {
            if (!isPaused) nextSlide();
        }, 10000); // Adjusted time for progressive animations
    } else if (animation === "typewriter") {
        const text = slide.innerHTML;
        slide.innerHTML = ""; // Clear the content for typewriter effect
        container.appendChild(slide);

        let i = 0;
        function type() {
            if (i < text.length) {
                slide.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50); // Speed of typing
            } else {
                setTimeout(nextSlide, 3000); // Delay before moving to the next slide
            }
        }
        type();
    }
}

function nextSlide() {
    if (isPaused) return;

    const slidesOnScreen = document.querySelectorAll(".slide");
    if (slidesOnScreen.length > 0) {
        gsap.to(slidesOnScreen[0], { opacity: 0, duration: 1, onComplete: () => slidesOnScreen[0].remove() });
    }
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        setTimeout(() => createSlide(slides[currentSlide].text, slides[currentSlide].animation), 1000);
    } else {
        reloadButton.style.display = "block";
    }
}

// Pause/Resume functionality
pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Reanudar" : "Pausar";

    if (!isPaused) {
        nextSlide();
        backgroundMusic.play();
    } else {
        clearTimeout(timeoutId);
        backgroundMusic.pause();
    }
});

createSlide(slides[currentSlide].text, slides[currentSlide].animation);/* filepath: /workspaces/apk/script.js */
const container = document.getElementById("animation-container");
const reloadButton = document.getElementById("reload-button");
const backgroundMusic = document.getElementById("background-music");

// Create the pause button
const pauseButton = document.createElement("button");
pauseButton.id = "pause-button";
pauseButton.textContent = "Pausar";
document.body.appendChild(pauseButton);

let isPaused = false;
let currentSlide = 0;
let timeoutId;

const slides = [
    {
        text: "Curso de Griego del ministerio:<br><span class='highlight'>Vivos para Servir</span>, <span class='highlight'>Tips, semana 2</span> y <span>. ",
        animation: "fadeIn"
    },
    {
        text: "Los sustantivos griegos tienen tres géneros:<br><span class='highlight'>Masculino</span>, <span class='highlight'>Femenino</span> y <span class='highlight'>Neutro</span>.",
        animation: "fadeIn"
    },
    {
        text: "Tienen dos números:<br><span class='highlight'>Singular</span> y <span class='highlight'>Plural</span>.",
        animation: "fadeIn"
    },
    {
        text: "Y cuatro casos principales:<br><span class='highlight'>Nominativo</span>, <span class='highlight'>Genitivo</span>, <span class='highlight'>Dativo</span> y <span class='highlight'>Acusativo</span>.",
        animation: "fadeIn"
    },
    {
        text: `
            <h3>3.1. Nominativo</h3>
            <p><strong>Función:</strong> Sujeto de la oración.</p>
            <p><strong>Ejemplo:</strong><br>"Ὁ λόγος σὰρξ ἐγένετο" (Juan 1:14).<br>(El Verbo se hizo carne).</p>
            <p>En este ejemplo, <span class='highlight'>λόγος</span> cumple la función de sujeto, ya que su desinencia indica que está en caso nominativo.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.2. Genitivo (Parte 1)</h3>
            <p><strong>Función:</strong> Posesión, relación ("de").</p>
            <p><strong>Ejemplo:</strong><br>"ἡ ἀγάπη τοῦ θεοῦ" (1 Juan 4:9).<br>(El amor de Dios).</p>
            <p>En este caso <span class='highlight'>θεοῦ</span> se encuentra en caso genitivo, por tanto su función es posesiva, o de relación.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.2. Genitivo (Parte 2)</h3>
            <p>El genitivo se traduce con la palabra especial <span class='highlight'>de</span>, e indica las siguientes funciones:</p>
            <ul>
                <li>Posesión: El libro de Rolando.</li>
                <li>Relación familiar: El hijo de Dios.</li>
                <li>Contenido: Una taza de café.</li>
                <li>Material: Una taza de cerámica.</li>
            </ul>
            <p>Por ahora, es suficiente con traducirla con la palabra <span class='highlight'>de</span>, el contexto determina la función.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.3. Dativo</h3>
            <p><strong>Función:</strong> Objeto indirecto ("a, para, por, con").</p>
            <p><strong>Ejemplo:</strong><br>"ἐὰν ὑμεῖς μείνητε ἐν τῷ λόγῳ τῷ ἐμῷ" (Juan 8:31).<br>(Si ustedes permanecen en mis palabras).</p>
            <p>En este ejemplo podemos ver a <span class='highlight'>λόγῳ</span> en caso dativo. Deben notar la iota subscrita debajo de la omega, ya que esa es la pista de este caso.</p>
        `,
        animation: "progressive"
    },
    {
        text: `
            <h3>3.4. Acusativo (Parte 1)</h3>
            <p><strong>Función:</strong> Objeto directo.</p>
            <p><strong>Ejemplo:</strong><br>"ἠγάπησεν ὁ θεὸς τὸν κόσμον" (Juan 3:16).<br>(Dios amó al mundo).</p>
            <p>En este caso, la palabra <span class='highlight'>κόσμον</span> se encuentra en caso acusativo.</p>
        `,
        animation: "typewriter"
    },
    {
        text: `
            <h3>3.4. Acusativo (Parte 2)</h3>
            <p>Responde al complemento directo del verbo. La pregunta sería, ¿Qué es lo amado? El complemento directo responde a esa pregunta.</p>
        `,
        animation: "typewriter"
    },
    {
        text: `
            <p><strong>Nota importante:</strong> Las terminaciones son las que indican los casos.</p>
        `,
        animation: "fadeIn"
    }
];

function createSlide(content, animation) {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = content;

    container.appendChild(slide);

    if (animation === "fadeIn") {
        gsap.to(slide, { opacity: 1, duration: 1.5, onComplete: () => {
            if (!isPaused) {
                timeoutId = setTimeout(nextSlide, 7000); // Adjusted time for reading
            }
        } });
    } else if (animation === "progressive") {
        const elements = slide.querySelectorAll("p, h3, ul, li");
        gsap.to(slide, { opacity: 1, duration: 0.5 });
        elements.forEach((el, index) => {
            gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: index * 0.5 });
        });
        setTimeout(() => {
            if (!isPaused) nextSlide();
        }, 10000); // Adjusted time for progressive animations
    } else if (animation === "typewriter") {
        const text = slide.innerHTML;
        slide.innerHTML = ""; // Clear the content for typewriter effect
        container.appendChild(slide);

        let i = 0;
        function type() {
            if (i < text.length) {
                slide.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50); // Speed of typing
            } else {
                setTimeout(nextSlide, 3000); // Delay before moving to the next slide
            }
        }
        type();
    }
}

function nextSlide() {
    if (isPaused) return;

    const slidesOnScreen = document.querySelectorAll(".slide");
    if (slidesOnScreen.length > 0) {
        gsap.to(slidesOnScreen[0], { opacity: 0, duration: 1, onComplete: () => slidesOnScreen[0].remove() });
    }
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        setTimeout(() => createSlide(slides[currentSlide].text, slides[currentSlide].animation), 1000);
    } else {
        reloadButton.style.display = "block";
    }
}

// Pause/Resume functionality
pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Reanudar" : "Pausar";

    if (!isPaused) {
        nextSlide();
        backgroundMusic.play();
    } else {
        clearTimeout(timeoutId);
        backgroundMusic.pause();
    }
});

createSlide(slides[currentSlide].text, slides[currentSlide].animation);
