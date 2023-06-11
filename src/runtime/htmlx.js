function HTMLX_compile() {
    const m = {
            getQ: function(sel) {
                return document.querySelectorAll(sel)
            }
        } // methods

    const Exec = (f) => {
        return Function('return ' + f)()
    }

    // href属性を全要素に適応する
    let hrefs = m.getQ('[href]')

    for (let i = 0; i < hrefs.length; i++) {
        hrefs[i].onclick = function(e) {
            e.preventDefault()
            if (hrefs[i].getAttribute('target')) {
                window.open(hrefs[i].getAttribute('href'), hrefs[i].getAttribute('target'))
            } else {
                window.open(hrefs[i].getAttribute('href'))
            }
        }
    }

    // onhover hoverした時とhoverから外れた時に関数実行
    let onhovers = m.getQ('[onhover]')

    for (let i = 0; i < onhovers.length; i++) {
        onhovers[i].onmouseover = function(e) {
            e.preventDefault()
            Exec(onhovers[i].getAttribute('onhover'))
        }
        onhovers[i].onmouseout = function(e) {
            e.preventDefault()
            Exec(onhovers[i].getAttribute('onhoverout'))
        }
    }

    // scroll overflowでもスクロール表示を制御
    let scrolls = m.getQ('[scroll]')

    for (let i = 0; i < scrolls.length; i++) {
        if (scrolls[i].getAttribute('scroll') == 'x') {
            scrolls[i].style.overflowX = 'scroll'
            scrolls[i].style.whiteSpace = 'nowrap'
        } else if (scrolls[i].getAttribute('scroll') == 'y') {
            scrolls[i].style.overflowY = 'scroll'
            scrolls[i].style.whiteSpace = 'nowrap'
        } else {
            scrolls[i].style.overflow = 'scroll'
        }
    }

    // size fontsizeをpx単位で。
    let sizes = m.getQ('[size]')

    for (let i = 0; i < sizes.length; i++) {
        sizes[i].style.fontSize = sizes[i].getAttribute('size')
    }

    // animation
    let animes = m.getQ('[anime]')

    for (let i = 0; i < animes.length; i++) {
        let anime_prop = animes[i].getAttribute('anime').split(' ')
        let anime_style = ''
        for (let j = 0; j < anime_prop.length; j++) {
            anime_style += anime_prop[j] + ' '
        }
        animes[i].style.animation = anime_style
    } // 更新の抑制

    // emoji emoji表示の為に最適化
    let emojis = m.getQ('[emoji]')

    for (let i = 0; i < emojis.length; i++) {
        emojis[i].style.width = 'fit-content'
        emojis[i].style.height = 'fit-content'
        emojis[i].style.display = 'inline-block'
        emojis[i].style.background = 'transparent'
    }

    // css:Property=Value
    let elements = document.getElementsByTagName("*");

    let CSSprops = [];
    let CSSvalues = [];

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        let attributes = Array.from(element.attributes);

        for (let j = 0; j < attributes.length; j++) {
            let attribute = attributes[j];

            if (attribute.name.startsWith('css:')) {
                let propName = attribute.name.substring(4);
                let propValue = attribute.value;

                CSSprops.push(propName);
                CSSvalues.push(propValue);
            }
        }

        for (let k = 0; k < CSSprops.length; k++) {
            if (element.style.hasOwnProperty(CSSprops[k])) {
                element.style[CSSprops[k]] = CSSvalues[k];
            }
        }

        CSSprops = [];
        CSSvalues = [];
    }


    // markdown

    function convertMark(md) {
        md = md.replace(/^\s+/gm, '')

        md = md.replace(/^\s*---\s*$/gm, '<hr>')
        md = md.replace(/^\s*___\s*$/gm, '<hr>')
        md = md.replace(/^\s*\*\*\*\s*$/gm, '<hr>') //後でstyle充てる

        md = md.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        md = md.replace(/\*\*(?!\*)(.*?)\*\*/g, '<strong>$1</strong>')
        md = md.replace(/\*(?!\*)(.*?)\*/g, '<em>$1</em>')
        md = md.replace(/--(.*?)--/g, '<del>$1</del>')

        md = md.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')

        md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

        md = md.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')

        md = md.replace(/`([^`]+)`/g, '<code>$1</code>')

        md = md.replace(/^#\s+(.*)$/gm, '<t1>$1</t1>')
        md = md.replace(/^##\s+(.*)$/gm, '<t2>$1</t2>')
        md = md.replace(/^###\s+(.*)$/gm, '<t3>$1</t3>')
        md = md.replace(/^####\s+(.*)$/gm, '<t4>$1</t4>')
        md = md.replace(/^#####\s+(.*)$/gm, '<t5>$1</t5>')
        md = md.replace(/^######\s+(.*)$/gm, '<t6>$1</t6>')

        md = md.replace(/\n/g, '<br>')

        return md
    }

    let markdowns = m.getQ('[markdown]')

    for (let i = 0; i < markdowns.length; i++) {
        markdowns[i].innerHTML = convertMark(markdowns[i].innerHTML)
    }

    

}

function HTMLX_init() {
    const def_css = `
        <style htmlx-css>
            *, *::before, *::after {
                box-sizing: border-box
            }

            box {
                display: flex
            }

            [br],[BR] {
                flex-wrap: wrap
            }

            a, a:visited {
                color: inherit
            }

            t1,t2,t3,t4,t5,t6 {
                font-weight: bold
            }

            /*h1~h6*/
              t1 {
                font-size: 2em
              }
              
              t2 {
                font-size: 1.5em
              }
              
              t3 {
                font-size: 1.17em
              }
              
              t4 {
                font-size: 1em
              }
              
              t5 {
                font-size: 0.83em
              }
              
              t6 {
                font-size: 0.67em
              }
              

            /*animarions*/

            @keyframes x-rotate {
                0% {
                    transform: rotate(0)
                }
                100% {
                    transform: rotate(360deg)
                }
            }

            @keyframes x-rotate-reverse {
                0% {
                    transform: rotate(0)
                }

                100% {
                    transform: rotate(-360deg)
                }
            }

            @keyframes x-scale {
                0% {
                    transform: scale(1)
                }

                100% {
                    transform: scale(1.1)
                }
            }

            [circle] {
                border-radius: 50%
            }

            [topmost] {
                z-index: 199999999;
            }
        </style>
    `; // 後でminify

    document.head.insertAdjacentHTML('beforeend', def_css)

    HTMLX_compile()
}

HTMLX_init()