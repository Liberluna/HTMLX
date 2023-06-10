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
    let csss = document.querySelectorAll("*"); //css:から始まるモノのみに変更

    let CSSprops = []
    let CSSvalues = []

    for (let i = 0; i < csss.length; i++) {
        let element = csss[i]
        let attributes = Array.from(element.attributes)

        for (let j = 0; j < attributes.length; j++) {
            let attribute = attributes[j]

            if (attribute.name.startsWith('css:')) {
                let propName = attribute.name.substring(4)
                let propValue = attribute.value

                CSSprops.push(propName)
                CSSvalues.push(propValue)
            }

            for (let k = 0; k < CSSprops.length; k++) {
                element.style[CSSprops[k]] = CSSvalues[k]
            }
        }
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

            a, a:visited {
                color: inherit
            }

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
        </style>
    `; // 後でminify

    document.head.insertAdjacentHTML('beforeend', def_css)

    HTMLX_compile()
}

HTMLX_init()