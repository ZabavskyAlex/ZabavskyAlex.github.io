let dx = 0,
    forward = true,
    step = 5;

(function animate() {
    let window_width = window.innerWidth;

    if(window_width < 400)
        step = 1;
    else if(window_width < 780)
        step = 2;
    else  if(window_width < 1200)
        step = 4;
    else
        step = 5;


    if(dx > window.innerWidth)
        dx = 0;

    if(dx > window.innerWidth - train.width - 40)
        forward = false;
    else if (dx < 40)
        forward = true;


    if(forward)
        dx += step;
    else
        dx -= step;

    train.parentElement.style.left = dx + 'px';

    requestAnimationFrame(animate)
}());

document.getElementById('wrapper').onclick = event => {
    let element = event.target;
    if(element.classList.contains('open-content-FAQ')){
        element.parentElement.parentElement.children[1].classList.toggle('content-none');
        if(element.classList.contains("glyphicon-circle-arrow-down")){
            element.classList.remove("glyphicon-circle-arrow-down");
            element.classList.add("glyphicon-circle-arrow-up")
        }
        else {
            element.classList.add("glyphicon-circle-arrow-down");
            element.classList.remove("glyphicon-circle-arrow-up")
        }
    }
    else if(element.id === 'sing-up'){
            href = 'https://drive.google.com/open?id=1JzgBTyLG981WnLSjv6hLuVtabyccR-8r9USnBLm1m9Q';
            window.open(href);
    }
    else if(element.id === 'open-mobile-nav'){
        document.getElementById('nav').classList.toggle('open-nav');

    }
    else if(element.tagName === 'A' && element.parentElement.parentElement.parentElement.id === 'nav'){
        document.getElementById('nav').classList.toggle('open-nav');
    }
    else if(element.id === 'span-bg-music'){
        if(element.classList.contains("glyphicon-volume-up")){
            element.classList.remove("glyphicon-volume-up");
            element.classList.add("glyphicon-volume-off");
            document.getElementById('bg-music').pause();
        }
        else {
            element.classList.add("glyphicon-volume-up");
            element.classList.remove("glyphicon-volume-off");
            document.getElementById('bg-music').play();
        }
    }
};
