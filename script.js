let time = 0;
let x = 0;

const opt = {
    radius: 150,
    radiusY: 0.4,
    maxSpeed: 0.05,
    maxRotation: 50,
     minOpacity: 0.3,
     spacer: "-"

}
const scale = (a,b,c,d,e) =>{
    return ((a-b) * (e-d))/(c-d)+d;
}

const lerp = (v0,v1,t)=>{
    return v0 * (1-t) +v1*t
}
const createInvarders=()=>{
    const word = document.getElementById("word");
    const letters = word.innerHTML.replace(/\s/g, opt.spacer).split("").reverse()
    word.innerHTML = "";
    letters.forEach((i)=>{
        const l = document.createElement("span")
        l.innerHTML = i;
        word.appendChild(l);
    })
}
    createInvarders();

    const letter = document.querySelectorAll("#word span")

    const animate =()=>{
        if(!letter) return;
        x = lerp(x,0.65,0.1);
        const rotation = -opt.maxRotation + x * opt.maxRotation *2;
        const speed = -opt.maxSpeed + x * opt.maxSpeed*2;
        const modY = 1 + x*-2;

        time -= speed;
        letter.forEach((i,ind) =>{
            const teta = 1-ind/letter.length;
            const x= opt.radius * Math.sin(time + teta * Math.PI *2);
            const y= opt.radius * opt.radiusY * Math.cos(modY + time + teta*Math.PI*2);
            const s = scale(
                y,
                -opt.radius * opt.radiusY,
                opt.radius* opt.radiusY,
                opt.minOpacity,
                1
            );
            Object.assign(i.style,{
                zIndex : Math.min(2, Math.max(-2, Math.ceil(y))),
                filter: `blur(${4-5*s}px)`,
                opacity: s,
                transform: `translate3d(${x}px, ${y}px,0) rotate(${rotation}deg)`
            })
        })
        requestAnimationFrame(animate);
    }

animate();

