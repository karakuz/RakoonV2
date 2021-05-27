

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        const register = navigator.serviceWorker.register("./serviceworker.js")
            .then((reg) => console.log("Success: ", reg.scope))
            .catch((err) => console.log(err));

        send().catch(err => console.log(err));
    });


}

async function send() {
    const register = await navigator.serviceWorker.register("./serviceworker.js")
    const subscribtion = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BDBeRvuYwbqaz2_m4-3Mai3FFyyCZwQ8u2X12AKPg_KBGzf6_Lh40g4r-0vGdYlI4qYozJJ10VcWJB8p4lel9Ro")
    });

    await fetch("http://localhost:4000/store/sendNotification", {
        method: "POST",
        body: JSON.stringify(subscribtion),
        headers: {
            "content-type": "application/json"
        },

    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}