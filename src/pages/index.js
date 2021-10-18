import * as React from 'react'
import * as styles from './index.module.css'
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet'


const links = [
    {
        url: '/about',
        text: 'About'
    },
    {
        url: encodeURI('/posts?tag=전체보기'),
        text: 'Posts'
    },
    {
        url: '/designs',
        text: 'Designs'
    },
    {
        url: '/',
        text: 'Portfolio'
    }
];


const MainTextStyle = {
    margin: '0',
    padding: '10px 40px 10px 10px',
    textAlign: 'right',
    fontWeight: '500',
    fontSize: '4rem',
    borderRight: '3px solid black'
};


let color = -30;
const randomColor = () => {
    color = Math.floor( ( color % 360 ) + 30 + 10 * Math.random() );
    return 'hsl(' + color + ', 50%, 50%)';
};


const randomMove = (move) => {
    return ((Math.random() * move) * (Math.random() < 0.5? -1 : 1));
};


function WaterPoint(options) {
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }

    this.c = Math.floor(Math.random() * 2);
    if (!this.fill) this.fill = randomColor();

    this.render();
}

WaterPoint.prototype = {
    
    size: 100,
    speed: 0.3,
    maxRender: 5,
    c: 0,

    build() {
        let move = this.size * 0.15;
        let sx = -this.size;
        let sy = 0;
        let start = [ sx, sy ];

        this.points = [];

        for (let rotation = 0; rotation < 2 * Math.PI; rotation += this.speed) {
            sx += this.size * this.speed * Math.sin(rotation) * (Math.random() < 0.5? 1 : 0.7) + randomMove(move);
            sy += this.size * this.speed * Math.cos(rotation) * (Math.random() < 0.5? 0.7 : 1) + randomMove(move);

            this.points.push([ sx, sy ]);
        }

        this.points.push(start);
    },

    expand() {
        if (!this.points) {
            this.build();
        }

        let move = this.size * 0.07;
        let p = [];
        let x, y, x2, y2;

        for (let i = 0; i < this.points.length - 1; i++) {
            x = this.points[i][0];
            y = this.points[i][1];
            x2 = this.points[i + 1][0];
            y2 = this.points[i + 1][1];

            p.push(
                [x, y],
                [((x + x2) / 2) + randomMove(move), ((y + y2) / 2) + randomMove(move)],
                [x2, y2]
            );
        }

        this.points = p;
    },

    render: function() {
        this.c++;
        if (this.c < (this.maxRender * 3)) {
            requestAnimationFrame(this.render.bind(this));
        }
        if (this.c % 3 == 0) {
            this.draw(this.c / 3);
        }
    },

    draw: function(c) {
        if (this.ctx) {
            this.expand();

            let ctx = this.ctx;
            let itr = (c / this.maxRender);

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalCompositeOperation = 'hard-light';
            ctx.globalAlpha = 0.25 - (itr * 0.1);
            ctx.filter = 'url(#pointfilter)';

            ctx.translate(this.x, this.y);
            ctx.scale(1 + itr * 0.2, 1 + itr * 0.2);

            ctx.beginPath();
            ctx.moveTo(this.points[0][0], this.points[0][1]);

            for (let i = 0; i < this.points.length; i++) {
                ctx.lineTo(this.points[i][0], this.points[i][1]);
            }

            ctx.closePath();
            ctx.fillStyle = this.fill;
            ctx.fill();
        }
    }
};


function drawWaterPoints(context, event) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let x = width * Math.random();
    let y = height * Math.random();

    if (event) {
        event = event.touches? event.touches[0] : event;
        x = event.clientX || event.x;
        y = event.clientY || event.y;
    }

    new WaterPoint({
        ctx: context,
        size: Math.min(width, height) * (0.2 + Math.random() * 0.1),
        x: x,
        y: y - 70
    })
}


const IndexPage = () => {


    React.useEffect(() => {
        const canvas = document.getElementById('main\-canvas');
        if(canvas.getContext) {
            const ctx = canvas.getContext('2d');
            const container = document.getElementById('home\-container');


            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);
            ctx.setTransform(1, 0, 0, 1, 0, 0);


            
            for(let i = 0; i < 10; i++) {
                new WaterPoint({
                    ctx: ctx,
                    size: Math.min(width, height) * (0.6),
                    speed: 0.2,
                    x: width * Math.random(),
                    y: height * Math.random()
                });
            }


            window.addEventListener('resize', () => {
                width = (canvas.width = window.innerWidth);
                height = (canvas.height = window.innerHeight);
            });

            container.addEventListener('click', (event) => {
                drawWaterPoints(ctx, event);
            });

            container.addEventListener('touchstart', (event) => {
                drawWaterPoints(ctx, event);
            })
        }
    });


    return (
        <div className={styles.container} id='home-container'>
            <Helmet>
                <title>Welcome | SJ_</title>
            </Helmet>

            <svg xmlns="http://www.w3.org/2000/svg" version='1.1' width='0' height='0'>
                <defs>
                    <filter id='pointfilter'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.3'  numOctaves='3' result='noise' seed='0' />
                        <feDisplacementMap in='SourceGraphic' in2='noise' scale='10'/>
                    </filter>
                </defs>
            </svg>
            <canvas id='main-canvas'></canvas>

            <div className={styles.contentDiv}>
                <p style={MainTextStyle}>Thanks<br/>for<br/>coming</p>
                <div className={styles.menuNav}>
                    <ul className={styles.menuList}>
                        {
                            links.map(node => (
                                <li key={node.text} className={styles.menuItems}>
                                    <Link to={node.url}>
                                        {node.text}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className={styles.bottomWaves}>
                <span></span>
            </div>
        </div>
    )
}


export default IndexPage