<script lang="ts">
    import { Button } from "$lib/components/ui/button";

    let noRef: HTMLDivElement;
    let isScared = false;
    let celebrate = false;
    let showCard = true;
    let successAudio: HTMLAudioElement;
    let showImage = false;

    let noPos = { x: 0, y: 0 };
    let noScale = 1;
    let noRotate = 0;

    let returnTimeout: ReturnType<typeof setTimeout>;

    const SCARE_DISTANCE = 60;
    const RETURN_DELAY = 1200;
    const ESCAPE_DURATION = 400;
    const RETURN_DURATION = 700;

    // Update this path to your actual image location
    const celebrationImagePath = "/images/yayyyy.png";

    function moveToRandom(far = false) {
        const rangeX = far ? 500 : 340;
        const rangeY = far ? 400 : 280;

        noPos.x = (Math.random() - 0.5) * rangeX;
        noPos.y = (Math.random() - 0.5) * rangeY;
        noScale = 0.88 + Math.random() * 0.24;
        noRotate = (Math.random() - 0.5) * 40;

        clearTimeout(returnTimeout);
        returnTimeout = setTimeout(returnToCenter, RETURN_DELAY);
    }

    function returnToCenter() {
        noPos = { x: 0, y: 0 };
        noScale = 1;
        noRotate = 0;
    }

    function onMouseMove(event: MouseEvent) {
        if (!noRef || !isScared || celebrate) return;

        const rect = noRef.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < SCARE_DISTANCE) {
            moveToRandom(true);
        }
    }

    function initialScare() {
        if (!isScared && !celebrate) {
            isScared = true;
            requestAnimationFrame(() => moveToRandom(false));
        }
    }

    async function onYesClick() {
        celebrate = true;
        
        // Show image after a short delay
        setTimeout(() => {
            showImage = true;
        }, 200);
        
        // Smooth collapse with delay
        setTimeout(() => {
            showCard = false;
        }, 300);

        // Play sound with error handling
        if (successAudio) {
            try {
                successAudio.currentTime = 0;
                await successAudio.play();
            } catch (err) {
                console.error("Audio playback failed:", err);
                // Fallback: vibrate if available
                if ('vibrate' in navigator) {
                    navigator.vibrate([200, 100, 200]);
                }
            }
        }
    }
</script>

<svelte:window on:mousemove={onMouseMove} />

<!-- 🎉 CELEBRATION OVERLAY -->
{#if celebrate}
    <div class="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-black/30">
        {#each Array(30) as _, i (i)}
            <span
                class="confetti"
                style="
                    left: {Math.random() * 100}%;
                    animation-delay: {Math.random()}s;
                    background: hsl({Math.random() * 360}, 80%, 60%);
                "
            />
        {/each}

        {#each Array(20) as _, i (i)}
            <span
                class="heart"
                style="
                    left: {Math.random() * 100}%;
                    animation-delay: {Math.random()}s;
                "
            >
                ❤️
            </span>
        {/each}

        <div class="celebrate-text">
            Yay! It's a Date 💖
        </div>

        <!-- 🖼️ CELEBRATION IMAGE - Rises from bottom -->
        {#if showImage}
            <div class="celebration-image">
                <img 
                    src={celebrationImagePath} 
                    alt="Celebration" 
                    class="w-full h-full object-contain"
                />
            </div>
            <div class="celebration-image1">
                <img 
                    src={celebrationImagePath} 
                    alt="Celebration" 
                    class="w-full h-full object-contain"
                />
            </div>
        {/if}
    </div>
{/if}

<div class="h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-red-50 to-pink-100 bg-image">

    {#if showCard}
        <!-- 💌 CARD -->
        <div class="p-8 md:p-10 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl
                    flex flex-col items-center gap-10 max-w-2xl w-full mx-4
                    transition-all duration-500 ease-out
                    {celebrate ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}">

            <p class="text-3xl md:text-4xl font-bold text-center text-gray-800">
                Will you be my Valentine? 🥺❤️
            </p>

            <div class="flex items-center justify-center gap-6 md:gap-10 w-full relative min-h-30">

                <!-- YES -->
                <Button
                    size="lg"
                    onclick={onYesClick}
                    class="text-lg md:text-xl px-10 md:px-14 py-7 md:py-8
                           bg-linear-to-r from-pink-500 to-rose-500
                           hover:from-pink-600 hover:to-rose-600
                           text-white shadow-lg hover:shadow-xl
                           transition-all duration-500 ease-out
                           {isScared ? 'scale-110 ring-4 ring-pink-300/50' : ''}"
                >
                    Yes!! 💕
                </Button>

                <!-- NO SLOT -->
                <div class="relative w-fit h-fit">
                    <div
                        bind:this={noRef}
                        class="absolute inset-0 transition-transform ease-out"
                        style={`transform:
                            translate(${noPos.x}px, ${noPos.y}px)
                            scale(${noScale})
                            rotate(${noRotate}deg);
                            transition-duration: ${noPos.x === 0 ? RETURN_DURATION : ESCAPE_DURATION}ms;
                            transition-timing-function: cubic-bezier(0.4, 1.8, 0.6, 1.0);`}
                    >
                        <Button
                            size="lg"
                            variant="outline"
                            class="text-lg md:text-xl px-10 md:px-14 py-7 md:py-8
                                   border-2 border-gray-300
                                   hover:border-red-400 hover:bg-red-50/70 hover:text-red-600
                                   transition-all duration-200 ease-out
                                   active:scale-90 cursor-none"
                            onmouseenter={initialScare}
                        >
                            No 😭
                        </Button>
                    </div>

                    <Button
                        size="lg"
                        variant="outline"
                        class="invisible px-10 md:px-14 py-7 md:py-8"
                    >
                        No 😭
                    </Button>
                </div>

            </div>
        </div>
    {/if}
</div>

<style>
    .bg-image {
        background-image: url('/images/bg-1.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    /* 🎊 Confetti */
    .confetti {
        position: absolute;
        top: -10px;
        width: 10px;
        height: 16px;
        animation: confetti-fall 3s linear infinite;
    }

    @keyframes confetti-fall {
        to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
        }
    }

    /* ❤️ Hearts */
    .heart {
        position: absolute;
        top: -20px;
        font-size: 1.5rem;
        animation: heart-fall 4s ease-in infinite;
    }

    @keyframes heart-fall {
        to {
            transform: translateY(110vh);
            opacity: 0;
        }
    }

    /* 💖 Celebration Text with Smooth Bouncy Animation */
    .celebrate-text {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(2.5rem, 7vw, 6rem);
        font-weight: bold;
        color: #ffffff;
        text-shadow: 
            0 10px 30px rgba(236, 72, 153, 0.6),
            0 0 20px rgba(255, 255, 255, 0.8);
        animation: bouncy-pop 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        z-index: 10;
    }

    @keyframes bouncy-pop {
        0% {
            transform: scale(0) translateY(100px);
            opacity: 0;
        }
        50% {
            transform: scale(1.15) translateY(-20px);
            opacity: 1;
        }
        65% {
            transform: scale(0.95) translateY(10px);
        }
        80% {
            transform: scale(1.05) translateY(-5px);
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }

    /* 🖼️ Celebration Image - Rises from bottom */
    .celebration-image {
        position: absolute;
        bottom: 0;
        left: 20%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 500px;
        height: auto;
        max-height: 45vh;
        animation: rise-from-bottom 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        z-index: 5;
    }

    .celebration-image1 {
        position: absolute;
        bottom: 0;
        left: 80%;
        transform: translateX(-50%);
        width: 80%;
        max-width: 500px;
        height: auto;
        max-height: 45vh;
        animation: rise-from-bottom 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        z-index: 5;
    }

    @keyframes rise-from-bottom {
        0% {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
</style>

<!-- 🔊 SUCCESS SOUND - Embedded audio (no external file needed) -->
<audio bind:this={successAudio} preload="auto">
    <!-- Using a simple celebratory chime sound encoded as base64 -->
    <source src="/sounds/success.mp3" />
</audio>