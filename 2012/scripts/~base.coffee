$ = (sel) -> Array::slice.call document.querySelectorAll sel
$$ = (sel) -> document.querySelector sel

window.requestAnimationFrame ?= 
    window.webkitRequestAnimationFrame or
    window.mozRequestAnimationFrame or
    window.msRequestAnimationFrame or
    window.oRequestAnimationFrame or
    (fn, el) -> setTimeout fn, 1000/60

poa = document.getElementById 'poa'

###
Paralaxe na imagem do topo
###
if screen.width > 640 then window.addEventListener 'scroll', (e) ->
    position = document.body.scrollTop
    poa.style.backgroundPositionY = (-position/2.2).toFixed(1) + 'px' if position < 600
    return

$('.speaker-image').forEach (svg) ->
    return

    pattern = svg.getElementsByTagName('image')[0]
    href = pattern.getAttribute('xlink:href')
    active = href.replace '.jpg', '-active.jpg?jun28'

    svg.addEventListener 'mouseover', ->
        pattern.setAttribute 'xlink:href', active

    svg.addEventListener 'mouseout', ->
        pattern.setAttribute 'xlink:href', href

###
Faz buracos nas fotos dos palestrantes. PNG é para os fracos,
e assim as imagens ficam muito mais leves
###

createCanvas = (w, h) ->
    canvas = document.createElement 'canvas'
    canvas.width = w
    canvas.height = h
    return canvas

circle = (ctx, x, y, r) ->
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2, true)
    ctx.closePath()

stamp = (image, x, y) ->
    canvas = createCanvas 120, 120
    ctx = canvas.getContext '2d'
    ctx.fillStyle = ctx.createPattern image, 'no-repeat'
    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'rgba(100,100,100,0.2)'
    circle ctx, 60, 60, 60
    ctx.translate x, y
    ctx.fill()
    ctx.stroke()
    return canvas

pokeHoles = (image) ->
    # normal
    canvas1 = stamp image, 0, 0
    image.parentNode.appendChild canvas1
    # hover
    canvas2 = stamp image, 0, -120
    canvas2.className = 'active'
    image.parentNode.appendChild canvas2
    # remover imagem original
    image.parentNode.removeChild image
    # salvar em cache
    localStorage[image.src] = canvas1.toDataURL()
    localStorage[image.src+':hover'] = canvas2.toDataURL()
    console.log localStorage[image.src+':hover']?

if document.createElement('canvas').getContext?
    $('.speakers .photo img').forEach (image) ->
        image.className = 'preparing'
        source = image.src
        try
            if cached = localStorage[source]
                image.src = cached
                image.className = 'gen'
                active = new Image
                active.src = localStorage[source+':hover']
                active.className = 'active'
                image.parentNode.appendChild active
            else
                img = new Image
                img.onload = -> pokeHoles image
                img.src = image.src
        catch e
            # revert to original images
            image.className = ''

###
Scrolling effect for navigation
###
offsetTop = (el) ->
    return unless el.offsetParent
    top = el.offsetTop
    top += el.offsetTop while el = el.offsetParent
    return top

animateScrollTo = (end, speed = 5) ->
    pos = 0
    start = document.body.scrollTop
    range = end - start
    direction = if end > start then 1 else -1
    move = ->
        pos += direction * speed
        scroll = document.body.scrollTop = start + range * Math.sin(Math.PI/2 * pos/100)
        return if direction is 1 and scroll >= end
        return if direction is -1 and scroll <= end
        requestAnimationFrame move
    move()

if screen.width > 600 then $('#nav a').forEach (a) ->
    a.addEventListener 'click', (e) ->
        target = (e.target.href.split('#') || [])[1]
        return unless target?
        end = offsetTop $$('#'+target)
        animateScrollTo end

window.addEventListener 'load', ->
    return if screen.width < 600
    if window.location.hash isnt ""
        if target = $$(location.hash)
            end = offsetTop(target) - 20
            animateScrollTo end, 20
    else if $$('.page')?
        console.lg
        end = offsetTop $$('.main')
        animateScrollTo end
, false

###
External links
###
$('a[rel=external]').forEach (a) ->
    a.addEventListener 'click', (e) ->
        e.preventDefault()
        window.open e.target.href || e.target.parentNode.href
