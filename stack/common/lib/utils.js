function rotateWall90(wall) {
    if(wall === 'N') {
        return 'E'
    } else if(wall === 'E') {
        return 'S'
    } else if(wall === 'S') {
        return 'W'
    } else if(wall === 'W') {
        return 'N'
    } else if(wall === 'NE') {
        return 'SE'
    } else if(wall === 'NW') {
        return 'NE'
    } else if(wall === 'SW') {
        return 'NW'
    } else if(wall === 'SE') {
        return 'SW'
    } else if(wall === 'X') {
        return 'X'
    } else {
        return ''
    }
}

function rotate(matrix, times = 1) {
    do {
        const N = matrix.length - 1
        const result = matrix.map((row, i) =>
            row.map((val, j) => rotateWall90(matrix[N - j][i]))
        )
        matrix.length = 0
        matrix.push(...result)

        --times
    } while(times > 0)
    return matrix
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    rotate,
    randomIntFromInterval
}