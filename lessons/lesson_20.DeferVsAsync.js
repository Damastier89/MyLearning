const p = document.querySelectorAll('p');


function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.append(script);

}
loadScript('/lessons/lesson_18.Data-types.js');
loadScript('/lessons/lesson_17.Events.js');