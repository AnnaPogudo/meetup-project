import { useState, useRef, useCallback, useEffect } from 'react'
import { dummyRemoteParticipants } from '../assets/asset'
import toast from 'react-hot-toast'

export const useWebRTC = (_roomId, user, onMeetingEnded, _enabled = true) => {

    const [localStream, setLocalStream] = useState(null)
    const [remoteUsers, setremoteUsers] = useState(dummyRemoteParticipants)
    const [audioEnabled, setAudioEnabled] = useState(true)
    const [videoEnabled, setVideoEnabled] = useState(true)

    const localStreamRef = useRef(null)

    const initLocalStream = useCallback(async () => {
        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error('Media devices are unavailable')
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            })
            localStreamRef.current = stream
            setLocalStream(stream)
            return stream
        } catch (_error) {
            toast.error('Не удалось получить доступ к камере и микрофону')
            console.error('Media devices access error:', _error)
            setAudioEnabled(false)
            setVideoEnabled(false)
            return null
        }
    }, [])

    useEffect(() => {
        initLocalStream()

        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => track.stop())
            }
        }
    }, [initLocalStream])

    const toogleAudio = () => {
        const newState = !audioEnabled;
        setAudioEnabled(newState);
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) audioTrack.enabled = newState;
        }
        toast(newState ? "Microphone turned on" : "Microphone muted", {
            icon: newState ? "🎙️" : "🔇",
        })
    }

    const toogleVideo = () => {
        const newState = !videoEnabled;
        setVideoEnabled(newState);
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) videoTrack.enabled = newState;
        }
        toast(newState ? "Video turned on" : "Video turned off", {
            icon: newState ? "📹" : "📹⃠ ",
        })
    }

    const endMeeting = useCallback(() => {
        if (onMeetingEnded) {
            onMeetingEnded("Meeting ended");
        }
    }, [onMeetingEnded])
    return {
        localStream,
        remoteUsers,
        audioEnabled,
        videoEnabled,
        toogleAudio,
        toogleVideo,
        endMeeting,
    }
}

export default useWebRTC