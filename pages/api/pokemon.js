import pokemon from '../../pokemon.json'

export default (req, res) => {
  const { name } = req.query
  if (!name) {
    res.status(400).send('Must have a name')
    return
  }
  const found = pokemon.filter(({ name: { english } }) => english === name)
  if (found.length === 0) {
    res.status(404).send('Name not found')
    return
  }

  res.status(200).json(found[0])
}
