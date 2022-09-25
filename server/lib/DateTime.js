class DateTime {
  static durationToSeconds (str) {
    try {
      const p = str.split(':')
      let s = 0
      let m = 1

      while (p.length > 0) {
        s += m * parseInt(p.pop(), 10)
        m *= 60
      }

      return s
    } catch (err) {
      return 0
    }
  }
}

module.exports = DateTime
