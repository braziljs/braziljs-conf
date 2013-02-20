$ = (sel) -> Array::slice.call document.querySelectorAll sel
$$ = (sel) -> document.querySelector sel

prefix = do ->
    div = document.createElement 'div'
    return p for p in ['webkit', 'Moz', 'O', 'ms'] when div.style[p+'Transform']?

cssPrefix = if not prefix then ''  else "-#{prefix.toLowerCase()}-"

parts = [
    $$('.p0')
    $$('.p1')
    $$('.p2')
    $$('.p3')
    $$('.p4')
]

p.style.display = 'block' for p in parts

imageSizes = [
    [980, 400]
    [980, 440]
    [625, 60]
    [625, 80]
    [625, 105]
]

imageSpeed = [1, 3, 6, 8.5, 13]
baseSpeed = 600

cssAnimation = null

do setupAnimation = ->
    return if not prefix

    cssAnimation = document.createElement 'style'
    cssAnimation.type = 'text/css'
    $$('head').appendChild cssAnimation
    $$('html').style.background = '#324544'

    rules = ''

    parts.forEach (p, i) ->
        styles = getComputedStyle(p)
        width  = parseInt(styles['width'], 10)
        height = parseInt(styles['height'], 10)

        imageWidth = Math.floor (height / imageSizes[i][1]) * imageSizes[i][0]
        rules += """
            @#{cssPrefix}keyframes slice#{i} {
                0%   { #{cssPrefix}transform:translateX(0); }
                100% { #{cssPrefix}transform:translateX(-#{imageWidth}px); }
            }
            .p#{i} {
                width: #{width+imageWidth}px;
                #{cssPrefix}animation: slice#{i} #{Math.floor baseSpeed / imageSpeed[i]}s linear infinite;
            }
        """
    if cssAnimation.styleSheet
        cssAnimation.styleSheet.cssText = rules
    else
        cssAnimation.appendChild document.createTextNode rules
    return

resetAnimation = ->
    cssAnimation?.parentNode.removeChild cssAnimation
    setupAnimation()

resizeTimer = 0
window.onresize = ->
    clearTimeout resizeTimer
    resizeTimer = setTimeout resetAnimation, 300

speed = 10
document.body.addEventListener 'keydown', (e) ->
    e.which ?= e.keycode

    if e.which is 37 # left arrow
        speed = Math.max speed-9, 0
    else if e.which is 39 # right arrow
        speed = Math.min speed+10, 1000
    else
        return

    for p, i in parts
        p.style["#{prefix}AnimationDuration"] = "#{(6000 / speed / imageSpeed[i]).toFixed(2)}s"
    
, false

window.getUserLanguage = (data) ->
    if data.address.country isnt 'Brazil'
        $$('.line').innerHTML = """
            The greatest<br/>
            javascript conference<br/>
            in the universe
        """
        $$('.where').innerHTML = """
            August 30th and 31st
            Bourbon Country Theater
            Porto Alegre, RS, Brazil
        """
        #history.pushState null, document.title, "en"
    