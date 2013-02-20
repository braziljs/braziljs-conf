get = (s) -> document.querySelector s
getAll = (s) -> document.querySelectorAll s

stage = get('#stage')

ctx = stage.getContext '2d'

sourceImage = new Image()
sourceImage.onload = -> ready()
sourceImage.src = 'images/poa.png'

ready = ->

    console.log 'ready'

    stage.width = sourceImage.width
    stage.height = sourceImage.height

    ctx.drawImage sourceImage, 0, 0

    drawArea =
        width  : stage.width
        height : stage.height - 371
        x      : 0
        y      : 371

    imageData = ctx.getImageData drawArea.x, drawArea.y, drawArea.width, drawArea.height
    pixels = imageData.data
    ln = pixels.length

    mapped = {}

    ## Extract colors
    colorsKeyed = {}
    colors = []

    for i in [0...ln] by 4
        # reset cycle position for every pixel
        # use RGB values as key
        rgb = pixels[i] + ',' + pixels[i+1] + ',' + pixels[i+2]
        unless colorsKeyed[rgb]
            j = colors.push rgb.split(',')
            colorsKeyed[rgb] = j-1
        mapped[i] = colorsKeyed[rgb]

    #colors = colors[8..22]

    # draw color pallete
    for color, i in colors
        colors[i] = color.map (c) -> +c
    #   ctx.fillStyle = "rgb(#{color})"
    #   ctx.fillRect 30*i, 540, 20, 20

    smoothColors = (times) ->
        for [0...times]
            sourceColors = colors.slice()
            colors = []
            for color, i in sourceColors
                colors.push color
                if next = sourceColors[i+1]
                    colors.push [
                        Math.floor (color[0] + next[0]) / 2
                        Math.floor (color[1] + next[1]) / 2
                        Math.floor (color[2] + next[2]) / 2
                    ]
            colors.push [
                        Math.floor (color[0] + colors[0][0]) / 2
                        Math.floor (color[1] + colors[0][1]) / 2
                        Math.floor (color[2] + colors[0][2]) / 2
                    ]

        (mapped[key] = pos*times % colors.length) for key, pos in mapped
        return null

    smoothColors 3

    lastColor = colors.length
    frames = []
    for i in [0...colors.length]
        c = ctx.createImageData drawArea.width, drawArea.height
        cdata = c.data
        for j in [0...ln] by 4
            pos = (mapped[j] + i) % lastColor
            color = colors[pos]
            cdata[j]   = color[0]
            cdata[j+1] = color[1]
            cdata[j+2] = color[2]
            cdata[j+3] = 255
        frames.push c

    ## Animation
    FPS = 30
    currentFrame = 0
    nframes = frames.length

    draw = ->
        ctx.putImageData frames[currentFrame], drawArea.x, drawArea.y
        currentFrame = (currentFrame+1) % nframes
        return null

    console.log "Starting animation"
    setInterval draw, 1000/FPS
