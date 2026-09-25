import { useState, useCallback } from 'react'
import { dummyMeetingDetails, dummyUser } from '../assets/asset'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import VideoGrid from '../components/meeting/VideoGrid'
import { useWebRTC } from '../hooks/useWebRTC'
import { useChart } from '../hooks/useChart'
import ChartPanel from '../components/meeting/ChartPanel'
import ParticipantList from '../pages/PaticipantsList'
import ControlBar from '../components/meeting/ControlBar'
import toast from 'react-hot-toast'

const MeetingRoom = () => {
  const { meetingId } = useParams()
  const navigate = useNavigate()
  const userdata = dummyUser

  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)

  const handleMeetingEnded = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const {
    localStream,
    remoteUsers,
    audioEnabled,
    videoEnabled,
    toogleAudio,
    toogleVideo,
  } = useWebRTC(meetingId, userdata, handleMeetingEnded)


  const { messages, sendMessage, unreadCount, isChartOpen, toogleChart } = useChart(meetingId, userdata)

  const isHost = true

  const handleLeave = () => {
    toast("You left the meeting")
    navigate("/dashboard")
  }

  const handleEndedMeeting = () => {
    toast("Meeting ended for all paticipants")
    navigate("/dashboard")
  }

  return (
    <div className="h-screen w-screen bg-slate-100 text-slate-900 flex flex-col overflow-hidden relative font-sans animate-gradient-flow">
      <header className="w-full bg-white/90 backdrop-blur-md px-6 py-3 border-b border-slate-200 flex items-center justify-between z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <h2>
            {dummyMeetingDetails.title}({meetingId || dummyMeetingDetails.meetingId})
          </h2>
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </header>


      <div className="flex-1 flex overflow-hidden relative">
        <VideoGrid
          localStream={localStream}
          localUser={userdata}
          remoteUsers={remoteUsers}
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}
        />

        <ChartPanel isOpen={isChartOpen} onClose={toogleChart} messages={messages} onSendMessage={sendMessage} currentUser={userdata} />

        <ParticipantList
          isOpen={isParticipantsOpen}
          onClose={() => setIsParticipantsOpen((prev) => !prev)}
          localUser={userdata}
          localAudio={audioEnabled}
          localVideo={videoEnabled}
          remoteUsers={remoteUsers}
          meetingHostId={dummyUser.id}
        />

      </div>
      <ControlBar
        roomId={meetingId || dummyMeetingDetails.meetingId}
        audioEnabled={audioEnabled}
        videoEnabled={videoEnabled}
        onToogleAudio={toogleAudio}
        onToogleVideo={toogleVideo}
        onToogleChart={toogleChart}
        onToogleParticipantsOpen={() => setIsParticipantsOpen((prev) => !prev)}
        isChartOpen={isChartOpen}
        isParticipantsOpen={isParticipantsOpen}
        unreadCount={unreadCount}
        participantCount={1 + remoteUsers.length}
        isHost={isHost}
        onLeave={handleLeave}
        onEndMeeting={handleEndedMeeting}

      />
    </div>
  )
}

export default MeetingRoom