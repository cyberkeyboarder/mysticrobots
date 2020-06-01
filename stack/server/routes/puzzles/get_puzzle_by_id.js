const puzzles = require('common').services.puzzles

const get_puzzle_by_id = async (req, res) => {
    const puzzleId = req.params.puzzleId

    if(!req.params.puzzleId) {
        res.status(404).send("No puzzle found")
        return
    }
 
    const data = await puzzles.getPuzzleById({ puzzleId })

    if(!data) {
        res.status(404).send("No puzzle found")
        return
    }

    res.send(data)
}

module.exports = get_puzzle_by_id
