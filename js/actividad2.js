"use strict";
const handlerPrincipal = () => {
    const arrayBotones = document.querySelectorAll(".reproductor__boton");
    const video = document.querySelector(".reproductor__video video");
    const nombre = document.getElementById("nombre");
    const mp4 = document.querySelector(".mp4");
    const mov = document.querySelector(".mov");
    const flv = document.querySelector(".flv");
    const volumen = document.getElementById("volumen");
    const progreso = document.getElementById("progreso");
    function avanceProgreso() {
        setInterval(function () {
            progreso.value = Math.round((video.currentTime / video.duration) * 100);
        });
    }
    const handlerCarga = (evento) => {
        let fichero = evento.target.value;
        let arrayFichero = fichero.split("\\");
        let ruta = "./video/" + arrayFichero[2].split(".")[0];
        const rutaMp4 = ruta + ".mp4";
        const rutaMov = ruta + ".mov";
        const rutaFlv = ruta + ".flv";
        mp4.src = rutaMp4;
        mov.src = rutaMov;
        flv.src = rutaFlv;
        video.load();
        volumen.min = 0;
        volumen.max = 1;
        volumen.step = 0.1;
        progreso.min = 0;
        progreso.max = 100;
        progreso.step = 1;
        progreso.value = 0;
        const handlerAccionBoton = (evento) => {
            let tiempo;
            switch (evento.target.name) {
                case "iniciar":
                    video.play();
                    avanceProgreso();
                    break;
                case "pausa":
                    video.pause();
                    break;
                case "parar":
                    video.load();
                    video.currentTime = 0;
                    break;
                case "avanzar":
                    tiempo = video.currentTime;
                    video.currentTime = tiempo + 10;
                    break;
                case "retroceder":
                    tiempo = video.currentTime;
                    video.currentTime = tiempo - 10;
                    break;
                case "inicio":
                    tiempo = 0;
                    video.currentTime = tiempo;
                    break;
                case "fin":
                    tiempo = video.duration - 0.1;
                    video.currentTime = tiempo;
                    video.play();
                    break;
                case "pantallaCompleta":
                    video.requestFullscreen();
                    video.mozRequestFullScreen();
                    video.webkitRequestFullscreen();
                    video.msRequestFullscreen();
            }
        };
        arrayBotones.forEach((boton) => {
            boton.addEventListener("click", handlerAccionBoton);
        });
        const handlerVolumen = (evento) => {
            const nivel = evento.target.value;
            video.volume = nivel;
        };
        volumen.addEventListener("change", handlerVolumen);
    };

    nombre.addEventListener("change", handlerCarga);
};
document.addEventListener("DOMContentLoaded", handlerPrincipal);
