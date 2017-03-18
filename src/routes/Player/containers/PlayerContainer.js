import PlayerView from '../components/PlayerView'
import { connect } from 'react-redux'
import { emitStatus, cancelStatus, emitError, requestPlayNext, getMedia, getMediaSuccess } from '../modules/player'

const mapActionCreators = {
  emitStatus,
  cancelStatus,
  emitError,
  requestPlayNext,
  getMedia,
  getMediaSuccess,
}

const mapStateToProps = (state) => {
  const { queue, library, player } = state
  let songId, song

  if (queue.entities[player.queueId]) {
    songId = queue.entities[player.queueId].songId
    song = library.songs.entities[songId]
  }

  return {
    song,
    queueId: player.queueId,
    volume: player.volume,
    isAtQueueEnd: player.isAtQueueEnd,
    isPlaying: player.isPlaying,
    isFetching: player.isFetching,
    isErrored: typeof state.status.errors[state.status.queueId] !== 'undefined',
  }
}

export default connect(mapStateToProps, mapActionCreators)(PlayerView)
