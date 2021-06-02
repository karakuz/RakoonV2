

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        const register = navigator.serviceWorker.register("./serviceworker.js")
            .then((reg) => console.log("Success: ", reg.scope))
            .catch((err) => console.log(err));


    });
}



